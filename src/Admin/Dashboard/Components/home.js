import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import axios from 'axios';
import { useState, useEffect } from 'react';

function createData(date, action, type, product, quantity, emergencytype) {
  return { date, action, type, product, quantity, emergencytype };
}

function Home() {
  const [rows, setRows] = useState([]);
  const [hospital, setHospital] = useState(null);
  const [stocklen, setStocklen] = useState(null);
  const [bufferhospital, setBufferHospital] = useState(null);
  const [stockhospital, setStockHospital] = useState(null);
  const [issuedlen, setIssuedlen] = useState(null);

  const handleTotal = () => {
    window.location = "/totalhospital";
  };

  const handleNewRegistration = () => {
    window.location = "/newregistration";
  };

  const handleBuffer = () => {
    window.location = "/bufferstocksema";
  };

  const handleStockOut = () => {
    window.location = "/stockoutsema";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hospitalRes = await axios.get(`${process.env.BASE_URL || ""}/hospitals`);
        setHospital(hospitalRes.data.document.length);

        const stockRes = await axios.get(`${process.env.BASE_URL || ""}/stocks`);
        setStocklen(stockRes.data.document.length);

        const bufferRes = await axios.get(`${process.env.BASE_URL || ""}/stocks`);
        let buffer = 0;
        let out = 0;
        const bufferhospitallist = [];
        const stockouthospitallist = [];
        for (let i = 0; i < bufferRes.data.document.length; i++) {
          // No of Buffer Products
          if (+bufferRes.data.document[i].totalquantity <= +bufferRes.data.document[i].buffervalue && +bufferRes.data.document[i].totalquantity > 1) {
            buffer++;
            bufferhospitallist.push(bufferRes.data.document[i].hospitalid);
          }
        }
        const uniqueValues = new Set(bufferhospitallist);
        // Get the count of unique BUFFER HOSPITALS 
        const buffercount = uniqueValues.size;

        // No of Stock Out Products
        for (let i = 0; i < bufferRes.data.document.length; i++) {
          if (+bufferRes.data.document[i].totalquantity < 1) {
            out++;
            stockouthospitallist.push(bufferRes.data.document[i].hospitalid);
          }
        }
        const uniqueValues1 = new Set(stockouthospitallist);
        // Get the count of unique values
        const stockcount = uniqueValues1.size;

        setBufferStock(buffer);
        setStockOut(out);
        setBufferHospital(buffercount);
        setStockHospital(stockcount);

        const issuedRes = await axios.get(`${process.env.BASE_URL || ""}/issueds`);
        setIssuedlen(issuedRes.data.document.length);

        const historyRes = await axios.get(`${process.env.BASE_URL || ""}/history`);
        const newRows = historyRes.data.document.map(doc => ({
          date: doc.date,
          action: doc.type,
          type: doc.productid,
          product: doc.name,
          quantity: doc.quantity,
          emergencytype: doc.emergencytype
        }));
        setRows(newRows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className='main-container'>
      <div>
        <section class="p-5 w-100" style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}>
          <div class="row">
            <div class="col">
              <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-3">
                  <div className='main-title'>
                    <h3>DASHBOARD</h3>
                  </div>
                  <div className='main-cards'>
                    <div className='cardnew'>
                      <div className='card-inner'>
                        <h4>TOTAL HOSPITAL</h4>
                        <BsFillArchiveFill className='card_icon' />
                      </div>
                      <h1>{hospital}</h1>
                      <Button variant="text" onClick={handleTotal}>
                        More
                      </Button>
                    </div>
                    <div className='cardnew2'>
                      <div className='card-inner'>
                        <h4>REGISTRATION</h4>
                        <BsPeopleFill className='card_icon' />
                      </div>
                      <h1>{hospital}</h1>
                      <Button variant="text" onClick={handleNewRegistration}>
                        More
                      </Button>
                    </div>
                    <div className='cardnew3'>
                      <div className='card-inner'>
                        <h4>BUFFER STOCK</h4>
                        <BsPeopleFill className='card_icon' />
                      </div>
                      <h1>{bufferhospital}</h1>
                      <Button variant="text" onClick={handleBuffer}>
                        More
                      </Button>
                    </div>
                    <div className='cardnew4'>
                      <div className='card-inner'>
                        <h4>STOCK OUT</h4>
                        <BsFillBellFill className='card_icon' />
                      </div>
                      <h1>{stockhospital}</h1>
                      <Button variant="text" onClick={handleStockOut}>
                        More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;

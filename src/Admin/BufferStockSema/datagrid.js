import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import "./home.css"

import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
  from 'recharts';
import axios from 'axios'
import { useState, CSSProperties } from 'react'

function createData(hospital, name, batchno, unitcost, totalquantity, entrydate, manufacturingdate) {
  return { hospital, name, batchno, unitcost, totalquantity, entrydate, manufacturingdate };
}

function BufferStockSema() {
  const [rows, setRows] = useState([]);
  const [history, setHistory] = useState([]);
  const [batchno, setBatchNo] = useState([]);
  const [productid, setProductId] = useState([]);
  const [hospitalid, setHospitalId] = useState([]);
  const [totalquantity, setTotalQuantity] = useState([]);
  const [buffervalue, setBufferValue] = useState([]);
  const [unitcost, setUnitCost] = useState([]);
  const [doe, setDoe] = useState([]);
  const [dom, setDom] = useState([]);
  const [type, setType] = useState([]);
  const [action, setAction] = useState([]);
  const [name, setName] = useState([]);
  const [hospital, setHospital] = useState([]);

  const getHistory = async () => {
    try {
      const url = `${process.env.BASE_URL || "http://localhost:4000"}/stocks`;
      const { data } = await axios.get(url);
      console.log("History is: ", data);
      const newRows = data.document.map(doc => ({
        hospital: doc.hospital,
        name: doc.name,
        batchno: doc.batchno,
        unitcost: doc.unitcost,
        totalquantity: doc.totalquantity,
        entrydate: doc.doe,
        manufacturingdate: doc.dom
      }));
      setRows(newRows);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getHistory();
  }, []);

  return (
    <main className='main-container'>
      <div>
        <section className="p-5 w-100" style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}>
          <div className="row">
            <div className="col">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-3">
                  <div className='main-title'>
                    <h3>HOSPITALS BUFFER STOCK</h3>
                  </div>
                  <div className='row' align="start">
                    <p className="text-right h3 mb-3 mt-4">FILTER</p>
                  </div>
                  <TableContainer component={Paper} className="table table-primary">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">HOSPITAL</TableCell>
                          <TableCell align="right">PRODUCT</TableCell>
                          <TableCell align="right">BATCH NO</TableCell>
                          <TableCell align="right">UNIT COST</TableCell>
                          <TableCell align="right">TOTAL QUANTITY</TableCell>
                          <TableCell align="right">ENTRY DATE</TableCell>
                          <TableCell align="right">MANUFACTURING DATE</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="right" component="th" scope="row">{row.hospital}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.batchno}</TableCell>
                            <TableCell align="right">{row.unitcost}</TableCell>
                            <TableCell align="right">{row.totalquantity}</TableCell>
                            <TableCell align="right">{row.entrydate}</TableCell>
                            <TableCell align="right">{row.manufacturingdate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button variant="text">Load More</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default BufferStockSema;

import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { useState, useRef } from "react";
import Modal from "react-modal";
import Axios from "axios";
import LoaderOverlay from '../Loader/LoaderOverlay.js';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 29,
  pt: 2,
  px: 4,
  pb: 3,
};

// Assuming BASE_URL is defined in your environment variables or .env file
const BASE_URL = process.env.BASE_URL || "http://localhost:4000"; // Default to localhost if not provided in env

const sourceTypeItems = [
  // your items here
];

function Department({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const firstInputRef = useRef(null);

  const toggleModalOpenState = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleOnChange = (event) => {
    setSelectedItems({
      ...selectedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = () => {
    try {
      setLoading(true);
      const loadUsers = async () => {
        const response = await Axios.post(`${BASE_URL}/postdepartment`, prod); // Updated URL
        alert("Department Registered Successfully");
        console.log(response);
        setLoading(false);
      };
      loadUsers();
    } catch (error) {
      alert("Error Registering/Department Already Exist");
      console.error("Error creating Product:", error);
      setLoading(false);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <LoaderOverlay loading={loading} />
      <section className="p-5 w-100">
        <div className="row">
          <div className="col-12">
            <div className="card-body p-md-50">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">

                  <div id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
                    <div className="sidebar-list">
                      <div className="sidebar-list-item">
                        <a href="/reports" onClick={() => navigateTo('/reports')}>
                          Department
                        </a>
                        <span className="separator">|</span>
                        <a href="/add-user" onClick={() => navigateTo('/add-user')}>
                          Add User
                        </a>
                        <span className="separator">|</span>
                        <a href="/edit-account" onClick={() => navigateTo('/edit-account')}>
                          Edit Account
                        </a>
                        <span className="separator">|</span>
                        <a href="/change-password" onClick={() => navigateTo('/change-password')}>
                          Change Password
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="button-body mt-2 mb-2">
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={toggleModalOpenState}
                        style={{ backgroundColor: '#1C647C' }}
                      >
                        + Add Departments
                      </Button>
                    </div>
                  </div>
                  <div className="row" align-items-center>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={toggleModalOpenState}
                      className="source-type-modal"
                      aria-labelledby="source-type-dialog-label"
                      onAfterOpen={() => {
                        setTimeout(() => firstInputRef.current?.focus(), 0);
                      }}
                    ><Box sx={{ ...style, width: 700 }}>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Choose Your Department's
                      </Typography>
                      <ul
                        className="source-type-modal__list"
                        role="group"
                        aria-labelledby="source-type-dialog-label"
                      >
                        {sourceTypeItems.map((item, index) => (
                          <li key={item.id} className="source-type-modal__list-item">
                            <label>
                              <input
                                type="checkbox"
                                checked={selectedItems[item.name] || false}
                                onChange={handleOnChange}
                                name={item.name}
                                ref={index === 0 ? firstInputRef : null}
                              />
                              {item.name}
                            </label>
                          </li>
                        ))}
                      </ul>
                      <div className="source-type-modal__controls">
                        <button
                          value="cancel"
                          className="source-type-modal__control-btn source-type-modal__control-btn--cancel"
                          onClick={toggleModalOpenState}
                        >
                          Cancel
                        </button>
                        <button
                          value="apply"
                          className="source-type-modal__control-btn source-type-modal__control-btn--apply"
                          onClick={() => {
                            console.log("applying source types");
                            alert("Department Selected, Process to Dashboard")
                            console.log(
                              JSON.stringify(
                                Object.keys(selectedItems).reduce((items, key) => {
                                  if (selectedItems[key]) {
                                    return [...items, key];
                                  }
                                  return items;
                                  console.log(items);
                                }, [])
                              )
                            );
                            toggleModalOpenState();
                          }}
                        >
                          Proceed
                        </button>
                      </div>
                    </Box>

                    </Modal>
                  </div>

                  {/* White block to write anything */}
                  <div className="row">
                    {/* Your block content goes here */}

                    <Button variant="outlined" onClick={handleSubmit}>
                      Proceed To Dashboard --->
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Department;

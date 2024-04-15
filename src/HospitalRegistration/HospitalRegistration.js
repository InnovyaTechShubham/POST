import { useState, React, CSSProperties } from 'react'
import { useFormik } from "formik";
import ClipLoader from "react-spinners/ClipLoader";
import "./HospitalRegistration.css";
import { Button } from "react-bootstrap";
import { registrationSchema } from "./HospitalSchema";
import Axios from "axios"
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoaderOverlay from '../Loader/LoaderOverlay.js';

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const initialValues = {
    hospitalname: "",
    billingname: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    landmark: "",
    phone: "",
    ceanumber: "",
};

const HospitalRegistration = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();
    const navigateToDashboard = () => {
        navigate('/adddepartmentnew');
    }

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
    } = useFormik({
        initialValues,
        validationSchema: registrationSchema,
        onSubmit: async (values, action) => {
            const hospital = {
                "userid": localStorage.getItem("id"),
                "hospitalname": values.hospitalname,
                "billingname": values.billingname,
                "address": values.address,
                "ceanumber": values.ceanumber,
                "email": values.email,
                "phone": values.phone,
                "state": values.state,
                "district": values.district,
                "landmark": values.landmark,
                "pincode": values.pincode,
            };

            try {
                setLoading(true);
                const BASE_URL = process.env.BASE_URL || "http://localhost:4000";
                const response = await Axios.post(`${BASE_URL}/posthospitals`, hospital);
                console.log("Post created:", response.data);
                const hospitalid = response.data._id;
                const hospitalname = response.data.hospitalname;
                
                console.log(hospitalid);
                //Storing ID of user on local system
                localStorage.setItem("hospitalid", hospitalid);
                localStorage.setItem("hospitalname", hospitalname);

                handleClickOpen();
                setLoading(false);
            } catch (error) {
                alert("Error Registering")
                console.error("Error creating post:", error);
                setLoading(false);
            }
            action.resetForm();
        },
    });

    return (
        <div>
            <LoaderOverlay loading={loading} />
            <section
                class="p-5 w-100"
                style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
            >
                <div class="row">
                    <div class="col-12">
                        <div class="card text-black" style={{ borderRadius: "25px" }}>
                            <div class="card-body p-md-5">
                                <div class="row justify-content-center">
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <img
                                            src="https://www.semamart.com/wp-content/uploads/2023/12/Semamart-Logo-5-1024x193.png"
                                            class="img-fluid"
                                            alt=""
                                            style={{ width: "200px" }}
                                        />
                                        <p class="text-center h1 fw-bold mb-5 mt-4">Hospital Registration</p>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row mt-3">
                                                <div className="col text-left">
                                                    <label htmlFor="first" className="form-label">
                                                        Hospital Name*
                                                    </label>
                                                    <input
                                                        id="hostpitalname"
                                                        name="hospitalname"
                                                        className="form-control"
                                                        value={values.hospitalname}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {errors.hospitalname && touched.hospitalname ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.hospitalname}
                                                        </small>
                                                    ) : null}
                                                </div>
                                            </div>
                                            {/* Other form fields */}
                                            {/* Buttons */}
                                            <div className="row mt-3">
                                                <div className="col text-center actionButtons">
                                                    <Button
                                                        variant="secondary"
                                                        size="lg"
                                                        onClick={resetForm}
                                                    >
                                                        Clear
                                                    </Button>
                                                    <Button
                                                        variant="primary"
                                                        size="lg"
                                                        onClick={handleSubmit}
                                                    >
                                                        Register
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <br />
                                                <div className="col text-right">
                                                    Copyright 2024 semamart.com All Rights Reserved.
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        {/* Image */}
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Hospital Registered"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Thank You For Registering!!
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Ok</Button>
                                                <Button onClick={navigateToDashboard} autoFocus>
                                                    Continue
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HospitalRegistration;

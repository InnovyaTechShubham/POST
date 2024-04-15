import { ProductSchema } from "./ProductEntrySchema";
import Axios from "axios";
import { useState, React, CSSProperties } from 'react';
import { useFormik } from "formik";
import "./ProductEntry.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { Select, FormControl, InputLabel,FormHelperText } from "@mui/material";
import { MenuItem } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoaderOverlay from '../Loader/LoaderOverlay.js';

const initialValues = {
    producttype: "",
    category: "",
    subcategory:"",
    upccode: "",
    name: "",
    manufacturer: "",
    origin:"",
    emergencytype: "",
    description: "",
};

const ProductEntry = () => {
    let [loading, setLoading] = useState(false);
    let [producttype, setProductType] = useState("");
    let [category, setCategory] = useState("");
    let [subcategory, setSubCategory] = useState("");
    let [emergency, setEmergency] = useState("");
    let [origin, setOrigin] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const selectionChangeHandler = (event) => {
        setProductType(event.target.value);
    };

    const selectionChangeHandler2 = (event) => {
        setCategory(event.target.value);
    };

    const selectionChangeHandler3 = (event) => {
        setEmergency(event.target.value);
    };
    
    const selectionChangeHandler5 = (event) => {
        setSubCategory(event.target.value);
    };

    const selectionChangeHandler6 = (event) => {
        setOrigin(event.target.value);
    };

    const prodMap = {
        "Pharmaceuticals": [
            { value: "Pharmaceuticals", label: "Pharmaceuticals" },
            { value: "Dietary", label: "Dietary Supplements" },
            { value: "Ayush", label: "Ayush Medicines" },
            { value: "Medical", label: "Medical Consumables" }
        ],
        "Equipments": [
            { value: "Furniture", label: "Medical Furniture" },
            { value: "Instruments", label: "Medical Instruments" },
            { value: "Equipments", label: "Medical Equipments" }
        ],
    };

    const subcatMap = {
        // subcategory mapping here...
    };
  
    const navigateToVerify = () => {
        navigate('/');
    };

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
        validationSchema: ProductSchema,
        onSubmit: async (values, action) => {
            const product = {
                "hospitalid":localStorage.getItem("hospitalid"),
                "producttype": producttype,
                "category": category,
                "subcategory":subcategory,
                "upccode": values.upccode,
                "name": values.name,
                "manufacturer": values.manufacturer,
                "origin":origin,
                "emergencytype": emergency,
                "description": values.description,
            };

            try {
                setLoading(true);
                const BASE_URL = process.env.BASE_URL || "http://localhost:4000";
                const response = await Axios.post(`${BASE_URL}/postproducts`, product);
                setLoading(false);
                setOpen(true);
            } catch (error) {
                alert("Error Registering/Product Already Exist")
                console.error("Error creating Product:", error);
                setLoading(false);
            }
            action.resetForm();
        },
    });

    return (
        <div>
            <LoaderOverlay loading={loading}/>
            <section
                class="p-5 w-100"
                style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
            >
                {/* Your form UI code goes here */}
            </section>
        </div>
    );
};

export default ProductEntry;


import React from "react";
import { useState } from 'react';
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { BsSearch, BsPerson } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { Form } from "react-bootstrap";



const BuscadorCompraProductos = ({ action, handleSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
        handleSearch(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform any necessary actions on form submission
        // For example, you can trigger a search or other operations
    };

    return (
        <InputGroup>
            <InputGroup.Text>
                <BsSearch />
            </InputGroup.Text>
            <FormControl placeholder="Buscar" onChange={handleInputChange} value={searchValue} />
            <Button variant="light" onClick={action}>
                <Button variant="primary" >Nuevo Producto</Button>
            </Button>
        </InputGroup>
    );
};

export default BuscadorCompraProductos;


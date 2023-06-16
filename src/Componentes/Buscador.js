import React from "react";
import { useState } from 'react';
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { BsSearch, BsPerson } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { Form } from "react-bootstrap";



const Buscador = ({ action, handleSearch }) => {
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
            {/*<InputGroup.Text>*/}
            <button type="button" className="btn btn-outline-primary boton">
                <BsSearch />
            </button>
            {/*</InputGroup.Text>*/}
            <FormControl placeholder="Buscar" onChange={handleInputChange} value={searchValue} />
            <button className="btn btn-success" onClick={action}>
                <IoMdPersonAdd />
            </button>
        </InputGroup>
    );
};

export default Buscador;

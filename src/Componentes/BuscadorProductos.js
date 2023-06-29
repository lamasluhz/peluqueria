import React from "react";
import { InputGroup, FormControl, Button, Nav } from "react-bootstrap";
import { BsSearch, BsPerson } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { NavLink } from "react-router-dom";
const BuscadorProductos = ({ action }) => {
    return (
        <InputGroup>
            <button type="button" className="btn btn-outline-primary boton">
                <BsSearch />
            </button>
            <FormControl placeholder="Buscar" />
            <button className="btn btn-success">
                <NavLink to='/proveedores' style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }} > Proveedores</NavLink>
            </button>
        </InputGroup >
    );
};

export default BuscadorProductos;
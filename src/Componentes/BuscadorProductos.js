import React from "react";
import { InputGroup, FormControl, Button, Nav } from "react-bootstrap";
import { BsSearch, BsPerson } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { NavLink } from "react-router-dom";
const BuscadorProductos = ({ action }) => {
    return (
        <InputGroup>
            <InputGroup.Text>
                <BsSearch />
            </InputGroup.Text>
            <FormControl placeholder="Buscar" />
            <NavLink to='/proveedores'>Proveedores</NavLink>

        </InputGroup>
    );
};

export default BuscadorProductos;

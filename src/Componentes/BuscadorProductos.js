import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { BsSearch, BsPerson } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";

const BuscadorProductos = ({ action }) => {
    return (
        <InputGroup>
            <InputGroup.Text>
                <BsSearch />
            </InputGroup.Text>
            <FormControl placeholder="Buscar" />
            <Button variant="light" onClick={action}>
                Proveedores
            </Button>
        </InputGroup>
    );
};

export default BuscadorProductos;

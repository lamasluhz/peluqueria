import React from 'react'
import GraficosProductos from './GraficosProductos'
import GraficosProductos2 from './GraficosProductos2';
import Carrusel from './Carrusel';

const Inicio = () => {
    return (
        <>
            <div style={{ marginBottom: '3%', backgroundColor: 'black', marginTop: '1%' }}>
                <Carrusel />
            </div>
            <hr style={{ borderColor: '#B4D8E9' }} />
            <h3 style={{ justifyContent: 'center', display: 'flex' }}>Productos en Stock</h3>
            <hr style={{ borderColor: '#B4D8E9' }} />
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '1', marginLeft: '1%'}}>
                    <GraficosProductos />
                </div>
                <div style={{ flex: '2' }}>
                    <GraficosProductos2 />
                </div>
            </div>
        </>
    );
}

export default Inicio
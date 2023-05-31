import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/Inicio.css';
import Button from 'react-bootstrap/Button';


const Principal = (props) => {
  const [error, setError] = useState(null);

  const recargarPagina = () => {
    window.location.reload();
  }

  const [formData, setFormData] = useState({
    correo: "",
    clave: ""
  });
  const [conectado, setConectado] = useState(false);
  const [usuarioId, setUsuarioId] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const API_URL = "https://localhost:7137";

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_URL}/Usuario/VerificarUsuario?`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setConectado(response.data.conectado);

        localStorage.setItem('conectado', JSON.stringify(response.data.conectado));
        localStorage.setItem('usuario', JSON.stringify(response.data));

        recargarPagina();

      })
      .catch((error) => {
        setError(error);
        console.error(error);
      });
  };


  useEffect(() => {
    const storedConectado = localStorage.getItem("conectado");
    if (storedConectado !== null) {
      const parsedConectado = storedConectado === "true";
      setConectado(parsedConectado);
      props.acceder(parsedConectado);
    }
  }, []);


  return (
    <div className="miDivPrincipal">
      <div id="contenedor-centrado">
        <div id="contenedor-imagen">
          <img src="/inicio.gif" style={{ maxHeight: '100%', maxWidth: '60%', borderColor: 'black' }} />
        </div>
        <div id="contenedor-inicio">
          <div id="contenedor-bienvenida">
            <h4 className="bienvenido-txt">Bienvenido!</h4>
            <hr className="divisor" />
            <p className="peluqueria-txt">Peluqueria HAJOLUSA</p>
          </div>
          <div id="contenerLogin">
            <hr className="linea" />
            <div className="card-body" id="login">
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">📧</span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="correo electrónico"
                    aria-label="Correo electrónico"
                    aria-describedby="basic-addon1"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon2">🔒</span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="clave"
                    aria-label="Clave"
                    aria-describedby="basic-addon2"
                    name="clave"
                    value={formData.clave}
                    onChange={handleChange}
                  />
                </div>
                {error && (
                  <div className="alert alert-danger">Inicio de sesión fallido: Verifique sus datos de inicio de sesión</div>
                )}
                <hr className="linea" />
                <div id="divButton">
                  <Button variant="primary" className="btn-ancho" type="submit" id="btnIngresar" >Ingresar</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Principal;
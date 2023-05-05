import logo from './logo.svg';
import './App.css';
import UsersRow from 'Components/UsersRow';
const estilo = { paddingLeft: '10px' }






function App() {
  return (
    <div className="App">
      <header>
        <h3>HAJOLUSA</h3>
      </header>
      <nav className="navbar navbar-expand-lg navbar-light navbar-background" >

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div className="navbar-nav"  >
            <a className="navbar-brand" href="#" style={estilo}>Clientes</a>
            <a className="navbar-brand" href="#" style={estilo}>Peluqueros</a>
            <a className="navbar-brand" href="#" style={estilo}>Servicios</a>
            <a className="navbar-brand" href="#" style={estilo}>Reservas</a>
            <a className="navbar-brand" href="#" style={estilo}>Compras</a>
            <a className="navbar-brand" href="#" style={estilo}>Venta</a>
          </div>
        </div>
      </nav>
      <div>
        <h2 style={{ paddingLeft: '20px', marginTop: '15px', marginBottom: '-15px' }}>Clientes</h2>
      </div>
      {/* TABLAS Y BUSCADOR  */}
      <div className="container">
        {/* <!-- buscador --> */}
        <br />

        {/* <!-- TABLAS --> */}
        <div style={{ backgroundColor: '#f8e1e1', paddingTop: '1%', paddingLeft: '1%' }} ><input type="text" id="myInput" onkeyup="myFunction()" placeholder="Buscar..." title="Type in a name" /> <button className="button"></button></div>
        <UsersRow />
      </div>
    </div>
  );
}

export default App;


const estilo = { paddingLeft: '10px' }

const Header = () => {
    return (<header>
        <h3>HAJOLUSA</h3>
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
    </header>)
}

export default Header
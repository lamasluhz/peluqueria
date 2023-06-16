import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import '../css/Estilos.css';

const Servicios = () => {
  const estiloCard ={};
  return (
    <>
      <div>
        <h3 className="titulos">Servicios</h3>
        <hr className="hr" />
      </div>
      <Container>
        <Row>
          <Col className="mb-4">
            <Link to="/masPedidos">
              <Card style={estiloCard}>
                <Card.Img variant="top" src="https://d500.epimg.net/cincodias/imagenes/2021/01/28/pyme/1611867181_254477_1611936996_noticia_normal.jpg" style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>Más Pedidos</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col className="mb-4" >
            <Link to="/cortes">
              <Card style={estiloCard}>
                <Card.Img variant="top" src="https://titulae.es/wp-content/uploads/2021/11/grado-superior-peluqueria.jpg" style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>Cortes</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col className="mb-4">
            <Link to="/lavados">
              <Card style={estiloCard}>
                <Card.Img variant="top" src="https://s1.eestatic.com/2021/11/19/como/628448822_215474643_1706x960.jpg" style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>Lavado</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col className="mb-4">
            <Link to="/tinturas">
              <Card style={estiloCard}>
                <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwys_rBG0EArPHNcKQX_i-9Ag35MzJkAZt4Q&usqp=CAU" style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>Tintura</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className="mb-4">
            <Link to="/manicuras">
              <Card style={estiloCard}>
                <Card.Img variant="top" src="https://www.cadenadial.com/wp-content/uploads/2023/03/Manicura-Coreana-1-1250x800.jpg" style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>Manicura</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col className="mb-4">
            <Link to="/peinados">
              <Card style={estiloCard}>
                <Card.Img variant="top" src="https://ath2.unileverservices.com/wp-content/uploads/sites/11/2019/02/peinados-para-la-escuela-3-1024x683.jpg" style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>Peinados</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col className="mb-4">
            <Link to="/maquillajes">
              <Card style={estiloCard}>
                <Card.Img variant="top" src="https://dumashe.com/wp-content/uploads/2020/07/PORTADA-2.jpg" style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>Maquillaje</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Servicios;
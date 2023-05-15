import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Servicios = () => {
  return (
    <Container>
      <h1>Servicios</h1>
      <Row>
        <Col>
          <Link to="/servicio1">
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Cortes</Card.Title>
                <Card.Text>
                  Descripción del servicio 1
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/servicio2">
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Lavado</Card.Title>
                <Card.Text>
                  Descripción del servicio 2
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/servicio3">
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Tintura</Card.Title>
                <Card.Text>
                  Descripción del servicio 3
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/servicio4">
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Manicura</Card.Title>
                <Card.Text>
                  Descripción del servicio 4
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/servicio5">
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Peinados</Card.Title>
                <Card.Text>
                  Descripción del servicio 5
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/servicio6">
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Maquillaje</Card.Title>
                <Card.Text>
                  Descripción del servicio 6
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Servicios;

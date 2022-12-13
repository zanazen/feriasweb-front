import { useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

function Profile() {
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);

  if (!loggedUser) {
    return navigate("/erro");
  }

// Informações do usuário/colaborador
    return (
        <Container>
            <img className="rounded-circle my-4"
                 src={loggedUser.user.profileImg}
                alt=""
            />
            <h1>{loggedUser.user.name}</h1>

            <Card>
            <Card.Header>
            <h5 className="fw-bold m-0 py-1">Informações do Usuário/Colaborador</h5>
            </Card.Header>
            <Card.Body>
                <Row>
                <Col>
                <Card.Title>Endereço de e-mail</Card.Title>
                <Card.Text>{loggedUser.user.email}</Card.Text>
                </Col>
                </Row>
            </Card.Body>
            </Card>

            <Card className="my-5">
            <Card.Body>    
                <Row className="mt-3">
                <Col>
                <Card.Title>Cargo</Card.Title>
                <Card.Text>{loggedUser.user.cargo}</Card.Text>
                </Col>
                </Row>
            </Card.Body>
            </Card>

            <Card className="my-5">
            <Card.Body>    
                <Row className="mt-3">
                <Col>
                <Card.Title>Departamento</Card.Title>
                <Card.Text>{loggedUser.user.departmento}</Card.Text>
                </Col>
                </Row>
            </Card.Body>
            </Card>
        </Container>
    );
}

export default Profile;
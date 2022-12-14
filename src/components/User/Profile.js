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

  const formatDate = (field) => {
    const newDate = new Date(field);
    const dd = newDate.getDate() + 1;
    const mm = newDate.getMonth() + 1;
    const yyyy = newDate.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  };

  return (
    <Container>
      <img
        className="rounded-circle my-4"
        src={loggedUser.user.profileImg}
        alt=""
      />
      <h1>{loggedUser.user.name}</h1>
      {loggedUser.user.active && (
        <h6 className="fw-bold text-muted mb-4">
          {`Ativo na empresa desde ${formatDate(
            loggedUser.user.admissionDate
          )}`}
        </h6>
      )}
      {!loggedUser.user.active && (
        <h6 className="fw-bold text-muted mb-4">
          {`Inativo na empresa desde ${formatDate(
            loggedUser.user.resignationDate
          )}`}
        </h6>
      )}
      <Card>
        <Card.Header>
          <h5 className="fw-bold m-0 py-1">Dados básicos</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>Endereço de e-mail</Card.Title>
              <Card.Text>{loggedUser.user.email}</Card.Text>
            </Col>
            <Col>
              <Card.Title>Número de telefone</Card.Title>
              <Card.Text>{loggedUser.user.phone}</Card.Text>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Card.Title>Data de aniversário</Card.Title>
              <Card.Text>{formatDate(loggedUser.user.birthDate)}</Card.Text>
            </Col>
            <Col>
              <Card.Title>Cidade de residência</Card.Title>
              <Card.Text>
                {loggedUser.user.address?.city} -{" "}
                {loggedUser.user.address?.state}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="my-5">
        <Card.Header>
          <h5 className="fw-bold m-0 py-1">Dados empregatícios</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>Data de admissão</Card.Title>
              <Card.Text>{formatDate(loggedUser.user.admissionDate)}</Card.Text>
            </Col>
            {!loggedUser.user.active && (
              <Col>
                <Card.Title>Data de desligamento</Card.Title>
                <Card.Text>
                  {formatDate(loggedUser.user.resignationDate)}
                </Card.Text>
              </Col>
            )}
            <Col>
              <Card.Title>Salário</Card.Title>
              <Card.Text>R$ {loggedUser.user.salary}</Card.Text>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Card.Title>Status</Card.Title>
              <Card.Text>{loggedUser.user.status}</Card.Text>
            </Col>
            <Col>
              <Card.Title>Departamento</Card.Title>
              <Card.Text>{loggedUser.user.department}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;

import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import EditEmployee from "./EditEmployee";
import DeleteEmployee from "./DeleteEmployee";

function EmployeeDetails({ userForm, setUserForm }) {
  const [employee, setEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const formatDate = (field) => {
    const newDate = new Date(field);
    const dd = newDate.getDate() + 1;
    const mm = newDate.getMonth() + 1;
    const yyyy = newDate.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  };

  useEffect(() => {
    try {
      const fetchEmployee = async () => {
        const response = await api.get(`/user/${id}`);
        setEmployee(response.data);
        setIsLoading(false);
      };

      fetchEmployee();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <Container>
      {isLoading && <Spinner animation="border" />}
      {!isLoading && (
        <>
          <img
            className="rounded-circle my-4"
            src={employee.profileImg}
            alt={`Imagem de perfil de ${employee.name}`}
          />
          <h1>{employee.name}</h1>
          {employee.active && (
            <h6 className="text-success">
              Este funcionário está ativo na empresa
            </h6>
          )}
          {!employee.active && (
            <h6 className="text-secondary mb-3">
              Este funcionário não está ativo na empresa
            </h6>
          )}
          {employee.isAdmin && (
            <Row>
              <Col>
                <EditEmployee
                  id={id}
                  userForm={userForm}
                  setUserForm={setUserForm}
                />
              </Col>
              <Col>
                <DeleteEmployee id={id} />
              </Col>
            </Row>
          )}
          <Card className="mt-3">
            <Card.Header>
              <h5 className="fw-bold m-0 py-1">Dados básicos</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>Endereço de e-mail</Card.Title>
                  <Card.Text>{employee.email}</Card.Text>
                </Col>
                <Col>
                  <Card.Title>Número de telefone</Card.Title>
                  <Card.Text>{employee.phone}</Card.Text>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Card.Title>Data de aniversário</Card.Title>
                  <Card.Text>{formatDate(employee.birthDate)}</Card.Text>
                </Col>
                <Col>
                  <Card.Title>Cidade de residência</Card.Title>
                  <Card.Text>
                    {employee.address?.city} - {employee.address?.state}
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
                  <Card.Text>{formatDate(employee.admissionDate)}</Card.Text>
                </Col>
                {!employee.active && (
                  <Col>
                    <Card.Title>Data de desligamento</Card.Title>
                    <Card.Text>
                      {formatDate(employee.resignationDate)}
                    </Card.Text>
                  </Col>
                )}
                <Col>
                  <Card.Title>Salário</Card.Title>
                  <Card.Text>R$ {employee.salary + 1}</Card.Text>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Card.Title>Status</Card.Title>
                  <Card.Text>{employee.status}</Card.Text>
                </Col>
                <Col>
                  <Card.Title>Departamento</Card.Title>
                  <Card.Text>{employee.department}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="my-5">
            <Card.Header>
              <h5 className="fw-bold m-0 py-1">Descrição de tarefas</h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Prazo</th>
                    <th>Progresso</th>
                  </tr>
                </thead>
                <tbody>
                  {employee.todos.map((todo) => {
                    return (
                      <tr key={todo._id}>
                        <td>{todo.title}</td>
                        <td>{todo.description}</td>
                        <td>{formatDate(todo.deadline)}</td>
                        <td>{todo.progress}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
}

export default EmployeeDetails;

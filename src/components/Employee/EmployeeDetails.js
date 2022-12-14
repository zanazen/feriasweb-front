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
//            className="rounded-circle my-4"
//            src={employee.profileImg}
//            alt={`Imagem de perfil de ${employee.name}`}
          /> 
          <h1>{employee.nome}</h1>
            <h6 className="text-success">
              Colaborador
            </h6>
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
              <h5 className="fw-bold m-0 py-1">Dados do Colaborador</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>Endereço de e-mail</Card.Title>
                  <Card.Text>{employee.email}</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Title>Cargo</Card.Title>
                  <Card.Text>{employee.cargo}</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Title>Departamento</Card.Title>
                  <Card.Text>{employee.departmento}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
}

export default EmployeeDetails;

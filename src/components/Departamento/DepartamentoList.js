import { useEffect, useState } from "react";
import { Button, Container, Form, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { api } from "../../api/api";

function DepartamentoList() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const fetchEmployees = async () => {
        const response = await api.get("/user");
        setEmployees(response.data);
        setIsLoading(false);
      };

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const renderEmployees = employees
    .filter((employee) =>
      employee.nome.toLowerCase().includes(search.toLowerCase())
    )
    .map((employee) => {
      return (
        <tr key={employee._id}>
          <td>{employee.nome}</td>
          <td>{employee.email}</td>
          <td>{employee.department}</td>
          <td>{employee.status}</td>
          <td>
            <Button variant="info" size="sm">
              <Link className="nav-link" to={`/funcionarios/${employee._id}`}>
                Ver detalhes
              </Link>
            </Button>
          </td>
        </tr>
      );
    });

  return (
    <Container>
      {isLoading && <Spinner className="mt-4" animation="border" />}
      {!isLoading && (
        <div>
          <Form className="my-4">
            <Form.Control
              type="search"
              placeholder="Procurar funcionário"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
          <Table className="mt-4" striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Endereço de e-mail</th>
                <th>Departamento</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>{renderEmployees}</tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default DepartamentoList;

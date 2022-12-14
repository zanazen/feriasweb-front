import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
// import { Link } from "react-router-dom";
import { api } from "../../api/api";
import DeleteFerias from "./DeleteFerias";
import EditFerias from "./EditFerias";

function FeriasList({ feriasForm, setFeriasForm }) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const fetchTodos = async () => {
        const response = await api.get("/ferias");
        setTodos(response.data);
        setIsLoading(false);
      };

      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const todosRender = todos
    .filter((ferias) =>
      ferias.progress.toLowerCase().includes(search.toLowerCase())
    )
    .map((ferias) => {
      const inicio1 = new Date(ferias.inicio1);
      const dd = inicio1.getDate() + 1;
      const mm = inicio1.getMonth() + 1;
      const yyyy = inicio1.getFullYear();

      return (
        <Col key={ferias._id}>
          <Card style={{ width: "18rem" }} className="m-3">            
            <ListGroup className="list-group-flush">            
              <ListGroup.Item>{ferias.inicio1}</ListGroup.Item>
              <ListGroup.Item>{ferias.fim1}</ListGroup.Item>
              <ListGroup.Item>{ferias.inicio2}</ListGroup.Item>
              <ListGroup.Item>{ferias.fim2}</ListGroup.Item>
              <ListGroup.Item>{ferias.inicio3}</ListGroup.Item>
              <ListGroup.Item>{ferias.fim3}</ListGroup.Item>              
            </ListGroup>
            <Card.Footer className="d-flex justify-content-around">
              <EditFerias
                id={ferias._id}
                feriasForm={feriasForm}
                setFeriasForm={setFeriasForm}
              />
              <DeleteFerias id={ferias._id} />
            </Card.Footer>
          </Card>
        </Col>
      );
    });

  return (
    <Container>
      <Form className="my-4">
        <Form.Control
          type="search"
          placeholder="Pesquisar férias"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>
      {isLoading && <Spinner className="mt-4" animation="border" />}
      {!isLoading && <Row>{todosRender}</Row>}
    </Container>
  );
}

export default FeriasList;

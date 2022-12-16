import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Button className="p-4 me-4" variant="dark" size="lg">
        <Link className="nav-link" to="/registro">
          Cadastrar no sistema
        </Link>
      </Button>
      <Button className="p-4 me-4" variant="dark" size="lg">
        <Link className="nav-link" to="/login">
          Entrar no sistema
        </Link>
      </Button>
    </Container>
  );
}

export default Home;

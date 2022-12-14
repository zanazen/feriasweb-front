import { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedUser } = useContext(AuthContext);

  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/registro" ||
    location.pathname === "/erro"
  ) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/folgas">IronRH</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 d-flex justify-content-between align-items-center">
            <div className="d-flex flex-row">
              {loggedUser?.user?.isAdmin && (
                <Link className="nav-link" to="/funcionarios">
                  Visualizar funcionários
                </Link>
              )}
              <Link className="nav-link" to="/folgas">
                Visualizar férias
              </Link>
              <Link className="nav-link" to="/folgas/nova-tarefa">
                Adicionar novas férias
              </Link>
            </div>
            <div className="d-flex flex-row align-items-center">
              <Link className="nav-link" to="/perfil">
                <img
                  style={{ width: "35px" }}
                  className="rounded-circle me-2"
                  src={loggedUser?.user.profileImg}
                  alt={`Imagem de perfil de ${loggedUser?.user.name}`}
                />
              </Link>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/api";

function AddEmployee({ userForm, setUserForm }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "active") {
      setUserForm({ ...userForm, active: e.target.checked });
      return;
    }

    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/create", userForm);
      navigate("/funcionarios");

      toast.success("Novo colaborador foi cadastrado!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);

      toast.error("Não foi possível cadastrar novo colaborador", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <Container>
      <h2 className="my-5">Cadastrar novo colaborador</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
//          <Col className="d-flex justify-content-center align-items-center">
//            <Form.Group className="mb-3">
//              
//            </Form.Group>
//         </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nome do colaborador</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o nome completo do colaborador"
                name="nome"
                value={userForm.nome}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Endereço de e-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Insira o endereço de e-mail válido para contato"
                name="email"
                value={userForm.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Cargo do colaborador</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o cargo do colaborador"
                name="cargo"
                value={userForm.cargo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col>
            <Form.Group>
              <Form.Label>Departamento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o departamento do colaborador"
                name="departamento"
                value={userForm.departamento}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          </Row>
          <Button className="mt-4" variant="success" type="submit">
            Cadastrar Colaborador
          </Button>
      </Form>
    </Container>
  );
}

export default AddEmployee;

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/api";

function AddDepartamento({ departamentoForm, setDepartamentoForm }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.nome === "active") {
      setDepartamentoForm({ ...departamentoForm, active: e.target.checked });
      return;
    }

    setDepartamentoForm({ ...departamentoForm, [e.target.nome]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/departamento/create", departamentoForm);
      navigate("/departamentos");

      toast.success("Novo departamento foi cadastrado!", {
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

      toast.error("Não foi possível cadastrar novo departamento", {
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
      <h2 className="my-5">Cadastrar novo departamento</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Departamento ativo na empresa"
                name="active"
                onChange={handleChange}
                checked={departamentoForm.active}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nome do departamento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o nome do departamento"
                name="nomedepartamento"
                value={departamentoForm.nomedepartamento}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Sigla</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira a sigla do departamento"
                name="sigla"
                value={departamentoForm.sigla}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o estado de localização departamento"
                name="estado"
                value={departamentoForm.estado}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>          
        </Row>
        <Row>
        <Col>
            <Form.Group className="mb-3">
              <Form.Label>Município</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o município de localização departamento"
                name="municipio"
                value={departamentoForm.municipio}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>                    
        </Row>
        <Button className="mt-4" variant="success" type="submit">
          Cadastrar departamento
        </Button>
      </Form>
    </Container>
  );
}

export default AddDepartamento;

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/api";

function AddDepartamento({ departamentoForm, setDepartamentoForm }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "active") {
      setDepartamentoForm({ ...departamentoForm, active: e.target.checked });
      return;
    }

    setDepartamentoForm({ ...departamentoForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/departamento/create", departamentoForm);
      navigate("/departamentos");

      toast.success("Novo funcionário foi cadastrado!", {
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

      toast.error("Não foi possível cadastrar novo funcionário", {
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
      <h2 className="my-5">Cadastrar novo funcionário</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Funcionário ativo na empresa"
                name="active"
                onChange={handleChange}
                checked={departamentoForm.active}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nome do funcionário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o nome completo do funcionário"
                name="name"
                value={departamentoForm.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Número de telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o número de telefone para contato com DDD"
                name="phone"
                value={departamentoForm.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Endereço de e-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Insira o endereço de e-mail válido para contato"
                name="email"
                value={departamentoForm.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Remuneração por mês</Form.Label>
              <Form.Control
                type="number"
                placeholder="Insira o valor da remuneração mensal"
                name="salary"
                value={departamentoForm.salary}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Departamento</Form.Label>
              <Form.Select name="department" onChange={handleChange}>
                <option value="0">Selecione uma opção</option>
                <option value="People">People</option>
                <option value="Front-end">Front-end</option>
                <option value="Back-end">Back-end</option>
                <option value="Mobile">Mobile</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Marketing">Marketing</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Data de admissão</Form.Label>
              <Form.Control
                type="date"
                name="admissionDate"
                value={departamentoForm.admissionDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" onChange={handleChange}>
                <option value="0">Selecione uma opção</option>
                <option value="Disponível">Disponível</option>
                <option value="Alocado">Alocado</option>
                <option value="De Férias">De Férias</option>
                <option value="De Licença">De Licença</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button className="mt-4" variant="success" type="submit">
          Cadastrar funcionário
        </Button>
      </Form>
    </Container>
  );
}

export default AddDepartamento;

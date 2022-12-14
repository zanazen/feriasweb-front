import { useContext, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";

function AddFerias({ feriasForm, setFeriasForm }) {
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const employeeId = loggedUser.user._id;

  useEffect(() => {
    setFeriasForm({
      title: "",
      description: "",
      progress: "",
      deadline: "",
    });
  }, [setFeriasForm]);

  const handleChange = (e) => {
    setFeriasForm({ ...feriasForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/ferias/create/${employeeId}`, feriasForm);
      navigate("/folgas");

      toast.success("Nova tarefa cadastrada!", {
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

      toast.error("Não foi possível cadastrar nova tarefa", {
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
      <h2 className="my-5">Cadastrar nova tarefa</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira um título da tarefa"
                name="title"
                value={feriasForm.title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira uma explicação da tarefa"
                name="description"
                value={feriasForm.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Progresso</Form.Label>
              <Form.Select name="progress" onChange={handleChange}>
                <option>Selecione uma opção</option>
                <option value="Não iniciado">Não iniciado</option>
                <option value="Em Progresso">Em Progresso</option>
                <option value="Concluído">Concluído</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Prazo de conclusão</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                value={feriasForm.deadline}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Cadastrar tarefa
        </Button>
      </Form>
    </Container>
  );
}

export default AddFerias;

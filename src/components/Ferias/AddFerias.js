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
      inicio1: "",
      fim1: "",
      inicio2: "",
      fim2: "",
      inicio3: "",
      fim3: "",
    });
  }, [setFeriasForm]);

  const handleChange = (e) => {
    setFeriasForm({ ...feriasForm, [e.target.nome]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/ferias/create/${employeeId}`, feriasForm);
      navigate("/folgas");

      toast.success("Novas férias cadastradas!", {
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

      toast.error("Não foi possível cadastrar novas férias", {
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
      <h2 className="my-5">Cadastrar novas férias</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Início 1</Form.Label>
              <Form.Control
                type="date"
                placeholder="Insira a data de início"
                name="inicio1"
                value={feriasForm.inicio1}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Fim 1</Form.Label>
              <Form.Control
                type="date"
                placeholder="Insira a data fim"
                name="fim1"
                value={feriasForm.fim1}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Início 2</Form.Label>
              <Form.Control
                type="date"
                placeholder="Insira a data de início"
                name="inicio1"
                value={feriasForm.inicio2}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Fim 2</Form.Label>
              <Form.Control
                type="date"
                placeholder="Insira a data fim"
                name="fim1"
                value={feriasForm.fim2}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Início 3</Form.Label>
              <Form.Control
                type="date"
                placeholder="Insira a data de início"
                name="inicio3"
                value={feriasForm.inicio3}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Fim 3</Form.Label>
              <Form.Control
                type="date"
                placeholder="Insira a data fim"
                name="fim3"
                value={feriasForm.fim3}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Cadastrar férias
        </Button>
      </Form>
    </Container>
  );
}

export default AddFerias;

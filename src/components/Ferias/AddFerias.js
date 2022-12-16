import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/api";

function AddFerias() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    inicioPeriodo:"",
    fimPeriodo:"",
    status: "agendado"      
})

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(form.inicioPeriodo && form.fimPeriodo){
    try {
      await api.post(`/ferias/marcar/`, form);
      navigate("/perfil");

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
      console.log(error)
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

      ;
    }
  } else{alert("É necessário preencher o início e o fim das férias para cadastro")}};

  return (
    <Container>
      <h2 className="my-5">Cadastrar novas férias</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Início</Form.Label>
              <Form.Control
                type="date"
                placeholder="Insira a data de início"
                name="inicioPeriodo"
                value={form.inicioPeriodo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Fim</Form.Label>
              <Form.Control
                type="date"
                placeholder="Insira a data fim"
                name="fimPeriodo"
                value={form.fimPeriodo}
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

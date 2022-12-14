import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/api";

function EditDepartamento({ id, userForm, setUserForm }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await api.get(`/user/${id}`);
      setUserForm(response.data);
    };

    fetchEmployee();
  }, [id, setUserForm]);

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
      await api.put(`user/edit/${id}`, userForm);

      navigate("/departamentos");

      toast.success("Departamento atualizado atualizado!", {
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

      toast.error("Não foi possível editar departamento", {
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
    <div>
      <Button variant="primary" onClick={handleShow}>
        Editar departamento
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar novo departamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Departamento ativo na empresa"
                name="active"
                onChange={handleChange}
                defaultChecked
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome do departamento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o nome completo do departamento"
                name="nome"
                value={userForm.nomedepartamento}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sigla do departamento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira a sigla do departamento"
                name="sigla"
                value={userForm.sigla}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o estado do departamento"
                name="estado"
                value={userForm.estado}
                onChange={handleChange}
              />
            </Form.Group>             
            <Form.Group className="mb-3">
              <Form.Label>Município</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o município do departamento"
                name="município"
                value={userForm.município}
                onChange={handleChange}
              />
            </Form.Group>        
            
            <Button variant="success" type="submit">
              Atualizar departamento
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditDepartamento;

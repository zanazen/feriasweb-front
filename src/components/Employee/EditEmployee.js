import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/api";

function EditEmployee({ id, userForm, setUserForm }) {
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
    if (e.target.nome === "active") {
      setUserForm({ ...userForm, active: e.target.checked });
      return;
    }

    setUserForm({ ...userForm, [e.target.nome]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`user/edit/${id}`, userForm);

      navigate("/funcionarios");

      toast.success("Colaborador atualizado!", {
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

      toast.error("Não foi possível editar Colaborador", {
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
        Editar Colaborador
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar novo colaborador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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

            <Form.Group className="mb-3">
              <Form.Label>Cargo do Colaborador</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o cargo do colaborador"
                name="cargo"
                value={userForm.cargo}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Departamento</Form.Label>
              <Form.Control
                type="departamento"
                placeholder="Insira o departamento do colaborador"
                name="departamento"
                value={userForm.departamento}
                onChange={handleChange}
              />  
            </Form.Group>

            <Button variant="success" type="submit">
              Atualizar Colaborador
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditEmployee;

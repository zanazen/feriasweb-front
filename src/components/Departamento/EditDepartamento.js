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

      toast.success("Funcionário atualizado!", {
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

      toast.error("Não foi possível editar funcionário", {
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
        Editar funcionário
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar novo funcionários</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Funcionário ativo na empresa"
                name="active"
                onChange={handleChange}
                defaultChecked
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome do funcionário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o nome completo do funcionário"
                name="nome"
                value={userForm.nome}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número de telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o número de telefone para contato com DDD"
                name="phone"
                value={userForm.phone}
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
              <Form.Label>Data de aniversário</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={userForm.birthDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Remuneração por mês</Form.Label>
              <Form.Control
                type="number"
                placeholder="Insira o valor da remuneração mensal"
                name="salary"
                value={userForm.salary}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Departamento</Form.Label>
              <Form.Select nome="department" onChange={handleChange}>
                <option value="0">Selecione uma opção</option>
                <option value="People">People</option>
                <option value="Front-end">Front-end</option>
                <option value="Back-end">Back-end</option>
                <option value="Mobile">Mobile</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Marketing">Marketing</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data de admissão</Form.Label>
              <Form.Control
                type="date"
                placeholder="Insira o valor da remuneração mensal"
                name="admissionDate"
                value={userForm.admissionDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" onChange={handleChange}>
                <option value="0">Selecione uma opção</option>
                <option value="Disponível">Disponível</option>
                <option value="Alocado">Alocado</option>
                <option value="De Férias">De Férias</option>
                <option value="De Licença">De Licença</option>
              </Form.Select>
            </Form.Group>
            <Button variant="success" type="submit">
              Atualizar funcionário
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditEmployee;

import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { api } from "../../api/api";

function EditFerias({ id, feriasForm, setFeriasForm }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    document.location.reload();
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await api.get(`/ferias/${id}`);
      setFeriasForm(response.data);
    };

    fetchEmployee();
  }, [id, setFeriasForm]);

  const handleChange = (e) => {
    setFeriasForm({ ...feriasForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`ferias/edit/${id}`, feriasForm);
      handleClose();

      toast.success("Férias atualizada!", {
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

      toast.error("Não foi possível atualizar as férias", {
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
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Atualizar férias</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
            <Form.Group className="mb-3">
              <Form.Label>Início 2</Form.Label>
              <Form.Control
                type="date"
                placeholder="Insira a data de início"
                name="inicio2"
                value={feriasForm.inicio2}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fim 2</Form.Label>
              <Form.Control
                type="date"
                placeholder="Insira a data fim"
                name="fim2"
                value={feriasForm.fim2}
                onChange={handleChange}
              />
            </Form.Group>
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
            <Button variant="primary" type="submit">
              Atualizar férias
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditFerias;

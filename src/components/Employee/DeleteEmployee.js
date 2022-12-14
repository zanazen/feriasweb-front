import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/api";

function DeleteTodo({ id }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteEmployee = async (id) => {
    await api.delete(`/user/delete/${id}`);
    navigate("/funcionarios");

    toast.success("Usuário deletado com sucesso!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div>
      <Button variant="danger" onClick={handleShow}>
        Excluir
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja excluir funcionário?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Pense bem! Uma vez excluída não será possível recuperar as informações
          deste funcionário.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => deleteEmployee(id)}>
            Excluir funcionário
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteTodo;

import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { api } from "../../api/api";

function DeleteDepartamento({ id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    document.location.reload();
  };
  const handleShow = () => setShow(true);

  const deleteDepartamento = async (id) => {
    await api.delete(`/departamento/delete/${id}`);
    handleClose();

    toast.warning("Departamento deletado com sucesso!", {
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
          <Modal.Title>Deseja exclui o departamento?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Pense bem! Uma vez excluída não será possível recuperar o departamento.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => deleteDepartamento(id)}>
            Excluir departamento
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteDepartamento;
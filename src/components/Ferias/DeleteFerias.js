import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { api } from "../../api/api";

function DeleteFerias({ id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    document.location.reload();
  };
  const handleShow = () => setShow(true);

  const deleteFerias = async (id) => {
    await api.delete(`/ferias/delete/${id}`);
    handleClose();

    toast.warning("Férias deletada com sucesso!", {
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
          <Modal.Title>Deseja excluir férias?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Pense bem! Uma vez excluída não será possível recuperar as férias.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => deleteFerias(id)}>
            Excluir férias
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteFerias;

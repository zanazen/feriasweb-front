import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/api";

function Register() {
  const navigate = useNavigate();
//  const [img, setImg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

//  const handleImage = (e) => {
//    setImg(e.target.files[0]);
//  };

 const handleUpload = async () => {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/upload-image", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imgURL = await handleUpload();
      await api.post("/user/register", { ...form, profileImg: imgURL });

      navigate("/login");

      toast.success("Cadastro concluído com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);

      toast.error("Não foi possível cadastrar", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

    return (
        <Container
        style={{ height: "100vh" }}
        className="d-flex flex-column align-items-center justify-content-center" >
        <Form className="w-50" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome do Usuário/Colaborador</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira seu nome para identificação"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira o seu e-mail"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Form.Group>

//        <Form.Group>
//          <Form.Label>Imagem de perfil</Form.Label>
//          <Form.Control type="file" onChange={handleImage} />
//        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insira uma senha válida"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirmar senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirme a senha válida criada anteriormente"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="my-3" variant="dark" type="submit">
          Cadastrar usuário/colaborador
        </Button>
      </Form>

      <Form.Text>
        Já possui cadastro? Faça já o
        <Link className="text-warning fw-bold text-decoration-none" to="/login">
          {" "}
          login
        </Link>
      </Form.Text>
    </Container>
    );
}

export default Register;
import { useContext, useEffect, useReducer, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";

function Profile() {
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    nome: "",
    email: "",
    cargo: "",
    departamento: "",
    inicioExercicio: "",
    ferias: [],
  });
  function formatDateToDefault(dt) {
    const TzDt = new Date(dt).getTime();
    const newDt = new Date(TzDt);
    return `${newDt.getFullYear()}-${
      newDt.getMonth() + 1 < 10
        ? `0${newDt.getMonth() + 1}`
        : newDt.getMonth() + 1
    }-${newDt.getDate() < 10 ? `0${newDt.getDate()}` : newDt.getDate()}`;
  }
   function formatDate(dt) {
    const TzDt = dt.split("-");
    return `${TzDt[2]}/${TzDt[1]}/${TzDt[0]}`;
  }

  const [originUser, setOriginUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [editar, setEditar] = useState(false);
  async function getData() {
    try {
      setLoading(true);
      const getUser = await api.get("/user/all");
      delete getUser.password;
      console.log(getUser);
      setUser(getUser.data);
      setOriginUser(getUser.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (!loggedUser) {
    return navigate("/erro");
  }
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (<>
      <Container>
      
        <h1>Olá {loggedUser.user.nome}</h1>

        <Card>
          <Card.Header>
            <h5 className="fw-bold m-0 py-1">Dados do Colaborador</h5>
          </Card.Header>

          <Card.Body>
            <fieldset disabled={!editar}>
              <Row className="mt-3">
                <Form.Group className="mt-3">
                  <FloatingLabel>Nome:</FloatingLabel>
                  <Col>
                    <Form.Control
                      id="nome"
                      type="text"
                      value={user.nome}
                      onChange={(e) =>
                        setUser({ ...user, nome: e.target.value })
                      }
                    />
                  </Col>
                </Form.Group>
                <Col>
                  <Form.Group className="mt-3">
                    <FloatingLabel>Cargo:</FloatingLabel>
                    <Col>
                      <Form.Control
                        id="cargo"
                        type="text"
                        value={user.cargo}
                        onChange={(e) =>
                          setUser({ ...user, cargo: e.target.value })
                        }
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Form.Group className="mt-3">
                  <FloatingLabel>Deparatamento:</FloatingLabel>
                  <Col>
                    <Form.Control
                      id="nome"
                      type="text"
                      value={user.departamento}
                      onChange={(e) =>
                        setUser({ ...user, departamento: e.target.value })
                      }
                    />
                  </Col>
                </Form.Group>
                <Col>
                  <Form.Group className="mt-3">
                    <FloatingLabel>Inicio de Exercício:</FloatingLabel>
                    <Col>
                      <Form.Control
                        id="cargo"
                        type="date"
                        value={formatDateToDefault(user.inicioExercicio)}
                        onChange={(e) =>
                          setUser({ ...user, inicioExercicio: e.target.value })
                        }
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </fieldset>
            {!editar && (
              <Button
                variant="outline-primary"
                className="mt-4"
                onClick={() => setEditar(true)}
              >
                {" "}
                Editar dados
              </Button>
            )}
            {editar && (
              <>
                <Button
                  variant="outline-danger"
                  className="mt-4"
                  onClick={() => {
                    setEditar(false);
                    setUser(originUser);
                  }}
                >
                  {" "}
                  Cancelar
                </Button>
                <Button
                  variant="outline-success"
                  className="mt-4 ms-4"
                  onClick={async () => {try{
                    await api.put("user/edit", user);
                    getData();                    
                    setEditar(false)}
                  catch(err){console.log(err)}
                  }}
                >
                  {" "}
                  Salvar alterações
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
      <hr/>
      <Container>
      <h2>Férias agendadas</h2>
      <Card>
        <Table>
        <thead>
        <th>#</th>
          <th>Data início</th>
          <th>Data fim</th>
          <th></th>
        </thead>
        <tbody>
          {user.ferias.map((element, index)=>{
            if(user.ferias.length===0){return <tr>Não há férias agendadas para o servidor</tr>}
            else{return <tr key={element._id}>
              <td>{index+1}</td>
              <td>{formatDate(formatDateToDefault(element.inicioPeriodo))}</td>
              <td>{formatDate(formatDateToDefault(element.fimPeriodo))}</td>
              <td>
              <fieldset disabled={!editar}>
              <Button variant="danger" onClick={async()=>{try{
                await api.delete(`/ferias/delete/${element._id}`)
                getData();
              }catch(err){console.log(err)}}}>Excluir</Button>
              </fieldset> </td>
            </tr>}
          })}
        </tbody>

        </Table>
      </Card>

      </Container>
      </>
    );
  }
}

export default Profile;

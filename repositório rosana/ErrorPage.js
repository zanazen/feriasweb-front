import { Alert, Container } from "react-bootstrap";

function ErrorPage() {
  return (
    <Container className="my-5">
      <Alert className="w-75 m-auto" variant="danger">
        <Alert.Heading>Ops... Algo deu errado!</Alert.Heading>
        <p>
          Acho que você tentou acessar uma rota sem permissão ou não existente.
        </p>
        <p>Volte para a página anterior e tente mais tarde novamente</p>
      </Alert>
    </Container>
  );
}

export default ErrorPage;
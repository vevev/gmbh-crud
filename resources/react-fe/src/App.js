import Index from "./Pages/Index";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Container} from "react-bootstrap";

function App() {
  return (
    <Container className="mt-3">
        <h1 className="mb-3">Quản lý người dùng</h1>
        <Index />
    </Container>
  );
}

export default App;

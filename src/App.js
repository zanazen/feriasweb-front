import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import EmployeeList from "./components/Employee/EmployeeList";
import AddEmployee from "./components/Employee/AddEmployee";
import EmployeeDetails from "./components/Employee/EmployeeDetails";
import NavigationBar from "./components/NavigationBar";
import FeriasList from "./components/Ferias/FeriasList";
import AddFerias from "./components/Ferias/AddFerias";
import AddDepartamento from "./components/Departamento/AddDepartamento";
import DepartamentoList from "./components/Departamento/DepartamentoList";

function App() {
  const [feriasForm, setFeriasForm] = useState({
    inicio1: "",
    fim1: "",
    inicio2: "",
    fim2: "",
    inicio3: "",
    fim3: "",    
  });

  const [userForm, setUserForm] = useState({
    nome: "",    
    email: "",
    cargo: "",     
    departamento: ""    
  });

  const [departamentoForm, setDepartamentoForm] = useState({
    nomedepartamento: "",    
    sigla: "",
    estado: "",     
    município: ""    
  });

  return (
    <div className="App">
      <ToastContainer />
      <AuthContextComponent>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/funcionarios" element={<EmployeeList />} />
          <Route
            path="/funcionarios/adicionar"
            element={
              <AddEmployee userForm={userForm} setUserForm={setUserForm} />
            }
          />
          <Route
            path="/funcionarios/:id"
            element={
              <EmployeeDetails userForm={userForm} setUserForm={setUserForm} />
            }
          />
          <Route
            path="/folgas"
            element={<FeriasList todoForm={feriasForm} setFeriasForm={setFeriasForm} />}
          />
          <Route
            path="/folgas/nova-folga"
            element={<AddFerias todoForm={feriasForm} setFeriasForm={setFeriasForm} />}
          />
          <Route
            path="/departametos"
            element={<DepartamentoList todoForm={departamentoForm} setDepartamentoForm={setDepartamentoForm} />}
          />
          <Route
            path="/departamentos/novo-departamento"
            element={<AddDepartamento todoForm={departamentoForm} setDepartamentoForm={setDepartamentoForm} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
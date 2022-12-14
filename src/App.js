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

function App() {
  const [feriasForm, setFeriasForm] = useState({
    title: "",
    description: "",
    progress: "",
    deadline: "",
  });

  const [userForm, setUserForm] = useState({
    nome: "",    
    email: "",
    cargo: "",     
    departamento: ""    
  });

  const [departamentoForm, setDepartamentoForm] = useState({
    nome: "",    
    email: "",
    cargo: "",     
    departamento: ""    
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
            path="/tarefas/nova-tarefa"
            element={<AddFerias todoForm={feriasForm} setFeriasForm={setFeriasForm} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
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
import TodoList from "./components/Todo/TodoList";
import AddTodo from "./components/Todo/AddTodo";

function App() {
  const [todoForm, setTodoForm] = useState({
    title: "",
    description: "",
    progress: "",
    deadline: "",
  });

  const [userForm, setUserForm] = useState({
    name: "",
    salary: "",
    email: "",
    phone: "",
    department: "",
    admissionDate: "",
    status: "",
    active: true,
    address: {
      city: "",
      state: "",
    },
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
            path="/tarefas"
            element={<TodoList todoForm={todoForm} setTodoForm={setTodoForm} />}
          />
          <Route
            path="/tarefas/nova-tarefa"
            element={<AddTodo todoForm={todoForm} setTodoForm={setTodoForm} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
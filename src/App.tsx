import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateAppointment from "./Screens/CreateAppointment/CreateAppointment";
import Login from "./Screens/Login/Login";
import ManageAppointments from "./Screens/ManageAppointments/ManageAppointments";
import Dashboard from "./Screens/Dashboard/Dashboard";
import { IAppointment } from "./types/types";
import Header from "./components/header/Header";
import { useContext } from "react";
import { AuthContext } from "./Providers/AuthContext";

function App() {
  const apps: IAppointment[] = JSON.parse(
    localStorage.getItem("appointment-details") || "[]"
  );
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreateAppointment />} />
        <Route path="/manage" element={<ManageAppointments />} />
        <Route path="/dashboard" element={<Dashboard appointments={apps} />} />
      </Routes>
    </>
  );
}

export default App;

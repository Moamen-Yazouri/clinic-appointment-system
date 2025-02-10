import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateAppointment from "./Screens/CreateAppointment/CreateAppointment";
import ManageAppointments from "./Screens/ManageAppointments/ManageAppointments";
import Dashboard from "./Screens/Dashboard/Dashboard";
import { IAppointment } from "./types/types";
import Login from "./Screens/Login/Login";

function App() {
  const apps: IAppointment[] = JSON.parse(
    localStorage.getItem("appointment-details") || "[]"
  );

  return (
    <>
      <h1>Clinic Appointment System</h1>
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

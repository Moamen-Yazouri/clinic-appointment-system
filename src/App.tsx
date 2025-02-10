import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateAppointment from "./Screens/CreateAppointment/CreateAppointment";
import Login from "./Screens/Login/Login";
import ManageAppointments from "./Screens/ManageAppointments/ManageAppointments";
import Dashboard from "./Screens/Dashboard/Dashboard";
import { IAppointment} from "./types/types";
function App() {
    const apps: IAppointment[] = JSON.parse(
      localStorage.getItem("appointment-details") || "[]"
    );
  

  return (
    <>
      <h1>Clinic Appointment System</h1>
      {/* <Login /> */}
      {/* <CreateAppointment /> */}
      {/* <ManageAppointments /> */}
      {/* <Dashboard appointments={apps} /> */}
      <Routes>
        <Route path="/" element={<CreateAppointment />} />
        <Route path="/manage" element={<ManageAppointments />} />
        <Route path="/dashboard" element={<Dashboard appointments={apps} />} />
      </Routes>
    </>
  );
}

export default App;

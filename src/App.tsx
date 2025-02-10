import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateAppointment from "./Screens/CreateAppointment/CreateAppointment";
import Login from "./Screens/Login/Login";
import ManageAppointments from "./Screens/ManageAppointments/ManageAppointments";
import Dashboard from "./Screens/Dashboard/Dashboard";
import { IAppointment} from "./types/types";
function App() {
<<<<<<< HEAD
    const apps: IAppointment[] = JSON.parse(
      localStorage.getItem("appointment-details") || "[]"
    );
  
=======
  const apps: IAppointment[] = JSON.parse(
    localStorage.getItem("appointment-details") || "[]"
  );
>>>>>>> c9034c249db683cf0266b4a5ed6959049776b941

  return (
    <>
      <h1>Clinic Appointment System</h1>
<<<<<<< HEAD
      {/* <Login /> */}
      {/* <CreateAppointment /> */}
      {/* <ManageAppointments /> */}
      {/* <Dashboard appointments={apps} /> */}
=======
>>>>>>> c9034c249db683cf0266b4a5ed6959049776b941
      <Routes>
        <Route path="/" element={<CreateAppointment />} />
        <Route path="/manage" element={<ManageAppointments />} />
        <Route path="/dashboard" element={<Dashboard appointments={apps} />} />
      </Routes>
    </>
  );
}

export default App;

import "./App.css";
import CreateAppointment from "./Screens/CreateAppointment/CreateAppointment";
import Dashboard from "./Screens/Dashboard/Dashboard";
import { IAppointment, Status } from "./types/types";

function App() {
  // const apps: IAppointment[] = JSON.parse(localStorage.getItem("appointment-details") || "[]");
  
  return (
    <>
      <h1>Clinic Appointment System</h1>
      {/* <Dashboard appointments={apps}/> */}
      {/* <CreateAppointment/> */}
    </>
  );
}

export default App;

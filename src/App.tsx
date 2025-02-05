import "./App.css";
import CreateAppointment from "./Screens/CreateAppointment/CreateAppointment";
// import ManageAppointments from "./Screens/ManageAppointments/ManageAppointments";
// import Dashboard from "./Screens/Dashboard/Dashboard";
// import { IAppointment, Status } from "./types/types";
function App() {
  //   const apps: IAppointment[] = JSON.parse(
  //     localStorage.getItem("appointment-details") || "[]"
  //   );

  return (
    <>
      <h1>Clinic Appointment System</h1>
      <CreateAppointment />
      {/* <ManageAppointments /> */}
      {/* <Dashboard appointments={apps} /> */}
    </>
  );
}

export default App;

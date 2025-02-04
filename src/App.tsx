import "./App.css";
import CreateAppointment from "./Screens/CreateAppointment/CreateAppointment";
// import Dashboard from "./Screens/Dashboard/Dashboard";
// import { IAppointment, Status } from "./types/types";
// import ManageAppointments from "./Screens/ManageAppointments/ManageAppointments";
function App() {
  //   const apps: IAppointment[] = JSON.parse(
  //     localStorage.getItem("appointment-details") || "[]"
  //   );

  return (
    <>
      {/* <h1>Clinic Appointment System</h1> */}
      <CreateAppointment />
      {/* <Dashboard appointments={apps} /> */}
      {/* <ManageAppointments /> */}
    </>
  );
}

export default App;

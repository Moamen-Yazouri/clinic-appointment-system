import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateAppointment from "./Screens/createAppointment/CreateAppointment";
import Login from "./Screens/login/Login";
import ManageAppointments from "./Screens/manageAppointments/ManageAppointments";
import Dashboard from "./Screens/dashboard/Dashboard";
import { IAppointment } from "./types/types";
import AppHeader from "./components/appHeader/AppHeader";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Providers/AuthContext";
import Error404 from "./Screens/error404/Error404";
import dayjs from "dayjs";
import Unauthorized from "./Screens/unauthorized/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const data = localStorage.getItem("appointment-details");
    if (data) {
      let parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        parsedData = [...parsedData].sort(
          (a, b) => dayjs(a.dateTime).valueOf() - dayjs(b.dateTime).valueOf()
        );
        setAppointments(parsedData);
      }
    } else {
      setAppointments([]);
    }
  }, []);

  return (
    <>
      {user && <AppHeader />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute allowedRoles="PATIENT" />}>
          <Route path="/create" element={<CreateAppointment />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles="DOCTOR" />}>
          <Route
            path="/manage"
            element={
              <ManageAppointments
                appointments={appointments}
                setAppointments={setAppointments}
              />
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard appointments={appointments} />}
          />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        <Route path="/*" element={<Error404 />}></Route>
      </Routes>
    </>
  );
}

export default App;

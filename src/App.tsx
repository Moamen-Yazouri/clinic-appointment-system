import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateAppointment from "./Screens/CreateAppointment/CreateAppointment";
import Login from "./Screens/Login/Login";
import ManageAppointments from "./Screens/ManageAppointments/ManageAppointments";
import Dashboard from "./Screens/Dashboard/Dashboard";
import { IAppointment } from "./types/types";
import Header from "./components/header/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Providers/AuthContext";
import Error404 from "./Screens/Error404/Error404";
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
      {user && <Header />}
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

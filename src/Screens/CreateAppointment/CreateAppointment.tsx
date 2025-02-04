import "./CreateAppointment.css";
import CreateAppointmentForm from "../../components/createAppointmentForm/CreateAppointmentForm";
import { useState } from "react";
import RenderSubmittedData from "../../components/renderSubmittedData/RenderSubmittedData";
import { IAppointment, Status } from "../../types/types";

const CreateAppointment = () => {
  const appointmentsNumber = JSON.parse(
    localStorage.getItem("appointment-details") || "[]"
  );
  const [patientData, setPatientData] = useState<IAppointment>({
    name: "",
    contact: "",
    age: "",
    gender: "",
    dateTime: null,
    symptoms: "",
    appointmentId: appointmentsNumber ? appointmentsNumber.length + 1 : 1,
    status: Status.PENDING,
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container">
      {submitted ? (
        <RenderSubmittedData patientData={patientData} />
      ) : (
        <CreateAppointmentForm
          patientData={patientData}
          setPatientData={setPatientData}
          setSubmitted={setSubmitted}
        />
      )}
    </div>
  );
};

export default CreateAppointment;

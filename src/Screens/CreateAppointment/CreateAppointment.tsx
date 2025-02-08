import "./CreateAppointment.css";
import { useState } from "react";
import { IAppointment, Status } from "../../types/types";
import dayjs from "dayjs";
import CreateAppointmentForm from "../../components/CreateAppointmentForm/CreateAppointmentForm";

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
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setPatientData({ ...patientData, dateTime: date });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      patientData.name &&
      patientData.contact &&
      patientData.age &&
      patientData.gender &&
      patientData.dateTime &&
      patientData.symptoms
    ) {
      const data: IAppointment[] = JSON.parse(
        localStorage.getItem("appointment-details") || "[]"
      );
      const checkedArray = Array.isArray(data)
        ? [...data, patientData]
        : [patientData];
      localStorage.setItem("appointment-details", JSON.stringify(checkedArray));
      setSubmitted(true);
    }
  };
  return (
    <div className="container">
      {submitted ? (
        <div className="success-message">
          <h2>Appointment successfully created!</h2>
          <h3>Submitted Appointment Details:</h3>
          <p>
            <strong>Patient Name:</strong> {patientData.name}
          </p>
          <p>
            <strong>Contact:</strong> {patientData.contact}
          </p>
          <p>
            <strong>Age:</strong> {patientData.age}
          </p>
          <p>
            <strong>Gender:</strong> {patientData.gender}
          </p>
          <p>
            <strong>Appointment Date/Time:</strong>
            {patientData.dateTime
              ? dayjs(patientData.dateTime).format("MM/DD/YYYY, hh:mm A")
              : ""}
          </p>
          <p>
            <strong>Symptoms:</strong> {patientData.symptoms}
          </p>
        </div>
      ) : (
        <>
          <h2>Create Appointment</h2>
          <CreateAppointmentForm
          patientData={patientData}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          handleSubmit={handleSubmit}
        />
        </>
      )}
    </div>
  );
};

export default CreateAppointment;

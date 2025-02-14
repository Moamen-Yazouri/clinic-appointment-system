import "./CreateAppointment.css";
import { useState } from "react";
import { IAppointment, Status } from "../../types/types";
import ShowAppointment from "../../components/showAppointment/ShowAppointment";
import CreateAppointmentForm from "../../components/CreateAppointmentForm/CreateAppointmentForm";
import dayjs from "dayjs";

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
    
    const storedAppointments: IAppointment[] = JSON.parse(
      localStorage.getItem("appointment-details") || "[]"
    );
  
    if (
      patientData.name &&
      patientData.contact &&
      patientData.age &&
      patientData.gender &&
      patientData.dateTime &&
      patientData.symptoms
    ) {
      const isDateTaken = storedAppointments.some(
        (appointment) =>
          dayjs(appointment.dateTime).format("YYYY-MM-DD HH:mm") === 
          dayjs(patientData.dateTime).format("YYYY-MM-DD HH:mm")
      );
  
      if (isDateTaken) {
        alert("This appointment is booked in advance.");
        return;
      }
  
      const updatedAppointments = [
        ...storedAppointments, 
        { ...patientData, dateTime: dayjs(patientData.dateTime).toISOString() }       
      ];
      
      localStorage.setItem("appointment-details", JSON.stringify(updatedAppointments));
      
      setSubmitted(true);
    }
  };
  
  return (
    <div className="container">
      {submitted ? (
        <div><ShowAppointment patientData={patientData}/></div>
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

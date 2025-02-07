import "./CreateAppointment.css";
import { useState } from "react";
import { IAppointment, Status } from "../../types/types";
import dayjs from "dayjs";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";

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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Patient Name"
              value={patientData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={patientData.contact}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={patientData.age}
              onChange={handleChange}
              required
            />
            <select
              className="gender"
              name="gender"
              value={patientData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <DateTimePicker
              selectedDate={patientData.dateTime}
              onDateChange={handleDateChange}
            />

            <textarea
              name="symptoms"
              placeholder="Describe Symptoms"
              value={patientData.symptoms}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateAppointment;

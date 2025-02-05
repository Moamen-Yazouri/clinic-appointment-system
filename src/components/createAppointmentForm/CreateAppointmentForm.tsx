import { IAppointment } from "../../types/types";
import "./create-appointment-form.css";
import DateTimePicker from "../dateTimePicker/DateTimePicker";

interface IProps {
  patientData: IAppointment;
  setPatientData: React.Dispatch<React.SetStateAction<IAppointment>>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAppointmentForm = (props: IProps) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    props.setPatientData({
      ...props.patientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    props.setPatientData({ ...props.patientData, dateTime: date });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      props.patientData.name &&
      props.patientData.contact &&
      props.patientData.age &&
      props.patientData.gender &&
      props.patientData.dateTime &&
      props.patientData.symptoms
    ) {
      const data: IAppointment[] = JSON.parse(
        localStorage.getItem("appointment-details") || "[]"
      );
      const checkedArray = Array.isArray(data)
        ? [...data, props.patientData]
        : [props.patientData];
      localStorage.setItem("appointment-details", JSON.stringify(checkedArray));
      props.setSubmitted(true);
    }
  };
  return (
    <>
      <h2>Create Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={props.patientData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={props.patientData.contact}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={props.patientData.age}
          onChange={handleChange}
          required
        />
        <select
          className="gender"
          name="gender"
          value={props.patientData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <DateTimePicker
          selectedDate={props.patientData.dateTime}
          onDateChange={handleDateChange}
        />

        <textarea
          name="symptoms"
          placeholder="Describe Symptoms"
          value={props.patientData.symptoms}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateAppointmentForm;

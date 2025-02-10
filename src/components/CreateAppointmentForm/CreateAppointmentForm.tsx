import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import { IAppointment } from "../../types/types";

interface IAppointmentFormProps {
  patientData: IAppointment;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleDateChange: (date: Date | null) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const CreateAppointmentForm: React.FC<IAppointmentFormProps> = ({
  patientData,
  handleChange,
  handleDateChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        pattern="[A-Za-z ]{3,30}"
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
        min={18}
        max={100}
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
  );
};

export default CreateAppointmentForm;

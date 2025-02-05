import { IAppointment, Status } from "../../types/types";

interface IProps {
  filteredArray: IAppointment[];
  setFilteredArray: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  setAppointments: React.Dispatch<React.SetStateAction<IAppointment[]>>;
}

const ManageAppointmentsTable = (props: IProps) => {
  const handleStatusChange = (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedArray = [...props.filteredArray];
    if (e.target.value.toLowerCase() === "pending") {
      updatedArray[index].status = Status.PENDING;
    } else if (e.target.value.toLowerCase() === "confirmed") {
      updatedArray[index].status = Status.CONFIRMED;
    } else {
      updatedArray[index].status = Status.COMPLETED;
    }
    props.setFilteredArray(updatedArray);
    localStorage.setItem("appointment-details", JSON.stringify(updatedArray));
    props.setAppointments(updatedArray);
  };
  const handleNoteChange = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const updatedArray = [...props.filteredArray];
    updatedArray[index].note = value;
    props.setFilteredArray(updatedArray);
    localStorage.setItem("appointment-details", JSON.stringify(updatedArray));
    props.setAppointments(updatedArray);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Appointment ID</th>
          <th>Age</th>
          <th>Contact</th>
          <th>Date & Time</th>
          <th>Gender</th>
          <th>Name</th>
          <th>Status</th>
          <th>Symptoms</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {props.filteredArray.map((appointment, index) => (
          <tr key={index}>
            <td>{appointment.appointmentId}</td>
            <td>{appointment.age}</td>
            <td>{appointment.contact}</td>
            <td>{appointment.dateTime?.toLocaleString()}</td>
            <td>{appointment.gender}</td>
            <td>{appointment.name}</td>
            <td>
              <select
                value={appointment.status}
                onChange={(e) => handleStatusChange(index, e)}
              >
                <option value={Status.PENDING}>Pending</option>
                <option value={Status.CONFIRMED}>Confirmed</option>
                <option value={Status.COMPLETED}>Completed</option>
              </select>
            </td>
            <td>{appointment.symptoms}</td>
            <td>
              <textarea
                value={appointment.note}
                onChange={(e) => handleNoteChange(index, e)}
                placeholder="Enter Note"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ManageAppointmentsTable;

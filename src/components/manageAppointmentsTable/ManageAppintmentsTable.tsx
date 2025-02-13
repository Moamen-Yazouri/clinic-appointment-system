import dayjs from "dayjs";
import { IAppointment, Status } from "../../types/types";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

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
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="a dense tables">
          <TableHead>
            <TableRow>
              <TableCell align="center">Appointment ID</TableCell>
              <TableCell align="center">Patient Name</TableCell>
              <TableCell align="center">Patient Age</TableCell>
              <TableCell align="center">Patient Contact</TableCell>
              <TableCell align="center">Patient Gender</TableCell>
              <TableCell align="center">Appointment Status</TableCell>
              <TableCell align="center">Appointment Date & Time</TableCell>
              <TableCell align="center">Symptoms</TableCell>
              <TableCell align="center">Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.filteredArray.map((appointment, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {appointment.appointmentId}
                </TableCell>
                <TableCell align="center">{appointment.name}</TableCell>
                <TableCell align="center">{appointment.age}</TableCell>
                <TableCell align="center">{appointment.contact}</TableCell>
                <TableCell align="center">{appointment.gender}</TableCell>
                <TableCell align="center">
                  <select
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(index, e)}
                  >
                    <option value={Status.PENDING}>Pending</option>
                    <option value={Status.CONFIRMED}>Confirmed</option>
                    <option value={Status.COMPLETED}>Completed</option>
                  </select>
                </TableCell>
                <TableCell align="center">
                  {dayjs(appointment.dateTime).format("MM/DD/YYYY, hh:mm A")}
                </TableCell>
                <TableCell align="center">{appointment.symptoms}</TableCell>
                <TableCell align="center">
                  <textarea
                    value={appointment.note}
                    onChange={(e) => handleNoteChange(index, e)}
                    placeholder="Enter Note"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ManageAppointmentsTable;

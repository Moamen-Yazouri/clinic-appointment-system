import { useState, useEffect } from "react";
import { IAppointment, Status } from "../../types/types";
import dayjs from "dayjs";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredArray, setFilteredArray] =
    useState<IAppointment[]>(appointments);
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("appointment-details");
    if (data) {
      let parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        parsedData = [...parsedData].sort(
          (a, b) => dayjs(a.dateTime).valueOf() - dayjs(b.dateTime).valueOf()
        );
        setAppointments(parsedData);
        setFilteredArray(parsedData);
      }
    } else {
      setAppointments([]);
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameFilter(value);
    setFilteredArray(
      appointments.filter((appointment) =>
        appointment.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedFilter(value);
    if (value !== "all") {
      setFilteredArray(
        appointments.filter(
          (appointment) =>
            appointment.status.toLowerCase() === value.toLowerCase()
        )
      );
    } else {
      setFilteredArray(appointments);
    }
  };

  const handleStatusChange = (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedArray = [...filteredArray];
    if (e.target.value.toLowerCase() === "pending") {
      updatedArray[index].status = Status.PENDING;
    } else if (e.target.value.toLowerCase() === "confirmed") {
      updatedArray[index].status = Status.CONFIRMED;
    } else {
      updatedArray[index].status = Status.COMPLETED;
    }
    setFilteredArray(updatedArray);
    localStorage.setItem("appointment-details", JSON.stringify(updatedArray));
    setAppointments(updatedArray);
  };

  const handleNoteChange = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const updatedArray = [...filteredArray];
    updatedArray[index].note = value;
    setFilteredArray(updatedArray);
    localStorage.setItem("appointment-details", JSON.stringify(updatedArray));
    setAppointments(updatedArray);
  };

  return (
    <div>
      <select value={selectedFilter} onChange={handleSelectChange}>
        <option value="all">All</option>
        <option value="pending">pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="completed">Completed</option>
      </select>
      <input
        type="text"
        placeholder="Enter patient name"
        value={nameFilter}
        onChange={handleNameChange}
      />
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
        {/* parsedData = [...parsedData].sort(
          (a, b) => dayjs(a.dateTime).valueOf() - dayjs(b.dateTime).valueOf()
        ); */}
        <tbody>
          {filteredArray.map((appointment, index) => (
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
    </div>
  );
};

export default ManageAppointments;

import { useState, useEffect } from "react";
import { IAppointment } from "../../types/types";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  // const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const data = localStorage.getItem("appointment-details");
    if (data) {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        setAppointments(parsedData);
      }
    } else {
      setAppointments([]);
    }
  }, []);
  // let filteredArray: IAppointment[];
  // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedFilter(e.target.value);
  //   filteredArray = appointments.filter(
  //     (appointment) => appointment.status === e.target.value
  //   );
  // };
  // let renderedArray;
  //   if (selectedFilter === "all" || ) {
  //     renderedArray = appointments;
  //   } else {
  //     renderedArray = filteredArray;
  //   }
  // };
  return (
    <>
      {appointments &&
        appointments.map((appointment, index) => {
          return (
            <ul key={index}>
              <li>{appointment.appointmentId}</li>
              <li>{appointment.age}</li>
              <li>{appointment.contact}</li>
              <li>{appointment.dateTime?.toLocaleString()}</li>
              <li>{appointment.gender}</li>
              <li>{appointment.name}</li>
              <li>{appointment.status}</li>
              <li>{appointment.symptoms}</li>
            </ul>
          );
        })}
      <select>
        <option value="all">All</option>
        <option value="pending">pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="completed">Completed</option>
      </select>
    </>
  );
};

export default ManageAppointments;

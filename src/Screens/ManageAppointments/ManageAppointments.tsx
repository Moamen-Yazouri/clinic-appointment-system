import { useState, useEffect } from "react";
import { IAppointment } from "../../types/types";
import dayjs from "dayjs";
import ManageAppointmentsTable from "../../components/manageAppointmentsTable/ManageAppintmentsTable";
import Filters from "../../components/filters/Filters";

interface IProps {
  appointments: IAppointment[];
  setAppointments: React.Dispatch<React.SetStateAction<IAppointment[]>>;
}

const ManageAppointments = (props: IProps) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredArray, setFilteredArray] = useState<IAppointment[]>(
    props.appointments
  );
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("appointment-details");
    if (data) {
      let parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        parsedData = [...parsedData].sort(
          (a, b) => dayjs(a.dateTime).valueOf() - dayjs(b.dateTime).valueOf()
        );
        props.setAppointments(parsedData);
        setFilteredArray(parsedData);
      }
    } else {
      props.setAppointments([]);
      setFilteredArray([]);
    }
  }, []);

  useEffect(() => {
    setFilteredArray(
      props.appointments.filter((appointment) => {
        const matchesName = nameFilter
          ? appointment.name.toLowerCase().includes(nameFilter.toLowerCase())
          : true;

        const matchesStatus = selectedFilter
          ? appointment.status.toLowerCase() === selectedFilter.toLowerCase()
          : true;

        return matchesName && matchesStatus;
      })
    );
  }, [nameFilter, selectedFilter, props.appointments]);

  return props.appointments.length > 0 ? (
    <div className="manage-screen-container">
      <Filters
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
      />
      {filteredArray.length > 0 ? (
        <ManageAppointmentsTable
          filteredArray={filteredArray}
          setFilteredArray={setFilteredArray}
          setAppointments={props.setAppointments}
        />
      ) : (
        <h2 style={{ color: "red" }}>
          There is no data in these filters to display.
        </h2>
      )}
    </div>
  ) : (
    <h2 style={{ color: "red" }}>There is no data to show</h2>
  );
};

export default ManageAppointments;

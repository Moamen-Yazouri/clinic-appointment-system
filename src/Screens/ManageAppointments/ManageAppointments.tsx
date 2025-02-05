import { useState, useEffect } from "react";
import { IAppointment } from "../../types/types";
import dayjs from "dayjs";
import ManageAppointmentsTable from "../../components/manageAppointmentsTable/ManageAppintmentsTable";
import Filters from "../../components/filters/Filters";

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
      setFilteredArray([]);
    }
  }, []);

  useEffect(() => {
    setFilteredArray(
      appointments.filter((appointment) => {
        const matchesName = nameFilter
          ? appointment.name.toLowerCase().includes(nameFilter.toLowerCase())
          : true;

        const matchesStatus =
          selectedFilter !== "all"
            ? appointment.status.toLowerCase() === selectedFilter.toLowerCase()
            : true;

        return matchesName && matchesStatus;
      })
    );
  }, [nameFilter, selectedFilter, appointments]);

  return appointments.length > 0 ? (
    <div>
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
          setAppointments={setAppointments}
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

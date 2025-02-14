import dayjs from "dayjs";
import { IAppointment, Status } from "../../types/types";
import "./manage-appointment-table.css";

import { Table, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";

interface IProps {
  filteredArray: IAppointment[];
  setFilteredArray: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  setAppointments: React.Dispatch<React.SetStateAction<IAppointment[]>>;
}

const ManageAppointmentsTable = (props: IProps) => {
  const handleStatusChange = (index: number, value: string) => {
    const updatedArray = [...props.filteredArray];
    if (value.toLowerCase() === "pending") {
      updatedArray[index].status = Status.PENDING;
    } else if (value.toLowerCase() === "confirmed") {
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

  const { Option } = Select;
  const { TextArea } = Input;
  const columns: ColumnsType<IAppointment> = [
    {
      title: "Appointment ID",
      dataIndex: "appointmentId",
      key: "appointmentId",
      align: "center",
    },
    {
      title: "Patient Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Patient Age",
      dataIndex: "age",
      key: "age",
      align: "center",
    },
    {
      title: "Patient Contact",
      dataIndex: "contact",
      key: "contact",
      align: "center",
    },
    {
      title: "Patient gender",
      dataIndex: "gender",
      key: "gender",
      align: "center",
    },
    {
      title: "Appointment Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: string, record: IAppointment, index: number) => {
        return (
          <Select
            value={status}
            onChange={(value) => handleStatusChange(index, value)}
          >
            <Option value="Pending">Pending</Option>
            <Option value="Confirmed">Confirmed</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        );
      },
    },
    {
      title: "Appointment Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
      align: "center",
      render: (dateTime: string) =>
        dayjs(dateTime).format("MM/DD/YYYY, hh:mm A"),
    },
    {
      title: "Symptoms",
      dataIndex: "symptoms",
      key: "symptoms",
      align: "center",
    },
    {
      title: "Notes",
      dataIndex: "note",
      key: "note",
      align: "center",
      render: (note: string, record: IAppointment, index: number) => (
        <TextArea
          value={note}
          onChange={(e) => handleNoteChange(index, e)}
          placeholder="Enter Note"
          autoSize={{ minRows: 4, maxRows: 10 }}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={props.filteredArray.map((appointment) => ({
        ...appointment,
        key: appointment.appointmentId,
      }))}
      pagination={false}
      rowKey="appointmentId"
      rowClassName={(record) =>
        record.status === "Completed" ? "completed-row" : ""
      }
      scroll={{ x: "max-content" }}
      className="responsive-table"
    />
  );
};
export default ManageAppointmentsTable;

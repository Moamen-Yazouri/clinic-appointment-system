import { IAppointment } from "../../types/types";
import dayjs from "dayjs";
import "./render-submitted-data.css";

interface IProps {
  patientData: IAppointment;
}

const RenderSubmittedData = (props: IProps) => {
  return (
    <div className="success-message">
      <h2>Appointment successfully created!</h2>
      <h3>Submitted Appointment Details:</h3>
      <p>
        <strong>Patient Name:</strong> {props.patientData.name}
      </p>
      <p>
        <strong>Contact:</strong> {props.patientData.contact}
      </p>
      <p>
        <strong>Age:</strong> {props.patientData.age}
      </p>
      <p>
        <strong>Gender:</strong> {props.patientData.gender}
      </p>
      <p>
        <strong>Appointment Date/Time:</strong>
        {props.patientData.dateTime
          ? dayjs(props.patientData.dateTime).format("MM/DD/YYYY, hh:mm A")
          : ""}
      </p>
      <p>
        <strong>Symptoms:</strong> {props.patientData.symptoms}
      </p>
    </div>
  );
};

export default RenderSubmittedData;

import dayjs from "dayjs";
import "../../Screens/CreateAppointment/CreateAppointment.css";
import { IAppointment } from "../../types/types";
interface IAppointmentShow {
    patientData: IAppointment;}
function showAppointment({patientData}:IAppointmentShow) {
    return (  
        <div className="success-message">
          <h2>Appointment successfully created!</h2>
          <h3>Submitted Appointment Details:</h3>
          <p>
            <strong>Patient Name:</strong> {patientData.name}
          </p>
          <p>
            <strong>Contact:</strong> {patientData.contact}
          </p>
          <p>
            <strong>Age:</strong> {patientData.age}
          </p>
          <p>
            <strong>Gender:</strong> {patientData.gender}
          </p>
          <p>
            <strong>Appointment Date/Time:</strong>
            {patientData.dateTime
              ? dayjs(patientData.dateTime).format("MM/DD/YYYY, hh:mm A")
              : ""}
          </p>
          <p>
            <strong>Symptoms:</strong> {patientData.symptoms}
          </p>
        </div>
    );
}

export default showAppointment;
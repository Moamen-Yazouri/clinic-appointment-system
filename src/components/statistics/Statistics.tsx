import { useEffect, useState } from "react";
import { Card, Statistic, Row, Col } from "antd";
import { IAppointment, Status } from "../../types/types";
import dayjs from "dayjs";
import "./Statistics.css";

interface IProps {
  appointments: IAppointment[];
}

const Statistics = (props: IProps) => {
  const todayDate = new Date().toISOString();
  const formattedDate = dayjs(todayDate).format("YYYY-MM-DD");

  const [todayAppointments, setTodayAppointments] = useState<IAppointment[]>(
    []
  );
  const [pendingAppointments, setPendingAppointments] = useState<
    IAppointment[]
  >([]);
  const [confirmedAppointments, setConfirmedAppointments] = useState<
    IAppointment[]
  >([]);

  useEffect(() => {
    if (props.appointments.length > 0) {
      const todayApps: IAppointment[] = props.appointments.filter(
        (app) => dayjs(app.dateTime).format("YYYY-MM-DD") === formattedDate
      );
      const pendingApps = props.appointments.filter(
        (appointment) =>
          appointment.status.toLowerCase() === Status.PENDING.toLowerCase()
      );
      const confirmedApps = props.appointments.filter(
        (appointment) =>
          appointment.status.toLowerCase() === Status.CONFIRMED.toLowerCase()
      );

      setTodayAppointments(todayApps);
      setPendingAppointments(pendingApps);
      setConfirmedAppointments(confirmedApps);
    }
  }, [props.appointments]);

  return (
    <Row  className="cards-wrapper">
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card className="first-card">
          <Statistic
            title="Today Appointments"
            value={todayAppointments.length}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card className="second-card">
          <Statistic
            title="Pending Appointments"
            value={pendingAppointments.length}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card className="third-card">
          <Statistic
            title="Confirmed Appointments"
            valueStyle={{ color: "white" }}
            value={confirmedAppointments.length}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Statistics;

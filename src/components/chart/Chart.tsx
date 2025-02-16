import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMediaQuery } from "react-responsive";
import { IAppointment } from "../../types/types";
import { useEffect, useState } from "react";
import groupedAppointments from "../../utils/groupedAppointments";
interface IProps {
  appointments: IAppointment[];
}
const Chart = (props: IProps) => {
  const [appointmentsPerDay, setAppointmentsPerDay] = useState<
    { date: string; count: number }[]
  >([]);
  useEffect(() => {
    const groupeAppointments: { date: string; count: number }[] =
      groupedAppointments(props.appointments);
    setAppointmentsPerDay(groupeAppointments);
  }, [props.appointments]);
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
      style={{ marginTop: "50px" }}
    >
      <BarChart
        data={appointmentsPerDay}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="6 6" />
        <XAxis
          dataKey="date"
          interval={0}
          tick={{ fontSize: isSmallScreen ? "10px" : "" }}
        />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;

import { useEffect, useState } from "react";
import { IAppointment, Status} from "../../types/types";
import dayjs from "dayjs";
interface IProps {
    appointments: IAppointment[];
}
const Dashboard = (props: IProps) => {
    const todayDate = new Date().toISOString();
    const formattedDate = dayjs(todayDate).format("YYYY-MM-DD");
    const [todayAppointments, setTodayAppointments] = useState<IAppointment[]>([]);
    const [pendingAppointments, setPendingAppointments] = useState<IAppointment[]>([]);
    const [confirmedAppointments, setConfirmedAppointments] = useState<IAppointment[]>([]);
    useEffect(() => {
        const todayAppointments: IAppointment[] = props.appointments.filter(
            (app) => dayjs(app.date).format("YYYY-MM-DD") === formattedDate
        );

        const pendingAppointments = todayAppointments.filter((app) => app.status.toString() === "Pending");
        const ConfirmedAppointments = todayAppointments.filter((app) => app.status.toString() === "Confirmed");

        setTodayAppointments(todayAppointments);
        setPendingAppointments(pendingAppointments);
        setConfirmedAppointments(ConfirmedAppointments);
    }, [props.appointments])
    return (
        <div className="dashboard">
            <div className="todayApp">
                Total Appointments Today: 
                {todayAppointments.length};
            </div>
            <div className="pending">
                Pending Appointments: 
                {pendingAppointments.length};
            </div>
            <div className="confirmed">
                Confirmed Appointments: 
                {confirmedAppointments.length};
            </div>
        </div>
    )
}
export default Dashboard;
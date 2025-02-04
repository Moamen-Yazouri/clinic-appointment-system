import { useEffect, useState } from "react";
import "./Dashboard.css";
import { IAppointment} from "../../types/types";
import dayjs from "dayjs";
import groupedAppointments from "../../utils/groupedAppointments";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
interface IProps {
    appointments: IAppointment[];
}
const Dashboard = (props: IProps) => {
    const todayDate = new Date().toISOString();
    const formattedDate = dayjs(todayDate).format("YYYY-MM-DD");
    const [todayAppointments, setTodayAppointments] = useState<IAppointment[]>([]);
    const [pendingAppointments, setPendingAppointments] = useState<IAppointment[]>([]);
    const [confirmedAppointments, setConfirmedAppointments] = useState<IAppointment[]>([]);
    const [appointmentsPerDay, setAppointmentsPerDay] = useState<{date: string, count: number}[]>([])
    useEffect(() => {
        const todayAppointments: IAppointment[] = props.appointments.filter(
            (app) => dayjs(app.dateTime).format("YYYY-MM-DD") === formattedDate
        );

        const pendingAppointments = todayAppointments.filter((app) => app.status.toString() === "Pending");
        const ConfirmedAppointments = todayAppointments.filter((app) => app.status.toString() === "Confirmed");
        const groupeAppointments: {date: string, count: number}[] = groupedAppointments(props.appointments);

        setAppointmentsPerDay(groupeAppointments);
        setTodayAppointments(todayAppointments);
        setPendingAppointments(pendingAppointments);
        setConfirmedAppointments(ConfirmedAppointments);
    }, [props.appointments])

    return (
        <div className="dashboard">
            <div className="statistics">
                <div className="card todayApp">
                    Total Appointments Today:
                    <span>
                        {todayAppointments.length}
                    </span> 
                </div>
                <div className="card pending">
                    Pending Appointments: 
                    <span>
                        {pendingAppointments.length}
                    </span> 
                </div>
                <div className="card confirmed">
                    Confirmed Appointments: 
                    <span>
                        {confirmedAppointments.length}
                    </span> 
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300} style={{marginTop:"80px"}}>
                <BarChart data={appointmentsPerDay} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="6 6" />
                    <XAxis dataKey="date" interval={0}/>
                    <YAxis allowDecimals={false}/>
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        
    )
}
export default Dashboard;
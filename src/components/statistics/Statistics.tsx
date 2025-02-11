import React, { useEffect, useState } from 'react';
import { IAppointment } from '../../types/types';
import dayjs from 'dayjs';
interface IProps {
    appointments: IAppointment[];
}

const Statistics = (props: IProps) => {
    const todayDate = new Date().toISOString();
    const formattedDate = dayjs(todayDate).format("YYYY-MM-DD");
        const [todayAppointments, setTodayAppointments] = useState<IAppointment[]>([]);
        const [pendingAppointments, setPendingAppointments] = useState<IAppointment[]>([]);
        const [confirmedAppointments, setConfirmedAppointments] = useState<IAppointment[]>([]);
        useEffect(() => {
            if(props.appointments.length > 0) {
                const todayApps: IAppointment[] = props.appointments.filter(
                    (app) => dayjs(app.dateTime).format("YYYY-MM-DD") === formattedDate
                );
                const pendingApps = todayApps.filter((app) => app.status.toString() === "Pending");
                const ConfirmedApps = todayAppointments.filter((app) => app.status.toString() === "Confirmed");
                setTodayAppointments(todayApps);
                setPendingAppointments(pendingApps);
                setConfirmedAppointments(ConfirmedApps);
            }
        }, [props.appointments])
    return (
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
    )
}

export default Statistics;
import dayjs from "dayjs";
import { IAppointment } from "../types/types";

const groupedAppointments = (appointments: IAppointment[]): {date: string, count:number}[] => {
    const groupedApps: {date: string, count:number}[] = [];
    appointments.forEach((app) => {
        const date = dayjs(app.dateTime).format("YYYY-MM-DD");
        const existingEntry = groupedApps.find((entry) => entry.date === date);
        if(existingEntry) {
            existingEntry.count += 1; 
        }
        else {
            groupedApps.push({date, count: 1});
        }
    })
    groupedApps.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
    return groupedApps;
}
export default groupedAppointments;
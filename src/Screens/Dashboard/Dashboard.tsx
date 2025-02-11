import "./Dashboard.css";
import { IAppointment} from "../../types/types";
import Statistics from "../../components/statistics/Statistics";
import Chart from "../../components/chart/Chart";
interface IProps {
    appointments: IAppointment[];
}
const Dashboard = (props: IProps) => {
    return (
        <div className="dashboard">
            <Statistics appointments={props.appointments}/>
            {
                props.appointments.length > 0 && <Chart appointments={props.appointments} />
            }
        </div>
        
    )
}
export default Dashboard;
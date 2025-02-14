import "./Dashboard.css";
import { IAppointment} from "../../types/types";
import Statistics from "../../components/statistics/Statistics";
import Chart from "../../components/chart/Chart";
import { Typography } from "antd";
interface IProps {
    appointments: IAppointment[];
}
const { Title } = Typography;
const Dashboard = (props: IProps) => {
    return (
        <div className="dashboard">
            <Title className="main-header" level={1} style={{ color: "#646cff" }}>
                Dashboard
            </Title>
            <Statistics appointments={props.appointments}/>
            {
                props.appointments.length > 0 && <Chart appointments={props.appointments} />
            }
        </div>
        
    )
}
export default Dashboard;
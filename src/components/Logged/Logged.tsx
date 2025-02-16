import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthContext';
import './Logged.css';
const Logged = () => {
    const {user, logout} = useContext(AuthContext)
    return (
        <div className='logged-wrapper'>
        <h3>Hi {
        user!.role.toString() === "DOCTOR" 
        ? `Dr.${user!.userName} 🩺` 
        : `Mr.${user!.userName} we hope you will get well soon`
        }
        </h3>
        <span>You are logged, Do you want to <button onClick={logout} className='logout'>Logout</button></span>
    </div>
    )
}
export default Logged;

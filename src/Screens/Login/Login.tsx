import { ILoginData } from "../../types/types"
import "./Login.css"
const Login = () => {
    const users: ILoginData = JSON.parse(localStorage.getItem('login-data') || '[]');
    console.log(users);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //To Be Cont.
    }
    return (
        <form onSubmit = {handleSubmit}>
            <div className="username">
                <label htmlFor="username">Username: </label>
                <input type="text" placeholder='Username' id='username'/>
            </div>
            <div className="password">
                <label htmlFor="password">Password:</label>
                <input type="password" placeholder='Password'/>
            </div>
            <input type="submit" value="Login" />
        </form>
    )
}

export default Login
import { useContext, useState } from "react";
import { ILoginData, Role } from "../../types/types"
import "./Login.css"
import { AuthContext } from "../../Providers/AuthContext";
import validation from "../../utils/validation";
const Login = () => {
    // This Data will help you for testing.
    // localStorage.setItem("login-data", JSON.stringify([
    //     {"userName":"Moamen","password":"m123","role":"DOCTOR"},
    //     {"userName":"Mohammed","password":"mk123","role":"DOCTOR"},
    //     {"userName":"Qousy","password":"q123","role":"PATIENT"},
    //     {"userName":"Mohammed","password":"ms123","role":"PATIENT"}
    // ]));
    const users: ILoginData[] = JSON.parse(localStorage.getItem('login-data') || '[]');
    const {user, login, logout} = useContext(AuthContext);
    const [errors, setErrors] = useState<string[]>([])
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userName = e.currentTarget["username"].value;
        const password = e.currentTarget["password"].value;
        const existingErrors = validation({userName, password}, users);
        setErrors([]);
        if(existingErrors.length == 0) {
            const role = users.find(user => user.userName === userName ? user : null)!.role;
            login({userName, password, role});
        }
        else {
            setErrors(existingErrors);
        }
    }
    if(!user) {

        return (
            <>
                <form onSubmit = {handleSubmit}>
                    <div className="username">
                        <label htmlFor="username">Username: </label>
                        <input type="text" placeholder='Username' id='username'/>
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password:</label>
                        <input type="password" placeholder='Password' id="password"/>
                    </div>
                    <input type="submit" value="Login" />
                    <div className="errors">
                        <h4>You have the following errors!:</h4>
                        {
                            errors.map((error, index) => <p key={index + error}>{error}</p>)
                        }
                    </div>
                </form>
            </>
        )
    }
    else {
        return (
            <div className="logged">
                <h2>{user.role.toString() === "DOCTOR" ?`Hi Dr.${user.userName}` : `Hi Mr.${user.userName}, Get Well Soon`}</h2>
                <span>You Are Logged, Do you want to <button onClick={logout}>Logout</button></span>
            </div>
        )
    }
}

export default Login;
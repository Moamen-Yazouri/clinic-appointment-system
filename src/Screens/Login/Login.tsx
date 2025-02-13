import { useContext, useState } from "react";
import { ILoginData } from "../../types/types";
import "./Login.css";
import { AuthContext } from "../../Providers/AuthContext";
import validation from "../../utils/validation";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const users: ILoginData[] = JSON.parse(
    localStorage.getItem("login-data") || "[]"
  );
  const { login } = useContext(AuthContext);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userName = e.currentTarget["username"].value;
    const password = e.currentTarget["password"].value;
    const existingErrors = validation({ userName, password }, users);
    setErrors([]);
    if (existingErrors.length == 0) {
      const role = users.find((user) =>
        user.userName === userName ? user && user.password === password : null
      )!.role;
      login({ userName, password, role });
      if (role.toString().toLowerCase() === "doctor") {
        navigate("/manage");
      } else {
        navigate("/create");
      }
    } else {
      setErrors(existingErrors);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="username">
          <label htmlFor="username">Username: </label>
          <input type="text" placeholder="Username" id="username" />
        </div>
        <div className="password">
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="Password" id="password" />
        </div>
        <input type="submit" value="Login" />
        {errors.length >= 1 && (
          <div className="errors">
            <h4>You have the following errors!:</h4>
            {errors.map((error, index) => (
              <p key={index + error}>{error}</p>
            ))}
          </div>
        )}
      </form>
    </>
  );
};

export default Login;

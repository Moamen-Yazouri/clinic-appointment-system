import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthContext";
import { LogoutOutlined } from "@ant-design/icons";
import "./header.css";
import { Role } from "../../types/types";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="header">
      <h3>
        Hi <span style={{ color: "red" }}>{user?.userName}</span>
      </h3>
      {user?.role.toString().toLowerCase() ===
      Role.DOCTOR.toString().toLowerCase() ? (
        <nav className="navbar">
          <Link
            to="/manage"
            className={location.pathname === "/manage" ? "active" : ""}
          >
            Manage Appointments
          </Link>
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>
        </nav>
      ) : (
        <nav className="navbar">
          <Link
            to="/create"
            className={location.pathname === "/create" ? "active" : ""}
          >
            Create Appointment
          </Link>
        </nav>
      )}
      <Link to="/" onClick={logout}>
        Logout {<LogoutOutlined />}
      </Link>
    </div>
  );
};

export default Header;

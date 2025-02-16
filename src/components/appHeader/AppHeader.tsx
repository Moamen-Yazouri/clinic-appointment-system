import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthContext";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Role } from "../../types/types";
import { Layout, Menu } from "antd";
import "./app-header.css";

const { Header } = Layout;

const AppHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isDoctor =
    user?.role.toString().toLowerCase() ===
    Role.DOCTOR.toString().toLowerCase();

  const menuItems = isDoctor
    ? [
        { key: "/manage", label: "Manage Appointments", path: "/manage" },
        { key: "/dashboard", label: "Dashboard", path: "/dashboard" },
      ]
    : [{ key: "/create", label: "Create Appointment", path: "/create" }];

  return (
    <Header className="navbar">
      <h3 className="navbar-title">
        Hi <span className="navbar-user">{user?.userName}</span>
      </h3>

      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        className="nav-menu"
        overflowedIndicator={
          <MenuOutlined style={{ color: "white", fontSize: "20px" }} />
        }
        items={menuItems.map(({ key, label, path }) => ({
          key,
          label: <Link to={path}>{label}</Link>,
        }))}
      />
      <Link to="/" onClick={logout} style={{ color: "white" }}>
        Logout <LogoutOutlined />
      </Link>
    </Header>
  );
};

export default AppHeader;

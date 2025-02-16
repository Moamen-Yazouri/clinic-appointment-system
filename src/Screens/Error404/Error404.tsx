import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div style={{ margin: "0 auto" }}>
      <h1 style={{ color: "red" }}>Error 404!</h1>
      <p style={{ color: "black" }}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/">Go Back to Login page</Link>
    </div>
  );
};

export default Error404;

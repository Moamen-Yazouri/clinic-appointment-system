import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <>
      <h1 style={{ color: "red" }}>Error 404!</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/">Go Back to Login page</Link>
    </>
  );
};

export default Error404;

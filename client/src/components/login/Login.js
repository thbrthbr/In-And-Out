import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div>
      <div>Login</div>
      <Link to="/signin">Signin</Link>
      <br />
      <Link to="/identify_email">RecoverPassword</Link>
      <br />
      <Link to="/calendar">Login</Link>
    </div>
  );
}

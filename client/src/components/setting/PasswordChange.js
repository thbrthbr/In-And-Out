import { Link } from "react-router-dom";

export default function PasswordChange() {
  return (
    <div>
      <div>PasswordChange</div>
      <Link to="/profile_change">ProfileChange</Link>
      <br />
      <Link to="/signout">Signout</Link>
      <br />
      <Link to="/calendar">Home</Link>
    </div>
  );
}

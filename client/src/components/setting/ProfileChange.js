import { Link } from "react-router-dom";

export default function ProfileChange() {
  return (
    <div>
      <div>ProfileChange</div>
      <Link to="/password_change">PasswordChange</Link>
      <br />
      <Link to="/signout">Signout</Link>
      <br />
      <Link to="/calendar">Home</Link>
    </div>
  );
}

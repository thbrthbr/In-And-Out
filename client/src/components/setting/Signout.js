import { Link } from "react-router-dom";

export default function Signout() {
  return (
    <>
      <div>Signout</div>
      <Link to="/password_change">PasswordChange</Link>
      <br />
      <Link to="/profile_change">ProfileChange</Link>
      <br />
      <Link to="/calendar">Calendar</Link>
    </>
  );
}

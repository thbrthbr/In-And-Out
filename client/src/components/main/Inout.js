import { Link } from "react-router-dom";

export default function Inout() {
  return (
    <div>
      <div>Inout</div>
      <Link to="/profile_change">Setting</Link>
      <br />
      <Link to="/calendar">Calendar</Link>
      <br />
      <Link to="/report">Report</Link>
      <br />
      <Link to="/">Logout</Link>
    </div>
  );
}

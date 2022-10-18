import { Link } from "react-router-dom";

export default function Calendar() {
  return (
    <div>
      <div>Calendar</div>
      <Link to="/profile_change">Setting</Link>
      <br />
      <Link to="/inout">Inout</Link>
      <br />
      <Link to="/report">Report</Link>
      <br />
      <Link to="/">Logout</Link>
    </div>
  );
}

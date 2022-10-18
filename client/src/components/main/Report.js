import { Link } from "react-router-dom";

export default function Report() {
  return (
    <>
      <div>Report</div>
      <Link to="/profile_change">Setting</Link>
      <br />
      <Link to="/calendar">Calendar</Link>
      <br />
      <Link to="/inout">Inout</Link>
    </>
  );
}

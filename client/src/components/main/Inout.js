import { Link } from "react-router-dom";

export default function Inout() {
  return (
    <>
      <div>Inout</div>
      <Link to="/setting">ProfileChange</Link>
      <br />
      <Link to="/main">Calendar</Link>
      <br />
      <Link to="/main/report">Report</Link>
    </>
  );
}

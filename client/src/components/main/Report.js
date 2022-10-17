import { Link } from "react-router-dom";

export default function Report() {
  return (
    <>
      <div>Report</div>
      <Link to="/setting">ProfileChange</Link>
      <br />
      <Link to="/main">Calendar</Link>
      <br />
      <Link to="/main/inout">Inout</Link>
    </>
  );
}

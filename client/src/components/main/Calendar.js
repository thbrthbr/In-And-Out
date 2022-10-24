import { Link } from "react-router-dom";
import { FullCalendar } from "./FullCalendar";
import "./_styles.scss";
import styled from "styled-components";
const Box = styled.div`
  flex: 0.75;
  display: flex;
  flex-direction: column;
`;

export default function Calendar() {
  return (
    <Box>
      <div>Calendar</div>
      <Link to="/profile_change">Setting</Link>
      <br />
      <Link to="/inout">Inout</Link>
      <br />
      <Link to="/report">Report</Link>
      <br />
      <Link to="/">Logout</Link>

      <FullCalendar />
    </Box>
  );
}

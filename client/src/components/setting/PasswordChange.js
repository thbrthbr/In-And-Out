import { Link } from "react-router-dom";

export default function PasswordChange() {
  return (
    <>
      <div>PasswordChange</div>
      <Link to="/setting">ProfileChange</Link>
      <br />
      <Link to="/setting/signout">Signout</Link>
      <br />
      <Link to="/calendar">Home</Link>
    </>
  );
}

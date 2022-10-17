import { Link } from "react-router-dom";

export default function Signout() {
  return (
    <>
      <div>Signout</div>
      <Link to="/setting/password_change">PasswordChange</Link>
      <br />
      <Link to="/setting">ProfileChange</Link>
      <br />
      <Link to="/main">Home</Link>
    </>
  );
}

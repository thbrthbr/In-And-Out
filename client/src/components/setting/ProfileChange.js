import { Link } from "react-router-dom";

export default function ProfileChange() {
  return (
    <>
      <div>ProfileChange</div>
      <Link to="/setting/password_change">PasswordChange</Link>
      <br />
      <Link to="/setting/signout">Signout</Link>
      <br />
      <Link to="/main">Home</Link>
    </>
  );
}

import { Outlet, Link } from "react-router-dom";

export default function LoginSharedLayout() {
  return (
    <>
      <div>LoginSharedLayout(헤더)</div>

      {/* <Link to="/login">Login</Link> */}
      <Outlet />
    </>
  );
}

import { Outlet } from "react-router-dom";

export default function LoginSharedLayout() {
  return (
    <>
      <div>LoginSharedLayout(헤더)</div>
      <Outlet />
    </>
  );
}

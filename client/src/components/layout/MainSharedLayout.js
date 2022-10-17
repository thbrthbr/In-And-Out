import { Outlet } from "react-router-dom";

export default function MainSharedLayout() {
  return (
    <>
      <div>MainSharedLayout(헤더)</div>
      <div>MainSharedLayout(사이드바)</div>
      <Outlet />
    </>
  );
}

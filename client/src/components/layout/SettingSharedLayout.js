import { Outlet } from "react-router-dom";

export default function SettingSharedLayout() {
  return (
    <>
      <div>SettingSharedLayout(헤더)</div>
      <div>SettingSharedLayout(사이드바)</div>
      <Outlet />
    </>
  );
}

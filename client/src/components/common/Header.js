import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useStore from "../../store/store.js";
import defaultUser from "../../img/default-user.jpg";

import { useDispatch, useSelector } from "react-redux";
import { login, logout, userLogin } from "../../features/login";

export default function Header() {
  const { profileImage } = useStore();
  const navigate = useNavigate();

  const loginState = useSelector((state) => state.login.loggedIn);
  const dispatch = useDispatch();
  const handleLogin = () => dispatch(userLogin());
  const handleLogout = () => dispatch(logout());

  return (
    <HeaderLayout
      style={{
        background: "lightgray",
        height: "100px",
        paddingLeft: 16,
      }}
    >
      <img
        alt="로고"
        onClick={() => navigate("/")}
        style={{ width: "200px", cursor: "pointer" }}
        src={logo}
      />
      {loginState && (
        <ProfImg>
          <img
            alt="프로필사진"
            onClick={() => navigate("/profile_change")}
            src={profileImage ? profileImage : defaultUser}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </ProfImg>
      )}
      <p>{loginState ? "로그인됨" : "로그아웃됨"}</p>
      <button onClick={handleLogin}>login</button>
      <button onClick={handleLogout}>logout</button>
      {/* <Temp>
        <div>로그아웃</div>
        <div>설정</div>
      </Temp> */}
    </HeaderLayout>
  );
}

// const Temp = styled.div`
//   width: 48px;
//   text-align: center;
//   height: 20px;
//   font-size: 10px;
//   right: 10%;
//   top: 0%;
//   position: absolute;
// `;

const ProfImg = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: absolute;
  right: 5%;
  cursor: pointer;
`;

const HeaderLayout = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

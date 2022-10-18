import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header style={{ background: "lightgray", padding: 16, fontSize: 24 }}>
      <img
        onClick={() => navigate("/")}
        style={{ width: "200px", cursor: "pointer" }}
        src={logo}
      />
    </header>
  );
}

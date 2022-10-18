import { Link } from "react-router-dom";
export default function RecoverInitiate() {
  return (
    <div>
      <div>RecoverInitiate</div>
      <form>
        <div>
          <input type="password" id="newpassword" placeholder="새 비밀번호" />
        </div>
        <div>
          <input
            type="password"
            id="newpassword_check"
            placeholder="새 비밀번호 확인"
          />
        </div>
        <div clasName="button">
          <button type="submit">변경</button>
        </div>
      </form>
      <Link to="/calendar">Login</Link>
    </div>
  );
}

import { Link } from "react-router-dom";
export default function IdentifyPhone() {
  return (
    <div>
      <div>IdentifyPhone</div>
      <p>비밀번호는 이메일과 전화번호를 통해 찾을 수 있습니다</p>
      <form>
        <div>
          <input type="email" id="email" value="입력한 이메일" disabled />
        </div>
        <div>
          <input type="tel" id="phonenumber" placeholder="전화번호" />
        </div>
        <div class="button">
          <button type="submit">다음</button>
        </div>
      </form>
      <Link to="/initiate">RecoverInitiate</Link>
    </div>
  );
}

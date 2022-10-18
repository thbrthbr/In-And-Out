import { Link } from "react-router-dom";
export default function IdentifyEmail() {
  return (
    <div>
      <div>IdentifyEmail</div>
      <p>비밀번호는 이메일과 전화번호를 통해 찾을 수 있습니다</p>
      <form>
        <div>
          <input type="email" id="email" placeholder="아이디(이메일)" />
        </div>
        <div class="button">
          <button type="submit">다음</button>
        </div>
      </form>
      <Link to="/identify_phone">IdentifyPhone</Link>
    </div>
  );
}

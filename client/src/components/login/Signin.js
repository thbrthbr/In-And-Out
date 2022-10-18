import { Link } from "react-router-dom";
export default function Signin() {
  return (
    <div>
      <div>Signin Page</div>
      <form>
        <div>
          <input type="text" id="id" placeholder="아이디" />
        </div>
        <div>
          <input type="text" id="pw" placeholder="비밀번호" />
        </div>
        <div>
          <input type="text" id="pw_check" placeholder="비밀번호(확인)" />
        </div>
        <div>
          <input type="text" id="nickname" placeholder="닉네임" />
        </div>
        <div>
          <input type="text" id="phonenumber" placeholder="전화번호" />
        </div>
        <div>
          <input type="text" id="birthday" placeholder="생년월일" />
        </div>
        <div>
          <input type="text" id="residence" placeholder="거주지 (시/군/구)" />
        </div>
        <div>
          <input type="text" id="gender" placeholder="성별" />
        </div>

        <div class="button">
          <button type="submit">가입하기</button>
        </div>
      </form>
      <Link to="/">Login</Link>
    </div>
  );
}

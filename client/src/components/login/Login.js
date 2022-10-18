import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div>
      <div>Login Page</div>
      <form>
        <div>
          <label for="id">Id</label>
          <input type="text" id="id" />
        </div>
        <div>
          <label for="pw">Pw</label>
          <input type="password" id="pw" />
        </div>
        <div class="button">
          <button type="submit">로그인</button>
        </div>
      </form>
      <Link to="/calendar">Login</Link>
      <br />
      <Link to="/signin">Signin</Link>
      <br />
      <Link to="/identify_email">RecoverPassword</Link>
      <br />
    </div>
  );
}

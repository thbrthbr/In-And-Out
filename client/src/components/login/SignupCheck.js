import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function SignupCheck() {
  useEffect(() => {
    sendToServer();
  }, []);

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const uuid = query.get("id");

  const navigate = useNavigate();
  const sendToServer = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/signup/sending?id=${uuid}`,
        { withCredentials: true }
      );

      toast.success("회원가입 인증이 성공적으로 처리됐습니다!", {
        position: toast.POSITION.TOP_CENTER,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.warn("회원가입 인증이 실패했습니다!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <ToastContainer pauseOnHover={false} />
    </>
  );
}

import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import {
  useStore2,
  useSnsLogStateStore,
  loginStore,
} from "../../store/store.js";

export default function SocialLoginCheck() {
  useEffect(() => {
    sendToServer();
  }, []);

  const { setLogState } = useStore2();
  const { snsLogState, setSnsLogState } = useSnsLogStateStore();
  const { id, setId } = loginStore();

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const uuid = query.get("id");

  const navigate = useNavigate();
  const sendToServer = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/social_check/sending?id=${uuid}`,
        { withCredentials: true }
      );

      toast.success("성공적으로 로그인 되었습니다!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setId(uuid);

      setTimeout(() => {
        setLogState(true);
        setSnsLogState(true);
        navigate("/calendar");
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.warn("로그인이 실패했습니다!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        // setLogState(true);
        navigate("/");
      }, 3000);
    }
  };

  return (
    <>
      <ToastContainer pauseOnHover={false} />
    </>
  );
}

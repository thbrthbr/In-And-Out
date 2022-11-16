import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FullCalendar } from "./FullCalendar";
import "./_styles.scss";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import DiaryModal from "./WriteModal";
import Diary from "./Diary";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { calenderStore } from "../../store/store.js";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Triangle } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import useMouse from "@react-hook/mouse-position";

const Container = styled.div`
  flex: 1.75;
  display: flex;
  justify-content: center;
`;

let month = new Date();

const useMouseMovement = () => {
  const [mousePosition, setMousePosition] = useState({
    x: null,
    y: null,
  });
  useEffect(() => {
    function handle(e) {
      setMousePosition({
        x: e.pageX,
        y: e.pageY,
      });
    }
    document.addEventListener("mousemove", handle);
    return () => document.removeEventListener("mousemove", handle);
  });

  return mousePosition;
};

export default function Calendar() {
  const { x, y } = useMouseMovement();

  const {
    showDiary,
    setShowDiary,
    setShowInstanceTable,
    setcurrentMonth,
    setPosition,
  } = calenderStore();

  const queryClient = useQueryClient();

  function formatter(e) {
    let a = e;
    let string = a[5] + a[6] + "/" + a[8] + a[9] + "/" + a[2] + a[3];
    return string;
  }

  let stdt = format(startOfMonth(month), "yyyy-MM-dd");

  let eddt = format(endOfMonth(month), "yyyy-MM-dd");

  const changeValue = (a, b) => {
    stdt = a;
    eddt = b;
    refetch();
  };

  const changeValue2 = (a, b, date) => {
    stdt = a;
    eddt = b;
    setcurrentMonth(date);
    refetch();
  };

  const getData = async () => {
    try {
      let dateArr = [];
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/calendar?endDt=${eddt}&startDt=${stdt}`,
        {
          withCredentials: true,
        }
      );
      const res2 = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/diary?endDt=${eddt}&startDt=${stdt}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      res2.data.map((data) => {
        dateArr.push(formatter(data.diaryDt));
      });
      return [res.data, res2.data, dateArr];
    } catch (err) {
      console.log(err);
    }
  };

  const saveDataMutation = useMutation(
    async (data) => {
      try {
        const res = await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}/api/diary`,
          data: data,
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
        // toast.success("일기가 등록 되었습니다!", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        queryClient.invalidateQueries("getCalendarData");
      },
    }
  );

  const saveEditDataMutation = useMutation(
    async (data) => {
      try {
        const res = await axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}/api/diary`,
          data: data,
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
        // toast.success("일기가 수정 되었습니다!", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        queryClient.invalidateQueries("getCalendarData");
      },
    }
  );

  const deleteDataMutation = useMutation(
    async (data) => {
      try {
        const res = await axios({
          method: "delete",
          url: `${process.env.REACT_APP_API_URL}/api/diary`,
          data: data,
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
        // toast.success("일기가 삭제 되었습니다!", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        queryClient.invalidateQueries("getCalendarData");
      },
    }
  );

  useEffect(() => {
    setcurrentMonth(new Date());
    // setPosition(mouse.y);
    refetch();
  }, []);

  const { data, isLoading, isFetching, refetch } = useQuery(
    ["getCalendarData"],
    getData,
    {
      staleTime: Infinity,
    }
  );

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: "transparent",
        }}
      >
        <PacmanLoader color="#36d7b7" />
      </div>
    );
  // if (isFetching) return <PacmanLoader color="#36d7b7" />;
  if (isFetching)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          color: "rgba(109, 73,129, 1)",
          backgroundColor: "transparent",
        }}
      >
        <Triangle
          height="200"
          width="200"
          color="rgba(109, 73,129, 1)"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
        {/* <div> 처리중입니다 </div> */}
      </div>
    );

  return (
    <Container
      onClick={() => {
        setShowInstanceTable(false);
      }}
    >
      {/* <ToastContainer /> */}
      <FullCalendar
        Y={y}
        refetch={refetch}
        dateList={data[2]}
        changeValue={changeValue}
        diaryDatas={data[1]}
        calendarData={data[0]}
      />
      {showDiary && (
        <DiaryModal closeModal={() => setShowDiary(!showDiary)}>
          <Diary
            dateList={data[2]}
            changeValue2={changeValue2}
            diaryDatas={data[1]}
            calendarData={data[0]}
            saveDataMutation={saveDataMutation}
            saveEditDataMutation={saveEditDataMutation}
            deleteDataMutation={deleteDataMutation}
            closeModal={() => setShowDiary(!showDiary)}
          ></Diary>
        </DiaryModal>
      )}
    </Container>
  );
}

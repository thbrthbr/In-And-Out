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

  // const mouseMoveArea = useRef();
  // const mouse = useMouse(mouseMoveArea, {
  //   enterDelay: 100,
  //   leaveDelay: 100,
  // });

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
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
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
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
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
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getCalendarData");
      },
    }
  );

  useEffect(() => {
    setcurrentMonth(new Date());
    // setPosition(mouse.y);
    refetch();
  }, []);

  const { data, isLoading, refetch } = useQuery(["getCalendarData"], getData, {
    staleTime: Infinity,
  });

  if (isLoading) return <PacmanLoader color="#36d7b7" />;
  // console.log("data", data);

  return (
    <Container
      onClick={() => {
        setShowInstanceTable(false);
      }}
    >
      <FullCalendar
        Y={y}
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

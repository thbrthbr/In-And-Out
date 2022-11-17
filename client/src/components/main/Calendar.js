import React, { useEffect, useState } from "react";
import { FullCalendar } from "./FullCalendar";
import "./_styles.scss";
import styled from "styled-components";
import DiaryModal from "./WriteModal";
import Diary from "./Diary";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { calenderStore } from "../../store/store.js";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Triangle } from "react-loader-spinner";

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
    formatter,
  } = calenderStore();

  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries("getCalendarData");
      },
    }
  );

  useEffect(() => {
    setcurrentMonth(new Date());
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
      </div>
    );

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

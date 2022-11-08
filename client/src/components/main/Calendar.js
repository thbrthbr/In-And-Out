import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FullCalendar } from "./FullCalendar";
import "./_styles.scss";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import DiaryModal from "./WriteModal";
import Diary from "./Diary";
import {
  addMonths,
  subMonths,
  addYears,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  format,
} from "date-fns";

import { calenderStore } from "../../store/store.js";

import axios from "axios";

import { useQuery, useMutation, useQueryClient } from "react-query";
import PacmanLoader from "react-spinners/PacmanLoader";

const DIARY_API_URL = "http://localhost:5000/calendar";
// api 연결 작업하면서 요청 api를 2개(다이어리데이터 + 수입지출쪽 데이터)로 수정

const Container = styled.div`
  flex: 1.75;
  display: flex;

  justify-content: center;
`;

let month = new Date();

export default function Calendar() {
  // const prevMonth = () => {
  //   currentMonth = subMonths(currentMonth, 1);
  //   setParamAndRefetch();
  // };
  // const nextMonth = () => {
  //   currentMonth = addMonths(currentMonth, 1);
  //   setParamAndRefetch();
  // };

  // const formatDate = (date) => {
  //   return `${date.getFullYear()}-${(date.getMonth() + 1)
  //     .toString()
  //     .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  // };

  // const setParam = () => {
  //   switch (tabValue) {
  //     case TabSelected.MONTH:
  //       params.startDt = formatDate(startOfMonth(currentMonth));
  //       params.endDt = formatDate(endOfMonth(currentMonth));
  //       break;
  //     case TabSelected.YEAR:
  //       params.startDt = formatDate(startOfYear(currentYear));
  //       params.endDt = formatDate(endOfYear(currentYear));
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const getCalendarDataFrom = async (url, params) => {
  //   try {
  //     const res = await axios(url, { params: params });
  //     console.log(res);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const setParamAndRefetch = () => {
  //   setParam();
  //   refetch();
  // };

  const {
    showWrittenDiary,
    setShowWrittenDiary,
    showNewDiary,
    setShowNewDiary,
    diaryDate,
    setDiaryDate,
    detailDate,
    setDetailDate,
    setShowInstanceTable,
    tabMonth,
    setTabMonth,
    currentMonth,
    st,
    ed,
    startDay,
    endDay,
  } = calenderStore();

  const queryClient = useQueryClient();

  // console.log(currentMonth);

  // console.log(st(currentMonth));
  // console.log(ed(currentMonth));

  // let tempMonth = new Date();
  // let go = st(tempMonth);
  // let stop = ed(tempMonth);

  let stdt = format(startOfMonth(month), "yyyy-MM-dd");

  let eddt = format(endOfMonth(month), "yyyy-MM-dd");

  console.log(stdt);

  const changeValue = (a, b) => {
    stdt = a;
    eddt = b;
    refetch();
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/calendar?endDt=${eddt}&startDt=${stdt}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res.data);
      // console.log(res.data.calendarExpenseDtoList[0].expenseDt);
      return res.data;
    } catch (err) {
      console.log(err);
      console.log(stdt);
      console.log(eddt);
    }
  };

  const saveDataMutation = useMutation(
    async (data) => {
      try {
        const editted = await getData();
        // console.log(editted);
        for (let i = 0; i < editted.length; i++) {
          if (editted[i].date === data.date) {
            alert("해당 날짜에는 이미 다이어리가 등록되어 있습니다.");
            return;
          }
        }
        const res = await axios.post(DIARY_API_URL, data, {
          headers: { "Content-Type": "application/json" },
        });
        return res.data;
      } catch (err) {
        // console.log(err);
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
        const res = await axios.put(`${DIARY_API_URL}/${data[1]}`, data[0], {
          headers: { "Content-Type": "application/json" },
        });
        return res.data;
      } catch (err) {
        // console.log(err);
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
        const res = await axios.delete(`${DIARY_API_URL}/${data[1]}`, data[0], {
          headers: { "Content-Type": "application/json" },
        });
        return res.data;
      } catch (err) {
        // console.log(err);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getCalendarData");
      },
    }
  );

  //tabMonth 추가하기
  const { data, isLoading, refetch } = useQuery(
    ["getCalendarData", tabMonth],
    getData,
    {
      staleTime: Infinity,
    }
  );

  if (isLoading) return <PacmanLoader color="#36d7b7" />;
  // console.log("data", data);

  return (
    <Container
      onClick={() => {
        setShowInstanceTable(false);
      }}
    >
      <FullCalendar changeValue={changeValue} calendarData={data} />
      {/* <Icon
        icon="heroicons:pencil-square"
        style={{
          position: "fixed",
          width: "3rem",
          height: "3rem",
          cursor: "pointer",
          bottom: "70px",
          right: "200px",
          backgroundColor: "lightgray",
          borderRadius: "50%",
        }}
        onClick={() => setShowNewDiary(!showNewDiary)}
      ></Icon> */}

      {showNewDiary && (
        <DiaryModal closeModal={() => setShowNewDiary(!showNewDiary)}>
          <Diary
            calendarData={data}
            saveDataMutation={saveDataMutation}
            closeModal={() => setShowNewDiary(!showNewDiary)}
          ></Diary>
        </DiaryModal>
      )}
      {showWrittenDiary && (
        <DiaryModal closeModal={() => setShowWrittenDiary(!showWrittenDiary)}>
          <Diary
            calendarData={data}
            saveDataMutation={saveDataMutation}
            saveEditDataMutation={saveEditDataMutation}
            deleteDataMutation={deleteDataMutation}
            closeModal={() => setShowWrittenDiary(!showWrittenDiary)}
          ></Diary>
        </DiaryModal>
      )}
    </Container>
  );
}

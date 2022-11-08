import React, { useState } from "react";
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

const DIARY_API_URL = "http://localhost:5000/calendar";
// api 연결 작업하면서 요청 api를 2개(다이어리데이터 + 수입지출쪽 데이터)로 수정

const Container = styled.div`
  flex: 1.75;
  display: flex;
  justify-content: center;
`;

let month = new Date();

export default function Calendar() {
  const {
    showDiary,
    setShowDiary,
    showWrittenDiary,
    setShowWrittenDiary,
    showNewDiary,
    setShowNewDiary,
    setShowInstanceTable,
    tabMonth,
    setcurrentMonth,
    setDiaryDate,
    setSpecificDate,
    dateList,
    setDateList,
  } = calenderStore();

  const queryClient = useQueryClient();

  function formatter(e) {
    let a = e;
    let string = a[5] + a[6] + "/" + a[8] + a[9] + "/" + a[2] + a[3];
    return string;
  }

  let stdt = format(startOfMonth(month), "yyyy-MM-dd");

  let eddt = format(endOfMonth(month), "yyyy-MM-dd");

  console.log(stdt);

  const changeValue = (a, b) => {
    stdt = a;
    eddt = b;
    refetch();
  };

  const changeValue2 = (a, b, date) => {
    stdt = a;
    eddt = b;
    setcurrentMonth(date);

    // setSpecificDate(date.format("MM/dd/yy"));
    // setDiaryDate(date.format("MM/dd/yy"));
    // let checker = 0;
    // data[1].map((data) => {
    //   if (date.format("MM/dd/yy") === formatter(data.diaryDt)) {
    //     checker++;
    //     console.log(checker);
    //   }
    // });
    // if (checker == 0) {
    //   setShowWrittenDiary(false);
    //   setShowNewDiary(true);
    // } else {
    //   setShowWrittenDiary(true);
    //   setShowNewDiary(false);
    // }
    refetch();
  };

  const getData = async () => {
    try {
      let dateArr = [];
      const res = await axios.get(
        `/api/calendar?endDt=${eddt}&startDt=${stdt}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const res2 = await axios.get(`/api/diary?endDt=${eddt}&startDt=${stdt}`, {
        headers: { "Content-Type": "application/json" },
      });
      res2.data.map((data) => {
        dateArr.push(formatter(data.diaryDt));
      });

      //여기에 이런식으로 한 번에 api 두 개 요청
      console.log(res.data);
      console.log(res2.data);
      console.log(dateArr);
      // console.log(res.data.calendarExpenseDtoList[0].expenseDt);
      return [res.data, res2.data, dateArr];
    } catch (err) {
      console.log(err);
    }
  };

  const saveDataMutation = useMutation(
    async (data) => {
      try {
        // const editted = await getData();
        // console.log(editted);
        // for (let i = 0; i < editted.length; i++) {
        //   if (editted[i].date === data.date) {
        //     alert("해당 날짜에는 이미 다이어리가 등록되어 있습니다.");
        //     return;
        //   }
        // }
        console.log(data);
        console.log(data.get("input"));
        const res = await axios({
          method: "post",
          url: "/api/diary",
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
          //이거 patch로 해야할거같음
          method: "put",
          url: "/api/diary",
          data: data,
          headers: { "Content-Type": "multipart/form-data" },
        });

        // const res = await axios.put(`${DIARY_API_URL}/${data[1]}`, data[0], {
        //   headers: { "Content-Type": "application/json" },
        // });
        refetch();
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

  // const deleteDataMutation = useMutation(
  //   async (data) => {
  //     try {
  //       const res = await axios.delete(`${DIARY_API_URL}/${data[1]}`, data[0], {
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       return res.data;
  //     } catch (err) {
  //       // console.log(err);
  //     }
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("getCalendarData");
  //     },
  //   }
  // );

  const deleteDataMutation = useMutation(
    async (data) => {
      try {
        console.log(data);
        const res = await axios.delete("/api/diary", {
          data: data,
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
  const { data, isLoading, refetch } = useQuery(["getCalendarData"], getData, {
    staleTime: Infinity,
  });

  if (isLoading) return <PacmanLoader color="#36d7b7" />;
  console.log("data", data);

  return (
    <Container
      onClick={() => {
        setShowInstanceTable(false);
      }}
    >
      <FullCalendar
        dateList={data[2]}
        changeValue={changeValue}
        diaryDatas={data[1]}
        calendarData={data[0]}
      />
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

      {/* {showNewDiary && (
        <DiaryModal closeModal={() => setShowNewDiary(!showNewDiary)}>
          <Diary
            dateList={data[2]}
            changeValue2={changeValue2}
            diaryDatas={data[1]}
            calendarData={data[0]}
            saveDataMutation={saveDataMutation}
            closeModal={() => setShowNewDiary(!showNewDiary)}
          ></Diary>
        </DiaryModal>
      )}
      {showWrittenDiary && (
        <DiaryModal closeModal={() => setShowWrittenDiary(!showWrittenDiary)}>
          <Diary
            changeValue2={changeValue2}
            diaryDatas={data[1]}
            dateList={data[2]}
            calendarData={data[0]}
            saveDataMutation={saveDataMutation}
            saveEditDataMutation={saveEditDataMutation}
            deleteDataMutation={deleteDataMutation}
            closeModal={() => setShowWrittenDiary(!showWrittenDiary)}
          ></Diary>
        </DiaryModal>
      )} */}
    </Container>
  );
}

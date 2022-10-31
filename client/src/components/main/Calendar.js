import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FullCalendar } from "./FullCalendar";
import "./_styles.scss";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import DiaryModal from "./WriteModal";
import Diary from "./Diary";

import { calenderStore } from "../../store/store.js";

import axios from "axios";

import { useQuery, useMutation, useQueryClient } from "react-query";
import PacmanLoader from "react-spinners/PacmanLoader";

const DIARY_API_URL = "http://localhost:5000/calendar";

const Container = styled.div`
  flex: 1.75;
  display: flex;

  justify-content: center;
`;

export default function Calendar() {
  const {
    showWrittenDiary,
    setShowWrittenDiary,
    showNewDiary,
    setShowNewDiary,
    diaryDate,
    setDiaryDate,
    detailDate,
    setDetailDate,
  } = calenderStore();

  const queryClient = useQueryClient();

  const getData = async () => {
    try {
      const res = await axios.get(DIARY_API_URL, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const saveDataMutation = useMutation(
    async (data) => {
      try {
        const editted = await getData();
        console.log(editted);
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
        const res = await axios.put(`${DIARY_API_URL}/${data[1]}`, data[0], {
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

  const deleteDataMutation = useMutation(
    async (data) => {
      try {
        const res = await axios.delete(`${DIARY_API_URL}/${data[1]}`, data[0], {
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

  const { data, isLoading, refetch } = useQuery(["getCalendarData"], getData, {
    staleTime: Infinity,
  });

  if (isLoading) return <PacmanLoader color="#36d7b7" />;
  console.log("data", data);

  return (
    <Container>
      <FullCalendar calendarData={data} />
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
            // newDiary={showNewDiary}
            // writtenDiary={showWrittenDiary}
            // diaryDate={diaryDate}
            calendarData={data}
            saveDataMutation={saveDataMutation}
            closeModal={() => setShowNewDiary(!showNewDiary)}
          ></Diary>
        </DiaryModal>
      )}
      {showWrittenDiary && (
        <DiaryModal closeModal={() => setShowWrittenDiary(!showWrittenDiary)}>
          <Diary
            // newDiary={showNewDiary}
            // writtenDiary={showWrittenDiary}
            // diaryDate={diaryDate}
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

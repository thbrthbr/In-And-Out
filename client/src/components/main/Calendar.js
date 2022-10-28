import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FullCalendar } from "./FullCalendar";
import "./_styles.scss";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import DiaryModal from "./WriteModal";
import Diary from "./Diary";

import axios from "axios";

import { useQuery, useMutation, useQueryClient } from "react-query";
import PacmanLoader from "react-spinners/PacmanLoader";

const DIARY_API_URL = "http://localhost:5000/calendar";

Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";
  var weekName = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  var d = this;
  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case "yyyy":
        return d.getFullYear();
      case "yy":
        return (d.getFullYear() % 1000).zf(2);
      case "MM":
        return (d.getMonth() + 1).zf(2);
      case "dd":
        return d.getDate().zf(2);
      default:
        return $1;
    }
  });
};
String.prototype.string = function (len) {
  var s = "",
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};
String.prototype.zf = function (len) {
  return "0".string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

const Container = styled.div`
  flex: 0.75;
  display: flex;
  flex-direction: column;
`;

export default function Calendar() {
  const [showWrittenDiary, setShowWrittenDiary] = useState(false);
  const [showNewDiary, setShowNewDiary] = useState(false);
  const [diaryDate, setDiaryDate] = useState("");
  const [detailDate, setDetailDate] = useState("");

  const queryClient = useQueryClient();

  const getData = async () => {
    try {
      const res = await axios.get(DIARY_API_URL, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isLoading, refetch } = useQuery(["getCalendarData"], getData, {
    staleTime: Infinity,
  });

  if (isLoading) return <PacmanLoader color="#36d7b7" />;

  return (
    <Container>
      <FullCalendar
        onDiaryClick={setShowWrittenDiary}
        writtenDiary={showWrittenDiary}
        setDiaryDate={setDiaryDate}
        setDetailDate={setDetailDate}
        calendarData={data}
      />
      <Icon
        icon="heroicons:pencil-square"
        style={{ width: "5rem", height: "5rem", cursor: "pointer" }}
        onClick={() => setShowNewDiary(!showNewDiary)}
      ></Icon>

      {showNewDiary && (
        <DiaryModal closeModal={() => setShowNewDiary(!showNewDiary)}>
          <Diary
            newDiary={showNewDiary}
            writtenDiary={showWrittenDiary}
            diaryDate={diaryDate}
          ></Diary>
        </DiaryModal>
      )}
      {showWrittenDiary && (
        <DiaryModal closeModal={() => setShowWrittenDiary(!showWrittenDiary)}>
          <Diary
            newDiary={showNewDiary}
            writtenDiary={showWrittenDiary}
            diaryDate={diaryDate}
            calendarData={data}
          ></Diary>
        </DiaryModal>
      )}
    </Container>
  );
}

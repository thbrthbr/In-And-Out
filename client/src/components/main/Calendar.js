import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FullCalendar } from "./FullCalendar";
import "./_styles.scss";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import DiaryModal from "./WriteModal";
import Diary from "./Diary";

const Container = styled.div`
  flex: 0.75;
  display: flex;
  flex-direction: column;
`;

export default function Calendar() {
  const [showWrittenDiary, setShowWrittenDiary] = useState(false);
  const [showNewDiary, setShowNewDiary] = useState(false);

  return (
    <Container>
      <FullCalendar
        onDiaryClick={setShowWrittenDiary}
        writtenDiary={showWrittenDiary}
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
          ></Diary>
        </DiaryModal>
      )}
      {showWrittenDiary && (
        <DiaryModal closeModal={() => setShowWrittenDiary(!showWrittenDiary)}>
          <Diary
            newDiary={showNewDiary}
            writtenDiary={showWrittenDiary}
          ></Diary>
        </DiaryModal>
      )}
    </Container>
  );
}

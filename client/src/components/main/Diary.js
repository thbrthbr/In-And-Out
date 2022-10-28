import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";

const Container = styled.div`
  display: flex;
  background-color: white;
  margin-top: 35px;

  > div:first-child {
    text-align: center;
    flex: 0.5;
    border-right: 3px solid gray;
    height: 700px;
  }
  > div:last-child {
    text-align: center;
    flex: 1;
  }
`;

export default function Diary({
  newDiary,
  writtenDiary,
  diaryDate,
  calendarData,
}) {
  const [textValue, setTextValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [edit, setEdit] = useState(false);

  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  const onEdit = () => {
    setEdit(!edit);
    setTextValue(diaryData.diary.text);
  };

  // diaryDate가지고 데이터 요청
  const diaryData =
    writtenDiary && calendarData.filter((data) => data.date === diaryDate)[0];
  // console.log(diaryData);
  return (
    <div>
      {writtenDiary && !edit && (
        <Container>
          <div>
            <div style={{ height: "300px" }}>
              <div>수입</div>
              {diaryData.dailyIncomeList.map((income) => {
                return (
                  <div>
                    <span>{income.income_item}</span>
                    <span>{income.income_amount}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ height: "300px" }}>
              <div>지출</div>
              {diaryData.dailyExpenseList.map((expense) => {
                return (
                  <div>
                    <span>{expense.expense_item}</span>
                    <span>{expense.expense_amount}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div>{diaryData.date}</div>
            <div>
              <img
                style={{ width: "80%", height: "300px", marginTop: "15px" }}
                src={diaryData.diary.diary_photo_url}
                alt="이미지"
              />
            </div>
            <div>
              <div>{diaryData.diary.text}</div>
            </div>
            <div>
              <button onClick={onEdit}>수정하기</button>
            </div>
          </div>
        </Container>
      )}

      {writtenDiary && edit && (
        <Container>
          <div>
            <div style={{ height: "300px" }}>
              <div>수입</div>
              {diaryData.dailyIncomeList.map((income) => {
                return (
                  <div>
                    <span>{income.income_item}</span>
                    <span>{income.income_amount}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ height: "300px" }}>
              <div>지출</div>
              {diaryData.dailyExpenseList.map((expense) => {
                return (
                  <div>
                    <span>{expense.expense_item}</span>
                    <span>{expense.expense_amount}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              disabled
            />
            <div>
              <img
                style={{ width: "80%", height: "300px", marginTop: "15px" }}
                src={diaryData.diary.diary_photo_url}
                alt="이미지"
              />
            </div>
            <div>
              <textarea
                // placeholder="여기에 입력하세요"
                value={textValue}
                onChange={(e) => handleSetValue(e)}
              ></textarea>
            </div>
            <div>
              <button>이미지 등록</button>
              <button>완료</button>
            </div>
          </div>
        </Container>
      )}

      {newDiary && (
        <Container>
          <div>
            <textarea value={"12312312312312"} disabled></textarea>
          </div>
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <div
              style={{
                width: "80%",
                height: "300px",
                marginTop: "15px",
                border: "1px solid red",
              }}
            >
              <img src="" alt="이미지" />
            </div>
            <div>
              <textarea
                placeholder="여기에 입력하세요"
                value={textValue}
                onChange={(e) => handleSetValue(e)}
              ></textarea>
            </div>
            <div>
              <button>이미지 등록</button>
              <button>완료</button>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

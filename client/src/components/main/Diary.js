import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";

import { calenderStore } from "../../store/store.js";

import defaultUser from "../../img/default-user.jpg";

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
  calendarData,
  saveDataMutation,
  saveEditDataMutation,
  deleteDataMutation,
  closeModal,
}) {
  const {
    showWrittenDiary,
    setShowWrittenDiary,
    showNewDiary,
    setShowNewDiary,
    diaryDate,
    setDiaryDate,
    detailDate,
    setDetailDate,
    edit,
    setEdit,
    specificDate,
    setSpecificDate,
  } = calenderStore();

  const [textValue, setTextValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [profileImage, setprofileImage] = useState();

  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  const onEdit = () => {
    setEdit(!edit);
    setTextValue(diaryData.diary.text);
  };

  const onEditSave = (e) => {
    e.preventDefault();

    console.log(diaryData.date);
    const body = {
      id: diaryData.id,
      diary_id: diaryData.diary_id,
      date: diaryData.date,
      dailyIncomeList: [],
      dailyExpenseList: [],
      diary: {
        text: textValue,
        diary_photo_url: "",
      },
    };
    closeModal();
    saveEditDataMutation.mutate([body, diaryData.id]);
  };

  const onSave = (e) => {
    e.preventDefault();
    let num = Math.floor(Math.random() * 100);
    const body = {
      id: num,
      diary_id: num,
      date: specificDate.format("MM/dd/yy"),
      dailyIncomeList: [],
      dailyExpenseList: [],
      diary: {
        text: textValue,
        diary_photo_url: "",
      },
    };
    console.log(body);
    closeModal();
    saveDataMutation.mutate(body);
  };

  const onDelete = (e) => {
    e.preventDefault();
    const body = {
      diary_id: diaryData.diary_id,
    };
    closeModal();
    deleteDataMutation.mutate([body, diaryData.id]);
  };

  const fileInput = useRef();
  const onImageEdit = () => {};

  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

  const handleChange = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setprofileImage(reader.result);
    };
  };

  // diaryDate가지고 데이터 요청
  const diaryData =
    showWrittenDiary &&
    calendarData &&
    calendarData.filter((data) => data.date === diaryDate)[0];
  // console.log(diaryData);
  return (
    <div>
      {showWrittenDiary && !edit && (
        <Container>
          <div>
            {/* 작성된 화면 */}
            <div style={{ height: "300px" }}>
              <div>수입</div>
              {diaryData.dailyIncomeList.length &&
                diaryData.dailyIncomeList.map((income) => {
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
              {diaryData.dailyExpenseList.length &&
                diaryData.dailyExpenseList.map((expense) => {
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
              // selected={new Date(diaryData.date)}
              // onChange={(date) => setStartDate(date)}
              selected={new Date(specificDate)}
              onChange={(date) => setSpecificDate(date)}
              // 이 onchange 함수에서 렌더링하는 거 더 추가해야함
            />
            <div>
              <img
                style={{ width: "300px", height: "300px", marginTop: "15px" }}
                src={diaryData.diary.diary_photo_url}
                alt="이미지"
              />
            </div>
            <div>
              <div>{diaryData.diary.text}</div>
            </div>
            <div>
              <button onClick={onEdit}>수정하기</button>
              <button onClick={onDelete}>삭제</button>
            </div>
          </div>
        </Container>
      )}

      {showWrittenDiary && edit && (
        <Container>
          <div>
            {/* 작성된 화면 수정 화면 */}
            <div style={{ height: "300px" }}>
              <div>수입</div>
              {diaryData.dailyIncomeList.length &&
                diaryData.dailyIncomeList.map((income) => {
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
              {diaryData.dailyExpenseList.length &&
                diaryData.dailyExpenseList.map((expense) => {
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
              selected={new Date(diaryData.date)}
              onChange={(date) => setStartDate(date)}
            />
            <div>
              <img
                style={{ width: "300px", height: "300px", marginTop: "15px" }}
                src={
                  profileImage ? profileImage : diaryData.diary.diary_photo_url
                }
                alt="이미지"
                onClick={handleButtonClick}
                htmlFor="input-file"
              />
              <input
                type="file"
                id="input-file"
                accept="image/*"
                ref={fileInput}
                style={{ display: "none" }}
                onChange={handleChange}
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
              <button onClick={onImageEdit}>이미지 등록</button>
              <button onClick={onEditSave}>수정</button>
            </div>
          </div>
        </Container>
      )}

      {showNewDiary && (
        <Container>
          <div>
            {/* 아직 작성되지 않은 화면 */}
            <div style={{ width: "300px", height: "300px" }}>
              <div>수입</div>

              {diaryData.dailyIncomeList &&
                diaryData.dailyIncomeList.map((income) => {
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
              {diaryData.dailyExpenseList &&
                diaryData.dailyExpenseList.map((expense) => {
                  return (
                    <div>
                      <span>{expense.expense_item}</span>
                      <span>{expense.expense_amount}</span>
                    </div>
                  );
                })}
            </div>
          </div>
          <form style={{ width: "100%" }}>
            <DatePicker
              selected={new Date(specificDate)}
              onChange={(date) => setSpecificDate(date)}
              // dateFormat="MM/dd/yy"
              // selected={new Date(diaryData.date)}
              // onChange={(date) => setStartDate(date)}
            />
            <div>
              <img
                style={{ width: "300px", height: "300px", marginTop: "15px" }}
                src={profileImage ? profileImage : defaultUser}
                alt="이미지"
                onClick={handleButtonClick}
                htmlFor="input-file"
              />
              <input
                type="file"
                id="input-file"
                accept="image/*"
                ref={fileInput}
                style={{ display: "none" }}
                onChange={handleChange}
              />
            </div>
            <div>
              <textarea
                placeholder="여기에 입력하세요"
                value={textValue}
                onChange={(e) => handleSetValue(e)}
              ></textarea>
            </div>
            <div>
              <button onClick={onImageEdit}>이미지 등록</button>
              <button onClick={onSave}>완료</button>
            </div>
          </form>
        </Container>
      )}
    </div>
  );
}

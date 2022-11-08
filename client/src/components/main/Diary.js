import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";

import { calenderStore } from "../../store/store.js";

import defaultUser from "../../img/default-user.jpg";

import axios from "axios";

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

const Pyo = styled.div`
  height: 300px;
  overflow: scroll;
`;

const DeleteImage = styled.div`
  height: 30px;
  width: 100px;
  border: 1px solid rgb(186, 186, 186);
  background-color: #f5f5f5;
  border-radius: 4px;
  &:hover {
    background-color: rgb(186, 186, 186);
  }
`;

const EditPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DiaryContext = styled.div``;

export default function Diary({
  diaryDatas,
  calendarData,
  saveDataMutation,
  saveEditDataMutation,
  deleteDataMutation,
  closeModal,
  changeValue2,
  dateList,
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
    calendarImage,
    setCalendarImage,
    dateOrigin,
    setDateOrigin,
    text,
    setText,
    diaryImage,
    diaryId,
    sendingImage,
    setSendingImage,
    currentMonth,
    setcurrentMonth,
    showDiary,
    setTempText,
  } = calenderStore();

  // const [textValue, setTextValue] = useState("");
  // const [startDate, setStartDate] = useState(new Date());

  // const [profileImage, setprofileImage] = useState();

  // diaryDate가지고 데이터 요청
  // const diaryData =
  //   showWrittenDiary &&
  //   calendarData &&
  //   calendarData.filter((data) => data.date === diaryDate)[0];
  // const diaryData = 1;
  // console.log(diaryData);

  const temp = () => {
    console.log(sendingImage);
  };

  const handleSetValue = (e) => {
    setText(e.target.value);
    console.log(specificDate);
  };

  const onEdit = () => {
    setEdit(!edit);
  };

  const onImageDelete = () => {
    setSendingImage([100, 101, 108, 101, 116, 101]);
    setCalendarImage(defaultUser);
  };

  // const onEditSave = (e) => {
  //   e.preventDefault();

  //   console.log(diaryData.date);
  //   const body = {
  //     id: diaryData.id,
  //     diary_id: diaryData.diary_id,
  //     date: diaryData.date,
  //     dailyIncomeList: diaryData.dailyIncomeList
  //       ? diaryData.dailyIncomeList
  //       : [],
  //     dailyExpenseList: diaryData.dailyExpenseList
  //       ? diaryData.dailyExpenseList
  //       : [],
  //     diary: {
  //       text: textValue,
  //       diary_photo_url: calendarImage ? calendarImage : "",
  //     },
  //   };
  //   closeModal();
  //   setEdit(!edit);
  //   saveEditDataMutation.mutate([body, diaryData.id]);
  // };

  //date: startDate.format("MM/dd/yy"),

  // const onSave = (e) => {
  //   if (textValue === "") {
  //     alert("내용을 입력해주세요");
  //     return;
  //   }
  //   e.preventDefault();
  //   console.log(startDate);
  //   let num = Math.floor(Math.random() * 100);
  //   const body = {
  //     id: num,
  //     diary_id: num,
  //     date: specificDate,
  //     dailyIncomeList: diaryData.dailyIncomeList
  //       ? diaryData.dailyIncomeList
  //       : [],
  //     dailyExpenseList: diaryData.dailyExpenseList
  //       ? diaryData.dailyExpenseList
  //       : [],
  //     diary: {
  //       text: textValue,
  //       diary_photo_url: calendarImage ? calendarImage : "",
  //     },
  //   };
  //   console.log(body);
  //   closeModal();
  //   saveDataMutation.mutate(body);
  //   setCalendarImage(null);
  // };

  const onDelete = (e) => {
    e.preventDefault();

    const body = {
      diaryId: diaryId,
    };
    const input = JSON.stringify(body);
    deleteDataMutation.mutate(input);
    closeModal();
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
      setCalendarImage(reader.result);
    };
  };

  //01/01/22
  // const formatter = (e) => {
  //   let string = "";
  //   string = e[]
  // }

  const handleChange2 = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setCalendarImage(reader.result);
    };

    const fileOrigin = e.target.files[0];
    console.log(typeof fileOrigin);
    console.log(fileOrigin);
    setSendingImage(fileOrigin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      alert("내용을 입력해주세요");
      return;
    }
    const body2 = new FormData();

    if (edit !== true) {
      const input = { diaryDt: dateOrigin, text: basicSetting[0] };
      body2.append(
        "input",
        new Blob([JSON.stringify(input)], { type: "application/json" })
      );
      body2.append("file", sendingImage);
      setSendingImage(null);
      closeModal();
      // saveDataMutation.mutate(body);
      saveDataMutation.mutate(body2);
      setCalendarImage(null);
      setText("");
    } else {
      const input = {
        diaryId: diaryId,
        diaryDt: dateOrigin,
        text: text,
      };
      body2.append(
        "input",
        new Blob([JSON.stringify(input)], { type: "application/json" })
      );
      body2.append("file", sendingImage);
      setSendingImage(null);

      // saveDataMutation.mutate(body);
      saveEditDataMutation.mutate(body2);
      onEdit();
      setCalendarImage(null);
      setText("");
      closeModal();
    }
  };

  function formatter(e) {
    let a = e;
    let string = a[5] + a[6] + "/" + a[8] + a[9] + "/" + a[2] + a[3];
    return string;
  }

  const basicSetting = (a, b) => {
    return [a, b];
  };
  let checking = 0;

  return (
    <div>
      {showDiary && (
        <Container>
          <Pyo>
            <div style={{ height: "300px" }}>
              <div>수입</div>
              {calendarData.calendarIncomeDtoList.length > 0 &&
                calendarData.calendarIncomeDtoList.map((income) => {
                  if (formatter(income.incomeDt) === diaryDate)
                    return (
                      <div>
                        <span>{income.item}</span>
                        <span>{income.amount}</span>
                      </div>
                    );
                })}
            </div>
            <div style={{ height: "300px" }}>
              <div>지출</div>
              {calendarData.calendarExpenseDtoList.length > 0 &&
                calendarData.calendarExpenseDtoList.map((expense) => {
                  if (formatter(expense.expenseDt) === diaryDate) {
                    return (
                      <div>
                        <span>{expense.item}</span>
                        <span>{expense.amount}</span>
                      </div>
                    );
                  }
                })}
            </div>
          </Pyo>
          <DiaryContext>
            {edit ? (
              specificDate
            ) : (
              <DatePicker
                selected={new Date(specificDate)}
                onChange={(date) => {
                  // 여기에 월 이동에 따른 데이터 재요청 함수 만들어서 넣어야함
                  // changeValue(,);
                  console.log(date.format("MM"));
                  console.log(currentMonth.format("MM"));
                  if (date.format("MM") !== currentMonth.format("MM")) {
                    if (
                      parseInt(date.format("MM")) <
                      parseInt(currentMonth.format("MM"))
                    ) {
                      changeValue2(
                        format(
                          startOfMonth(
                            subMonths(
                              currentMonth,
                              parseInt(
                                currentMonth.format("MM") -
                                  parseInt(date.format("MM"))
                              )
                            )
                          ),
                          "yyyy-MM-dd"
                        ),
                        format(
                          endOfMonth(
                            subMonths(
                              currentMonth,
                              parseInt(currentMonth.format("MM")) -
                                parseInt(date.format("MM"))
                            )
                          ),
                          "yyyy-MM-dd"
                        ),
                        date
                      );
                    } else if (
                      parseInt(date.format("MM")) >
                      parseInt(currentMonth.format("MM"))
                    ) {
                      changeValue2(
                        format(
                          startOfMonth(
                            addMonths(
                              currentMonth,
                              parseInt(date.format("MM")) -
                                parseInt(currentMonth.format("MM"))
                            )
                          ),
                          "yyyy-MM-dd"
                        ),
                        format(
                          endOfMonth(
                            addMonths(
                              currentMonth,
                              parseInt(date.format("MM")) -
                                parseInt(currentMonth.format("MM"))
                            )
                          ),
                          "yyyy-MM-dd"
                        ),
                        date
                      );
                    }

                    setDateOrigin(date.format("yyyy-MM-dd"));
                    setSpecificDate(date.format("MM/dd/yy"));
                    setDiaryDate(date.format("MM/dd/yy"));
                    let checker = 0;
                  } else {
                    setDateOrigin(date.format("yyyy-MM-dd"));
                    setSpecificDate(date.format("MM/dd/yy"));
                    setDiaryDate(date.format("MM/dd/yy"));
                  }
                }}
              />
            )}
            {edit ? (
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <EditPlace>
                  <div>
                    <img
                      style={{
                        width: "300px",
                        height: "300px",
                        marginTop: "15px",
                      }}
                      src={calendarImage ? calendarImage : diaryImage}
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
                      onChange={handleChange2}
                    />
                  </div>
                  <div>
                    <textarea
                      // placeholder="여기에 입력하세요"
                      value={basicSetting[0]}
                      onChange={(e) => handleSetValue(e)}
                    ></textarea>
                  </div>
                  <div>
                    <DeleteImage onClick={onImageDelete}>
                      이미지 삭제
                    </DeleteImage>
                    <button type="submit">수정</button>
                  </div>
                </EditPlace>
              </form>
            ) : dateList.includes(diaryDate) ? (
              diaryDatas.map((data) => {
                if (formatter(data.diaryDt) === diaryDate) {
                  basicSetting(data.text, data.s3ImageUrl);
                  {
                    if (data.s3ImageUrl !== "") {
                      // setCalendarImage(data.s3ImageUrl);
                      return (
                        <div>
                          <img
                            style={{
                              width: "300px",
                              height: "300px",
                              marginTop: "15px",
                            }}
                            src={data.s3ImageUrl}
                            alt="이미지"
                          />
                          <div>
                            <div>{data.text}</div>
                          </div>
                          <div>
                            <button onClick={onEdit}>수정하기</button>
                            <button onClick={onDelete}>삭제</button>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          <img
                            style={{
                              width: "300px",
                              height: "300px",
                              marginTop: "15px",
                            }}
                            src=""
                            alt="이미지"
                          />
                          <div>
                            <div>{text}</div>
                          </div>
                          <div>
                            <button onClick={onEdit}>수정하기</button>
                            <button onClick={onDelete}>삭제</button>
                          </div>
                        </div>
                      );
                    }
                  }
                }
              })
            ) : (
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div>
                  <img
                    style={{
                      width: "300px",
                      height: "300px",
                      marginTop: "15px",
                    }}
                    src={calendarImage ? calendarImage : defaultUser}
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
                    onChange={handleChange2}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="여기에 입력하세요"
                    value={text}
                    onChange={(e) => handleSetValue(e)}
                  ></textarea>
                </div>
                <div>
                  <button type="submit">완료</button>
                </div>
              </form>
            )}
          </DiaryContext>
        </Container>
      )}
    </div>
  );
}

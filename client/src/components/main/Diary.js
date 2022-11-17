import React, { useRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { Icon } from "@iconify/react";
import { calenderStore } from "../../store/store.js";
import none from "../../img/none.png";
import {
  addMonths,
  subMonths,
  addDays,
  subDays,
  startOfMonth,
  endOfMonth,
  format,
} from "date-fns";
import { ko } from "date-fns/esm/locale";
import Form from "react-bootstrap/Form";

Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";
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
  margin-top: 10px;
  > div:first-child {
    text-align: center;
    flex: 0.5;
    border-right: 3px solid gray;
    height: 550px;
  }
  > div:last-child {
    text-align: center;
    flex: 1;
  }
`;

const DateMover = styled.div`
  display: flex;
  flex-direction: row;
`;

const FixButtons = styled.button`
  border: none;
  background-color: transparent;
`;

const TextArea = styled.textarea`
  width: 400px;
  height: 150px;
  border: 1px solid #ebebeb;
  font-size: 25px;
  font-family: "OTWelcomeRA";
  &:focus {
    outline: none;
  }
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5x;
  }

  &::-webkit-scrollbar-thumb {
    height: 30%;
    background: #c0c0c0;
    border-radius: 10px;
  }
`;

const Pre = styled.pre`
  width: 400px;
  resize: none;
  white-space: pre-wrap;
  font-family: "OTWelcomeRA";
`;

const Pyo = styled.div`
  height: 300px;
  width: 200px;
  white-space: pre-wrap;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 20%;
    background: #748da6;
    border-radius: 10px;
  }
`;

const DeleteImage = styled.div`
  position: absolute;
  margin-left: 120px;
  margin-top: -275px;
  height: 20px;
  width: 20px;
  font-size: 25px;
  color: rgb(186, 186, 186);
  opacity: 70%;
  background-color: transparent;
  border-radius: 50%;
  &:active {
    background-color: rgb(186, 186, 186);
  }
`;

const WriteButton = styled.button`
  margin-left: 5px;
  height: 155px;
  width: 80px;
  margin-top: -28px;
  border: 0px;
  background-color: transparent;
  cursor: pointer;
  &:active {
    color: white;
  }
`;

const EditPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const ImagePlace = styled.div`
  width: 500px;
  height: 330px;
`;

const Upload = styled.div`
  position: absolute;
  margin-left: 250px;
  margin-top: -50px;
  background-color: white;
  opacity: 50%;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 10px;
`;

const DiaryContext = styled.div`
  width: 400px;
  height: 550px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 20%;
    background: #748da6;
    border-radius: 10px;
  }
`;

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
    diaryDate,
    setDiaryDate,
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
    diaryId,
    setDiaryId,
    sendingImage,
    setSendingImage,
    currentMonth,
    showDiary,
    commaMaker,
    formatter,
  } = calenderStore();

  const handleSetValue = (e) => {
    setText(e.target.value);
  };

  const onEdit = () => {
    setCalendarImage(basicImg);
    setText(basicText);
    setDiaryId(basicDiaryId);
    setEdit(!edit);
  };

  const onImageDelete = () => {
    let hi = new File([100, 101, 108, 101, 116, 101], "delete");
    setSendingImage(hi);
    setCalendarImage(none);
  };

  const onImageDelete2 = () => {
    setSendingImage(null);
    setCalendarImage(none);
  };

  const onDelete = (e) => {
    e.preventDefault();

    const body = {
      diaryId: basicDiaryId,
    };
    const input = JSON.stringify(body);
    deleteDataMutation.mutate(input);
    closeModal();
  };

  const fileInput = useRef();

  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

  const handleChange2 = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setCalendarImage(reader.result);
    };

    const fileOrigin = e.target.files[0];
    setSendingImage(fileOrigin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body2 = new FormData();

    if (edit !== true) {
      // 새로 쓸 때
      const input = { diaryDt: dateOrigin, text: text };
      body2.append(
        "input",
        new Blob([JSON.stringify(input)], { type: "application/json" })
      );
      if (sendingImage === null) {
        let nullTaker = new File([110, 117, 108, 108], "null");
        body2.append("file", nullTaker);
      } else {
        body2.append("file", sendingImage);
      }
      setSendingImage(null);
      closeModal();
      saveDataMutation.mutate(body2);
      setCalendarImage(null);
      setText("");
    } else {
      //수정할 때
      const input = {
        diaryId: diaryId,
        diaryDt: dateOrigin,
        text: text,
      };
      body2.append(
        "input",
        new Blob([JSON.stringify(input)], { type: "application/json" })
      );
      if (sendingImage === null) {
        let nullTaker = new File([110, 117, 108, 108], "null");
        body2.append("file", nullTaker);
      } else {
        body2.append("file", sendingImage);
      }
      saveEditDataMutation.mutate(body2);
      onEdit();
      setSendingImage(null);
      setCalendarImage(null);
      setText("");
      closeModal();
    }
  };

  let basicImg = null;
  let basicText = "";
  let basicDiaryId = 0;

  const basicSetting = (a, b, c) => {
    basicText = a;
    basicImg = b;
    basicDiaryId = c;
  };

  let check = 0;
  let isChecker = 0;
  let flag = 0;
  let num = 0;

  let check2 = 0;
  let isChecker2 = 0;
  let flag2 = 0;
  let num2 = 0;

  const nextDay = () => {
    let nd = addDays(new Date(specificDate), 1);
    if (format(new Date(specificDate), "MM") !== format(nd, "MM")) {
      changeValue2(
        format(startOfMonth(nd), "yyyy-MM-dd"),
        format(endOfMonth(nd), "yyyy-MM-dd"),
        nd
      );
      setDateOrigin(nd.format("yyyy-MM-dd"));
      setSpecificDate(nd.format("MM/dd/yy"));
      setDiaryDate(nd.format("MM/dd/yy"));
    } else {
      setDateOrigin(nd.format("yyyy-MM-dd"));
      setSpecificDate(nd.format("MM/dd/yy"));
      setDiaryDate(nd.format("MM/dd/yy"));
    }
  };

  const prevDay = () => {
    let pd = subDays(new Date(specificDate), 1);
    if (format(new Date(specificDate), "MM") !== format(pd, "MM")) {
      changeValue2(
        format(startOfMonth(pd), "yyyy-MM-dd"),
        format(endOfMonth(pd), "yyyy-MM-dd"),
        pd
      );
      setDateOrigin(pd.format("yyyy-MM-dd"));
      setSpecificDate(pd.format("MM/dd/yy"));
      setDiaryDate(pd.format("MM/dd/yy"));
    } else {
      setDateOrigin(pd.format("yyyy-MM-dd"));
      setSpecificDate(pd.format("MM/dd/yy"));
      setDiaryDate(pd.format("MM/dd/yy"));
    }
  };

  return (
    <div>
      {showDiary && (
        <Container>
          <Pyo>
            <div>
              <div>&lt;지출&gt;</div>
              {calendarData.calendarExpenseDtoList.length > 0 ? (
                calendarData.calendarExpenseDtoList.map((expense) => {
                  check2++;
                  if (formatter(expense.expenseDt) === diaryDate) {
                    num2++;
                    isChecker2 = 1;
                    let amount = commaMaker(expense.amount);
                    if (
                      check2 === calendarData.calendarExpenseDtoList.length &&
                      num2 < 9
                    ) {
                      return (
                        <>
                          <div>
                            <span>{expense.item}</span>
                            <span>&nbsp; : &nbsp;</span>
                            <span>{amount}</span>
                          </div>
                          <div
                            style={{ height: `calc(400px - ${num}*40px)` }}
                          ></div>
                        </>
                      );
                    }
                    if (expense.item.length > 26 || amount.length > 26) {
                      let temp1 = [];
                      let temp2 = [];
                      if (expense.item.length > 26) {
                        let partition = "";
                        for (let i = 0; i < expense.item.length; i++) {
                          partition += expense.item[i];
                          if (partition.length === 26) {
                            temp1.push(partition);
                            partition = "";
                          }
                          if (i == expense.item.length - 1) {
                            temp1.push(partition);
                            partition = "";
                          }
                        }
                      } else {
                        temp1.push(expense.item);
                      }
                      if (amount.length > 26) {
                        let partition = "";
                        for (let i = 0; i < amount.length; i++) {
                          partition += amount[i];
                          if (partition.length === 26) {
                            temp2.push(partition);
                            partition = "";
                          }
                          if (i === amount.length - 1) {
                            temp2.push(partition);
                            partition = "";
                          }
                        }
                      } else {
                        temp2.push(amount);
                      }
                      return (
                        <div>
                          {temp1.map((data) => {
                            return (
                              <>
                                <span>{data}</span> <br></br>
                              </>
                            );
                          })}
                          <span>&nbsp; : &nbsp;</span>
                          {temp2.map((data) => {
                            return (
                              <>
                                <span>{data}</span> <br></br>
                              </>
                            );
                          })}
                        </div>
                      );
                    } else {
                      let amount = commaMaker(expense.amount);
                      return (
                        <div>
                          <span>{expense.item}</span>
                          <span>&nbsp; : &nbsp;</span>
                          <span>{amount}</span>
                        </div>
                      );
                    }
                  } else {
                    if (isChecker2 > 0) {
                      flag2 = 1;
                      if (
                        check2 === calendarData.calendarExpenseDtoList.length &&
                        num2 < 10
                      ) {
                        return (
                          <div
                            style={{ height: `calc(400px - ${num2}*40px)` }}
                          ></div>
                        );
                      }
                    }
                    if (
                      check2 === calendarData.calendarExpenseDtoList.length &&
                      flag2 === 0
                    ) {
                      flag2 = 1;
                      return <div style={{ height: "400px" }}></div>;
                    }
                  }
                })
              ) : (
                <div style={{ height: "400px" }}></div>
              )}
            </div>
            <div>
              <div>&lt;수입&gt;</div>
              {calendarData.calendarIncomeDtoList.length > 0 ? (
                calendarData.calendarIncomeDtoList.map((income) => {
                  check++;
                  if (formatter(income.incomeDt) === diaryDate) {
                    num++;
                    isChecker = 1;
                    let amount = commaMaker(income.amount);
                    if (
                      check === calendarData.calendarIncomeDtoList.length &&
                      num < 10
                    ) {
                      return (
                        <>
                          <div>
                            <span>{income.item}</span>
                            <span>&nbsp; : &nbsp;</span>
                            <span>{amount}</span>
                          </div>
                          <div
                            style={{ height: `calc(400px - ${num}*40px)` }}
                          ></div>
                        </>
                      );
                    }
                    if (income.item.length > 26 || amount.length > 26) {
                      let temp1 = [];
                      let temp2 = [];
                      if (income.item.length > 26) {
                        let partition = "";
                        for (let i = 0; i < income.item.length; i++) {
                          partition += income.item[i];
                          if (partition.length === 26) {
                            temp1.push(partition);
                            partition = "";
                          }
                          if (i === income.item.length - 1) {
                            temp1.push(partition);
                            partition = "";
                          }
                        }
                      } else {
                        temp1.push(income.item);
                      }
                      if (amount.length > 26) {
                        let partition = "";
                        for (let i = 0; i < amount.length; i++) {
                          partition += amount[i];
                          if (partition.length === 26) {
                            temp2.push(partition);
                            partition = "";
                          }
                          if (i === amount.length - 1) {
                            temp2.push(partition);
                            partition = "";
                          }
                        }
                      } else {
                        temp2.push(amount);
                      }
                      return (
                        <div>
                          {temp1.map((data) => {
                            return (
                              <>
                                <span>{data}</span> <br></br>
                              </>
                            );
                          })}
                          <span>&nbsp; : &nbsp;</span>
                          {temp2.map((data) => {
                            return (
                              <>
                                <span>{data}</span> <br></br>
                              </>
                            );
                          })}
                        </div>
                      );
                    } else {
                      let amount = commaMaker(income.amount);
                      return (
                        <div>
                          <span>{income.item}</span>
                          <span>&nbsp; : &nbsp;</span>
                          <span>{amount}</span>
                        </div>
                      );
                    }
                  } else {
                    if (isChecker > 0) {
                      flag = 1;
                      if (
                        check === calendarData.calendarIncomeDtoList.length &&
                        num < 10
                      ) {
                        return (
                          <div
                            style={{ height: `calc(400px - ${num}*40px)` }}
                          ></div>
                        );
                      }
                    }
                    if (
                      check === calendarData.calendarIncomeDtoList.length &&
                      flag == 0
                    ) {
                      flag = 1;
                      return <div style={{ height: "400px" }}></div>;
                    }
                  }
                })
              ) : (
                <div style={{ height: "400px" }}></div>
              )}
            </div>
          </Pyo>
          <DiaryContext>
            {edit ? (
              <div>&lt;{specificDate}&gt;</div>
            ) : (
              <DateMover>
                <DatePicker
                  locale={ko}
                  selected={new Date(specificDate)}
                  customInput={
                    <Form.Control
                      as="textarea"
                      rows={1}
                      style={{
                        marginTop: "10px",
                        paddingTop: "5px",
                        width: "78px",
                        fontFamily: "OTWelcomeRA",
                        resize: "none",
                        cursor: "pointer",
                        border: "0.5px solid #C0C0C0",
                        borderRadius: "50px",
                      }}
                      readOnly
                    />
                  }
                  onChange={(date) => {
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
                    } else {
                      setDateOrigin(date.format("yyyy-MM-dd"));
                      setSpecificDate(date.format("MM/dd/yy"));
                      setDiaryDate(date.format("MM/dd/yy"));
                    }
                  }}
                />
                <Icon
                  icon="bi:arrow-left-circle-fill"
                  style={{
                    position: "absolute",
                    marginTop: "13px",
                    marginLeft: "180px",
                    cursor: "pointer",
                    color: "#F2D7D9",
                  }}
                  onClick={prevDay}
                />
                <Icon
                  icon="bi:arrow-right-circle-fill"
                  style={{
                    position: "absolute",
                    marginTop: "13px",
                    marginLeft: "331px",
                    cursor: "pointer",
                    color: "#F2D7D9",
                  }}
                  onClick={nextDay}
                />
              </DateMover>
            )}
            {edit ? (
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <EditPlace>
                  <ImagePlace>
                    <img
                      style={{
                        width: "250px",
                        height: "250px",
                        marginTop: "15px",
                        position: "relative",
                      }}
                      src={calendarImage === "" ? none : calendarImage}
                      alt="이미지"
                      htmlFor="input-file"
                    />
                    <DeleteImage onClick={onImageDelete}>
                      <div
                        style={{
                          cursor: "pointer",
                          marginLeft: "2px",
                          marginTop: "-5px",
                        }}
                      >
                        &#215;
                      </div>
                    </DeleteImage>
                    <Upload onClick={handleButtonClick}>
                      클릭해서 이미지 업로드
                    </Upload>
                    <input
                      type="file"
                      id="input-file"
                      accept="image/*"
                      ref={fileInput}
                      style={{ display: "none" }}
                      onChange={handleChange2}
                    />
                  </ImagePlace>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <TextArea
                        value={text}
                        onChange={(e) => handleSetValue(e)}
                        style={{ resize: "none" }}
                      ></TextArea>
                    </div>
                    <div>
                      <WriteButton
                        style={{
                          marginTop: "-18px",
                        }}
                        type="submit"
                      >
                        <Icon
                          icon="heroicons:pencil-square"
                          style={{
                            width: "3rem",
                            height: "3rem",
                            cursor: "pointer",
                          }}
                        ></Icon>
                      </WriteButton>
                    </div>
                  </div>
                </EditPlace>
              </form>
            ) : dateList.includes(diaryDate) ? (
              diaryDatas.map((data) => {
                if (formatter(data.diaryDt) === diaryDate) {
                  basicSetting(data.text, data.s3ImageUrl, data.diaryId);
                  {
                    if (data.s3ImageUrl === "") {
                      return (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Pre>{data.text}</Pre>
                          </div>
                          <div
                            style={{
                              marginLeft: "390px",
                              display: "flex",
                              width: "100px",
                              flexDirection: "row",
                            }}
                          >
                            <FixButtons onClick={onEdit}>
                              <Icon
                                icon="heroicons:pencil-square"
                                style={{
                                  width: "3rem",
                                  height: "3rem",
                                  cursor: "pointer",
                                }}
                              ></Icon>
                            </FixButtons>
                            <FixButtons onClick={onDelete}>
                              <Icon
                                icon="mdi:trash-can-outline"
                                style={{
                                  width: "3rem",
                                  height: "3rem",
                                  cursor: "pointer",
                                  color: "red",
                                }}
                              ></Icon>
                            </FixButtons>
                          </div>
                          <div
                            style={{
                              height: "50px",
                            }}
                          ></div>
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          <img
                            style={{
                              width: "250px",
                              height: "250px",
                              marginTop: "5px",
                            }}
                            src={data.s3ImageUrl}
                            alt="이미지"
                          />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Pre>{data.text}</Pre>
                          </div>
                          <div
                            style={{
                              marginLeft: "390px",
                              display: "flex",
                              width: "100px",
                              flexDirection: "row",
                            }}
                          >
                            <FixButtons onClick={onEdit}>
                              <Icon
                                icon="heroicons:pencil-square"
                                style={{
                                  width: "3rem",
                                  height: "3rem",
                                  cursor: "pointer",
                                }}
                              ></Icon>
                            </FixButtons>
                            <FixButtons onClick={onDelete}>
                              <Icon
                                icon="mdi:trash-can-outline"
                                style={{
                                  width: "3rem",
                                  height: "3rem",
                                  cursor: "pointer",
                                  color: "red",
                                }}
                              ></Icon>
                            </FixButtons>
                          </div>
                          <div
                            style={{
                              height: "50px",
                            }}
                          ></div>
                        </div>
                      );
                    }
                  }
                }
              })
            ) : (
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div>
                  <ImagePlace>
                    <img
                      style={{
                        width: "250px",
                        height: "250px",
                        marginTop: "5px",
                      }}
                      src={calendarImage ? calendarImage : none}
                      alt="이미지"
                      htmlFor="input-file"
                    />
                    <DeleteImage onClick={onImageDelete2}>
                      <div
                        style={{
                          cursor: "pointer",
                          marginLeft: "2px",
                          marginTop: "-5px",
                        }}
                      >
                        &#215;
                      </div>
                    </DeleteImage>
                    <Upload onClick={handleButtonClick}>
                      클릭해서 이미지 업로드
                    </Upload>
                  </ImagePlace>
                  <input
                    type="file"
                    id="input-file"
                    accept="image/*"
                    ref={fileInput}
                    style={{ display: "none" }}
                    onChange={handleChange2}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <TextArea
                      placeholder="여기에 입력하세요"
                      value={text}
                      onChange={(e) => handleSetValue(e)}
                      style={{ resize: "none", marginTop: "-10px" }}
                      wrap="physical"
                      rows="10"
                      cols="60"
                    ></TextArea>
                  </div>
                  <div>
                    <WriteButton type="submit">
                      <Icon
                        icon="heroicons:pencil-square"
                        style={{
                          width: "3rem",
                          height: "3rem",
                          cursor: "pointer",
                        }}
                      ></Icon>
                    </WriteButton>
                  </div>
                </div>
              </form>
            )}
          </DiaryContext>
        </Container>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import styled from "styled-components";

import { calenderStore } from "../../store/store.js";

const InstanceTable = styled.div`
  margin-top: 20px;
  margin-left: 60px;
  width: 100px;
  height: 100px;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  overflow: scroll;
  cursor: default;
`;

const TableWrapper = styled.div`
  position: relative;
`;

const CloseBtn = styled.div`
  position: sticky;
  top: 0;
  margin-left: 5px;
  height: 30px;
  font-size: 25px;
  cursor: pointer;
`;

// const IconWrapper = styled.div`
//   weight: 100px;
//   height: 20px;
//   background-color: yellow;
// `;

const RenderHeader = () => {
  const { currentMonth, prevMonth, nextMonth } = calenderStore();

  return (
    <div className="header row">
      <div className="col col-first">
        <span className="text">
          <span className="text month">{format(currentMonth, "M")}월</span>
          {format(currentMonth, "yyyy")}
        </span>
      </div>
      <div className="col col-end">
        <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
        <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
      </div>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>
    );
  }

  return <div className="days row">{days}</div>;
};

const RenderCells = ({ diaryData }) => {
  const {
    showWrittenDiary,
    setShowWrittenDiary,
    diaryDate,
    setDiaryDate,
    setDetailDate,
    selectedDate,
    setSelectedDate,
    currentMonth,
    setCurrentMonth,
    showNewDiary,
    setShowNewDiary,
    setSpecificDate,
    showInstanceTable,
    setShowInstanceTable,
  } = calenderStore();

  const onDateClick = (day) => {
    console.log(1, day);
    setSelectedDate(day);
  };

  const tempDiaryData = diaryData.filter((data) => data.date === diaryDate)[0];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      const formattedDataForDiary = day.format("MM/dd/yy");
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={formattedDataForDiary}
          // onClick={() => onDateClick(parse(cloneDay, "YYYYMMDD", new Date()))}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          id={formattedDataForDiary}
          onClick={(e) => {
            setSpecificDate(formattedDataForDiary);
            let check = 0;
            {
              diaryData.map((data) => {
                if (formattedDataForDiary === data.date) {
                  setShowWrittenDiary(!showWrittenDiary);
                  setDiaryDate(e.target.id);
                  check++;
                }
              });
            }
            if (check == 0) {
              setDiaryDate(e.target.id);
              setShowNewDiary(!showNewDiary);
            }
          }}
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            {formattedDate}
          </span>
          <div
            style={{
              width: "80%",
              marginLeft: "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
            id={formattedDataForDiary}
          >
            {diaryData.map((data) => {
              if (formattedDataForDiary === data.date) {
                return (
                  <Icon
                    icon="arcticons:diary"
                    id={formattedDataForDiary}
                    key={data.date}
                  ></Icon>
                );
              } else {
                return <div style={{ display: "none" }} key={data.date}></div>;
              }
            })}
            {diaryData.map((data) => {
              if (
                formattedDataForDiary === data.date &&
                (data.dailyExpenseList.length || data.dailyIncomeList.length)
              ) {
                return (
                  <>
                    <Icon
                      icon="cil:magnifying-glass"
                      id={formattedDataForDiary}
                      key={data.date}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetailDate(e.target.id);
                        setShowInstanceTable(!showInstanceTable);
                        setDiaryDate(formattedDataForDiary);
                        console.log(showInstanceTable);
                      }}
                    ></Icon>
                    {showInstanceTable && formattedDataForDiary === diaryDate && (
                      <InstanceTable
                        // key={data.date}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <TableWrapper>
                          <CloseBtn
                            onClick={(e) => {
                              setShowInstanceTable(!showInstanceTable);
                            }}
                          >
                            &#215;
                          </CloseBtn>
                          <h3>수입</h3>
                          <div>
                            {tempDiaryData.dailyIncomeList.length &&
                              tempDiaryData.dailyIncomeList.map((income) => {
                                return (
                                  <div>
                                    <span>{income.income_item}</span>
                                    <span>{income.income_amount}</span>
                                  </div>
                                );
                              })}
                          </div>
                          <h3>지출</h3>
                          <div>
                            {tempDiaryData.dailyExpenseList.length &&
                              tempDiaryData.dailyExpenseList.map((expense) => {
                                return (
                                  <div>
                                    <span>{expense.expense_item}</span>
                                    <span>{expense.expense_amount}</span>
                                  </div>
                                );
                              })}
                          </div>
                        </TableWrapper>
                      </InstanceTable>
                    )}
                  </>
                );
              } else {
                return <div style={{ display: "none" }} key={data.date}></div>;
              }
            })}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

export const FullCalendar = ({ calendarData }) => {
  return (
    <div className="calendar">
      <RenderHeader />
      <RenderDays />
      <RenderCells diaryData={calendarData} />
    </div>
  );
};

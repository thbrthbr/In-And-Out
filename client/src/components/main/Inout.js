import React, { useState, useEffect } from "react";

import "react-data-grid/lib/styles.css";
import DataGrid, { SelectColumn, textEditor } from "react-data-grid";
import dropDownEditor from "../../editor/dropDownEditor";
import DateEditor from "../../editor/DateEditor";

import { NavLink, useLocation } from "react-router-dom";

import axios from "axios";
import styled from "styled-components";

const SideButton = styled.div`
  width: 180px;
  height: 50px;
  margin-top: 20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLinkContainer = styled.div`
  display: flex;
`;

const incomeColumns = [
  SelectColumn,
  {
    key: "incomeDate",
    name: "날짜",
    width: 200,
    formatter(props) {
      return <>{props.row.date}</>;
    },
    editor: DateEditor,
  },
  {
    key: "incomeItem",
    name: "사용내역",
    editor: textEditor,
  },
  {
    key: "incomeAmount",
    name: "금액",
    editor: textEditor,
  },
  {
    key: "incomeCategoryName",
    name: "분류",
    formatter(props) {
      return <>{props.row.category}</>;
    },
    resizable: true,
    editor: dropDownEditor,
    editorOptions: {
      editOnClick: true,
    },
  },
  {
    key: "incomeMemo",
    name: "메모",
    width: 500,
    editor: textEditor,
  },
];

const expenseColumns = [
  SelectColumn,
  {
    key: "expenseDate",
    name: "날짜",
    width: 200,
    formatter(props) {
      return <>{props.row.date}</>;
    },
    editor: DateEditor,
  },
  {
    key: "expenseItem",
    name: "사용내역",
    editor: textEditor,
  },
  {
    key: "expenseCash",
    name: "현금",
    editor: textEditor,
  },
  {
    key: "expenseCard",
    name: "카드",
    editor: textEditor,
  },
  {
    key: "expenseCategoryName",
    name: "분류",
    formatter(props) {
      return <>{props.row.category}</>;
    },
    resizable: true,
    editor: dropDownEditor,
    editorOptions: {
      editOnClick: true,
    },
  },
  {
    key: "expenseMemo",
    name: "메모",
    width: 500,
    editor: textEditor,
  },
];

let dataRow = [
  {
    expenseId: 1,
    expenseDate: "10/6/2022",
    expenseItem: "Lasagne",
    expenseCash: "4000",
    expenseCard: "32000",
    expenseCategoryName: "식비",
    expenseMemo: "good",
  },
  {
    expenseId: 2,
    expenseDate: "10/6/2022",
    expenseItem: "Lasagne",
    expenseCash: "4000",
    expenseCard: "32000",
    expenseCategoryName: "식비",
    expenseMemo: "good",
  },
];

function rowKeyGetter(row) {
  return row.id;
}

let num = dataRow.length;
export default function Inout() {
  const [rows, setRows] = useState([]); // 나중에 빈배열로 처리
  const [selectedRows, setSelectedRows] = useState(() => new Set());
  const loc = useLocation();

  async function getData(path) {
    if (path === "/inout/income") {
      const res = await axios.get("http://localhost:5000/income");
      console.log(res.data.income);
      const incomeData = res.data.income;
      const newData = incomeData.map((item) => {
        return {
          ...item,
          date: item.incomeDate,
          category: item.incomeCategoryName,
        };
      });
      setRows(newData);
    } else if (path === "/inout/expense") {
      const res = await axios.get("http://localhost:5000/expense");
      console.log(res.data.expense);
      const expenseData = res.data.expense;
      console.log(expenseData);
      // setRows(expenseData);
      const newData = expenseData.map((item) => {
        return {
          ...item,
          date: item.expenseDate,
          category: item.expenseCategoryName,
        };
      });
      setRows(newData);
      // setRows(...rows, [0].expenseData
    }
    console.log("getdata");
  }

  useEffect(() => {
    // 데이터 불러오기
    getData(loc.pathname); // dataRow에 받은 데이터 저장한 후 저장 할때 dataRow를 서버에 보내면 될듯
  }, [loc]);

  function createNewRow() {
    const newIncomeData = {
      id: num++,
      date: "",
      history: "",
      cash: "",
      card: "",
      category: "",
      memo: "",
    };

    const newExpenseData = {
      id: num++,
      date: "",
      history: "",
      cash: "",
      card: "",
      category: "",
      memo: "",
    };
    setRows([...rows, newIncomeData]);
    console.log(selectedRows);
    dataRow.push(newIncomeData); // 요렇게 하면 다른 화면 이동 후에도 저장가능한듯?
    // console.log(rows);
  }

  function saveData() {
    alert("saved");
  }
  function deleteData() {
    // console.log(rows);
    // console.log([...selectedRows]);
    const newRows = rows.slice();
    const filteredRow = newRows.filter((row, idx) => !selectedRows.has(row.id));
    setRows(filteredRow);
    dataRow = filteredRow;
  }

  return (
    <div>
      <NavLinkContainer>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? {
                  textDecoration: "none",
                  borderBottom: "1px solid red",
                }
              : { color: "black", textDecoration: "none" }
          }
          to={"/inout/income"}
        >
          <SideButton>{"수입"}</SideButton>
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? { textDecoration: "none", borderBottom: "1px solid red" }
              : { color: "black", textDecoration: "none" }
          }
          to={"/inout/expense"}
        >
          <SideButton>{"지출"}</SideButton>
        </NavLink>
      </NavLinkContainer>

      {
        <div>
          <DataGrid
            columns={
              loc.pathname === "/inout/income" ? incomeColumns : expenseColumns
            }
            rows={rows}
            rowGetter={(i) => rows[i]}
            rowKeyGetter={rowKeyGetter}
            rowsCount={rows.length}
            onRowsChange={setRows}
            onRowClick={(data) => {
              console.log(data);
            }}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
          />
          <button onClick={createNewRow}>Add</button>
          <button onClick={saveData}>저장</button>
          <button onClick={deleteData}>삭제</button>
        </div>
      }
    </div>
  );
}

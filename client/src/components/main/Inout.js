import React, { useState, useEffect } from "react";

import "react-data-grid/lib/styles.css";
import DataGrid, { SelectColumn, textEditor } from "react-data-grid";
import dropDownEditor from "../../editor/dropDownEditor";
import DateEditor from "../../editor/DateEditor";

import { NavLink, useLocation } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

import { useQuery, useMutation, useQueryClient } from "react-query";
import PacmanLoader from "react-spinners/PacmanLoader";

const INCOME_API_URL = "http://localhost:5000/income";
const EXPENSE_API_URL = "http://localhost:5000/expense";

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

let newRowData = [];

let num = newRowData.length;
export default function Inout() {
  const [rows, setRows] = useState([]); // 나중에 빈배열로 처리
  const [selectedRows, setSelectedRows] = useState(() => new Set());
  const loc = useLocation();
  const queryClient = useQueryClient();

  async function getData() {
    let path = loc.pathname;
    let newData = [];
    if (path === "/inout/income") {
      const res = await axios.get(INCOME_API_URL, {
        headers: { "Content-Type": "application/json" },
      });
      // console.log(res.data.income);
      const incomeData = res.data.income;
      newData = incomeData;
      // ? incomeData.map((item) => {
      //     return {
      //       ...item,
      //       date: item.incomeDate,
      //       category: item.incomeCategoryName,
      //     };
      //   })
      // : [];
    } else if (path === "/inout/expense") {
      const res = await axios.get(EXPENSE_API_URL, {
        headers: { "Content-Type": "application/json" },
      });
      // console.log(res.data.expense);
      const expenseData = res.data.expense;
      // console.log(expenseData);
      // setRows(expenseData);
      newData = expenseData;
      // ? expenseData.map((item) => {
      //     return {
      //       ...item,
      //       date: item.expenseDate,
      //       category: item.expenseCategoryName,
      //     };
      //   })
      // : [];

      // setRows(...rows, [0].expenseData
    }
    setRows(newData);
    return newData;
  }

  function rowKeyGetter(row) {
    const id = loc.pathname === "/inout/income" ? row.incomeId : row.expenseId;
    return id;
  }
  // useEffect(() => {
  //   // 데이터 불러오기
  //   getData(); // newRowData에 받은 데이터 저장한 후 저장 할때 newRowData를 서버에 보내면 될듯
  // }, [loc]);

  function createNewRow() {
    const newIncomeData = {
      incomeId: rows[rows.length]?.imcomeId,
      incomeDate: "",
      incomeItem: "",
      incomeAmount: "",
      incomeCategoryName: "",
      incomeMemo: "",
    };

    const newExpenseData = {
      expenseId: rows[rows.length]?.expenseId,
      expenseDate: "",
      expenseItem: "",
      expenseCash: "",
      expenseCard: "",
      expenseCategoryName: "",
      expenseMemo: "",
    };

    let newData =
      loc.pathname === "/inout/income" ? newIncomeData : newExpenseData;

    setRows([...rows, newData]);
    // newRowData.push(newData);
    console.log("data", newRowData);
  }

  const saveDataMutation = useMutation(
    async (rowData) => {
      const data =
        loc.pathname === "/inout/income"
          ? { income: rowData }
          : { expense: rowData };
      const api =
        loc.pathname === "/inout/income" ? INCOME_API_URL : EXPENSE_API_URL;
      try {
        const res = await axios.post(api, data, {
          headers: { "Content-Type": "application/json" },
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getInoutData");
      },
    }
  );

  const deleteDataMutation = useMutation(
    async (rowData) => {
      const api =
        loc.pathname === "/inout/income" ? INCOME_API_URL : EXPENSE_API_URL;
      try {
        const res = await axios.delete(api, rowData, {
          headers: { "Content-Type": "application/json" },
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getInoutData");
      },
    }
  );

  const { data, isLoading, refetch } = useQuery(
    ["getInoutData", loc],
    getData,
    {
      staleTime: Infinity,
    }
  );

  function onSaveData() {
    console.log("saved");
    console.log("saved", rows);
    saveDataMutation.mutate(rows);
  }
  function onDeleteData() {
    console.log("deleted");

    // console.log([...selectedRows]);
    deleteDataMutation.mutate(selectedRows);
    const newRows = rows.slice();
    const filteredRow = newRows.filter((row, idx) => {
      const id =
        loc.pathname === "/inout/income" ? row.incomeId : row.expenseId;
      return !selectedRows.has(id);
    });
    console.log("filtered", filteredRow);
    // setRows(filteredRow);
    // newRowData = filteredRow;
  }

  if (isLoading) return <PacmanLoader color="#36d7b7" />;
  console.log(isLoading, data);
  // setRows(data);
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
          <button onClick={onSaveData}>저장</button>
          <button onClick={onDeleteData}>삭제</button>
        </div>
      }
    </div>
  );
}

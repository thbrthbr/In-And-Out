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

const columns = [
  SelectColumn,
  {
    key: "date",
    name: "날짜",
    width: 200,
    formatter(props) {
      return <>{props.row.date}</>;
    },
    editor: DateEditor,
  },
  {
    key: "history",
    name: "사용내역",
    editor: textEditor,
  },
  {
    key: "cash",
    name: "현금",
    editor: textEditor,
  },
  {
    key: "card",
    name: "카드",
    editor: textEditor,
  },
  {
    key: "category",
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
    key: "memo",
    name: "메모",
    width: 500,
    editor: textEditor,
  },
];

let dataRow = [
  {
    id: 1,
    date: "10/6/2022",
    history: "Lasagne",
    cash: "4000",
    card: "32000",
    category: "식비",
    memo: "good",
  },
];

function rowKeyGetter(row) {
  return row.id;
}

function getData() {
  console.log("getdata");
}

let num = dataRow.length;
export default function Inout() {
  const [rows, setRows] = useState(dataRow); // 나중에 빈배열로 처리
  const [selectedRows, setSelectedRows] = useState(() => new Set());
  const loc = useLocation();

  useEffect(() => {
    // 데이터 불러오기
    getData(); // dataRow에 받은 데이터 저장한 후 저장 할때 dataRow를 서버에 보내면 될듯
  }, [loc.pathname]);

  function createNewRow() {
    const newData = {
      id: num++,
      date: "",
      history: "",
      cash: "",
      card: "",
      category: "",
      memo: "",
    };
    setRows([...rows, newData]);
    console.log(selectedRows);
    dataRow.push(newData); // 요렇게 하면 다른 화면 이동 후에도 저장가능한듯?
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
            columns={columns}
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

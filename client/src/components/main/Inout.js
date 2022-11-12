import React, { useState } from "react";

import "react-data-grid/lib/styles.css";
import DataGrid, { SelectColumn, textEditor } from "react-data-grid";
import DropDownEditor from "../../editor/dropDownEditor";
import DateEditor from "../../editor/DateEditor";

import axios from "axios";

import { startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns";

import DateHeader from "../common/DateHeader";

import Button from "@mui/material/Button";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import TabPanel from "./TabPanel";

import { useQuery, useMutation, useQueryClient } from "react-query";
import PacmanLoader from "react-spinners/PacmanLoader";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCategoryDropDownItemStore } from "../../store/store.js";

const INCOME_API_URL = `${process.env.REACT_APP_API_URL}/api/income`;
const EXPENSE_API_URL = `${process.env.REACT_APP_API_URL}/api/expense`;

const incomeColumns = [
  SelectColumn,
  {
    key: "incomeDt",
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
    width: 200,
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
    editor: DropDownEditor,
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
    key: "expenseDt",
    name: "날짜",
    width: 200,
    formatter(props) {
      return <>{props.row.date}</>;
    },
    editor: DateEditor,
  },
  {
    key: "expenseItem",
    width: 200,
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
    editor: DropDownEditor,
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabSelected = Object.freeze({
  INCOME: 0,
  EXPENSE: 1,
});

let currentMonth = new Date();

let incomeCategoryList = [];
let expenseCategoryList = [];
let prevRows = [];

export default function Inout() {
  const [rows, setRows] = useState([]); // 나중에 빈배열로 처리
  const [selectedRows, setSelectedRows] = useState(() => new Set());
  const queryClient = useQueryClient();
  const [tabValue, setTabValue] = useState(0);
  const { categoryItemList, setCategoryItemList } =
    useCategoryDropDownItemStore();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const setParam = () => {
    params.startDt = formatDate(startOfMonth(currentMonth));
    params.endDt = formatDate(endOfMonth(currentMonth));
  };

  const setParamAndRefetch = () => {
    setParam();
    refetch();
  };

  const prevMonth = () => {
    currentMonth = subMonths(currentMonth, 1);
    setParamAndRefetch();
  };
  const nextMonth = () => {
    currentMonth = addMonths(currentMonth, 1);
    setParamAndRefetch();
  };

  async function getInoutDataFrom(url, params) {
    try {
      const res = await axios.get(
        `${url}?endDt=${params.endDt}&startDt=${params.startDt}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  const setInoutDataWith = (data) => {
    switch (tabValue) {
      case TabSelected.INCOME:
        incomeCategoryList = data.incomeCategoryDtoList
          .map((item) => item.detailIncomeCategoryDtoList)
          .reduce((acc, cur) => [...acc, ...cur]);
        const incomeCategoryNames = incomeCategoryList.map(
          (item) => item.detailIncomeCategoryName
        );
        console.log(incomeCategoryList);

        setCategoryItemList(["", ...incomeCategoryNames]);

        const incomeData = data.incomeDtoList.map((item) => {
          item.date = item.incomeDt;
          item.category = incomeCategoryList.find(
            (category) =>
              category.detailIncomeCategoryId === item.detailIncomeCategoryId
          ).detailIncomeCategoryName;
          return item;
        });

        prevRows = incomeData;
        setRows(incomeData);
        break;
      case TabSelected.EXPENSE:
        expenseCategoryList = data.expenseCategoryDtos
          .map((item) => item.detailExpenseCategoryDtos)
          .reduce((acc, cur) => [...acc, ...cur]);
        const expenseCategoryNames = expenseCategoryList.map(
          (item) => item.detailExpenseCategoryName
        );

        setCategoryItemList(["", ...expenseCategoryNames]);

        const expenseData = data.expenseDtos.map((item) => {
          item.date = item.expenseDt;
          item.category = expenseCategoryList.find(
            (category) =>
              category.detailExpenseCategoryId === item.detailExpenseCategoryId
          ).detailExpenseCategoryName;
          return item;
        });

        prevRows = expenseData;
        setRows(expenseData);
        break;
      default:
        break;
    }
  };

  function rowKeyGetter(row) {
    let id = tabValue === TabSelected.INCOME ? row.incomeId : row.expenseId;
    if (id === undefined) {
      id = row.key;
    }
    // console.log("id", id);
    return id;
  }

  function createNewRow() {
    const newIncomeData = {
      // incomeId: "",
      incomeDt: "",
      incomeItem: "",
      incomeAmount: "",
      detailIncomeCategoryId: "",
      incomeMemo: "",
      key: Math.floor(Math.random() * 1000),
    };

    const newExpenseData = {
      // expenseId: "",
      expenseDt: "",
      expenseItem: "",
      expenseCash: "",
      expenseCard: "",
      detailExpenseCategoryId: "",
      expenseMemo: "",
      key: Math.floor(Math.random() * 1000),
    };
    let newData =
      tabValue === TabSelected.INCOME ? newIncomeData : newExpenseData;

    setRows([...rows, newData]);
  }

  const saveDataMutation = useMutation(
    async (rowData) => {
      // const data = rowData
      //   .filter((item) => {
      //     return tabValue === TabSelected.INCOME
      //       ? item.incomeId === undefined
      //       : item.expenseId === undefined;
      //   })
      //   .map((ele) => {
      //     return tabValue === TabSelected.INCOME
      //       ? { ...ele, incomeDt: ele.date }
      //       : { ...ele, expenseDt: ele.date };
      //   });

      // switch (tabValue) {
      //   case TabSelected.INCOME:
      //     data.forEach(
      //       (item) =>
      //         (item.detailIncomeCategoryId = incomeCategoryList.find(
      //           (category) =>
      //             category.detailIncomeCategoryName === item.category
      //         ).detailIncomeCategoryId)
      //     );
      //     break;
      //   case TabSelected.EXPENSE:
      //     data.forEach(
      //       (item) =>
      //         (item.detailExpenseCategoryId = expenseCategoryList.find(
      //           (category) =>
      //             category.detailExpenseCategoryName === item.category
      //         ).detailExpenseCategoryId)
      //     );
      //     break;
      //   default:
      //     break;
      // }

      // const data = [rowData]; //tabValue === TabSelected.INCOME ? { [rowData } : { rowData };
      let diff = rowData.filter((ele) => !prevRows.includes(ele));
      console.log(diff);
      diff = diff.map((ele) =>
        TabSelected.INCOME
          ? { ...ele, incomeDt: ele.date }
          : { ...ele, expenseDt: ele.date }
      );
      switch (tabValue) {
        case TabSelected.INCOME:
          diff.forEach(
            (item) =>
              (item.detailIncomeCategoryId = incomeCategoryList.find(
                (category) =>
                  category.detailIncomeCategoryName === item.category
              ).detailIncomeCategoryId)
          );
          break;
        case TabSelected.EXPENSE:
          diff.forEach(
            (item) =>
              (item.detailExpenseCategoryId = expenseCategoryList.find(
                (category) =>
                  category.detailExpenseCategoryName === item.category
              ).detailExpenseCategoryId)
          );
          break;
        default:
          break;
      }
      console.log(rowData);
      // console.log(data);
      console.log(diff);
      const api =
        tabValue === TabSelected.INCOME ? INCOME_API_URL : EXPENSE_API_URL;

      const res = await axios.post(api, diff, {
        withCredentials: true,
      });
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getInoutData");
      },
      onError: () => {},
    }
  );

  const deleteDataMutation = useMutation(
    async (itemIds) => {
      console.log("ids", itemIds);
      const api =
        tabValue === TabSelected.INCOME ? INCOME_API_URL : EXPENSE_API_URL;
      try {
        const res = await axios.delete(
          api,
          { data: itemIds },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
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

  function onSaveData() {
    saveDataMutation.mutate(rows);
  }

  function onDeleteData() {
    console.log("deleted");
    const newRows = rows.slice();
    const filteredRow = newRows.filter((row, idx) => {
      const id = tabValue === TabSelected.INCOME ? row.incomeId : row.expenseId;
      return selectedRows.has(id);
    });
    const itemIds = filteredRow.reduce((acc, cur) => {
      tabValue === TabSelected.INCOME
        ? acc.push({ incomeId: cur.incomeId })
        : acc.push({ expenseId: cur.expenseId });
      return acc;
      // return TabSelected.INCOME ? item.incomeId : item.expenseId;
    }, []);
    deleteDataMutation.mutate(itemIds);
  }

  const handleInoutData = async (url, params) => {
    const fetchedData = await getInoutDataFrom(url, params);
    setInoutDataWith(fetchedData);
  };

  const params = {};
  setParam();
  const { isLoading, refetch } = useQuery(["getInoutData", tabValue], () => {
    handleInoutData(
      tabValue === TabSelected.INCOME ? INCOME_API_URL : EXPENSE_API_URL,
      params
    );
  });

  if (isLoading)
    return (
      <PacmanLoader
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        color="#36d7b7"
        size={50}
      />
    );

  return (
    <div>
      <ToastContainer pauseOnHover={false} />
      <Grid container spacing={0}>
        <Grid xs={12}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="periodic report"
              >
                <Tab label="수입" {...a11yProps(0)} />
                <Tab label="지출" {...a11yProps(1)} />
              </Tabs>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <TabPanel value={tabValue} index={0}>
        <DateHeader
          type={"month"}
          currentTime={currentMonth}
          prev={prevMonth}
          next={nextMonth}
        />
        <DataGrid
          columns={incomeColumns}
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
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <DateHeader
          type={"month"}
          currentTime={currentMonth}
          prev={prevMonth}
          next={nextMonth}
        />
        <DataGrid
          columns={expenseColumns}
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
      </TabPanel>
      <Button
        variant="text"
        size="large"
        onClick={() => setTimeout(createNewRow, 500)}
      >
        +
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" onClick={onSaveData}>
          저장
        </Button>
        <Button variant="outlined" onClick={onDeleteData}>
          삭제
        </Button>
      </Box>
    </div>
  );
}

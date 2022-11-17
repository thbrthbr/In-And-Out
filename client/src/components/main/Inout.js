import React, { useState, useRef } from "react";

import "react-data-grid/lib/styles.css";
import DataGrid, { SelectColumn, textEditor } from "react-data-grid";
import DropDownEditor from "../../editor/dropDownEditor";
import DateEditor from "../../editor/DateEditor";

import axios from "axios";

import {
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  getMonth,
  getYear,
  getDate,
} from "date-fns";

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
import { isVisible } from "@testing-library/user-event/dist/utils";

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
    name: "수입내역",
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
    width: 200,
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
    width: 580,
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
    width: 200,
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
  const { categoryItemList, setCategoryItemList, setMainCategoryList } =
    useCategoryDropDownItemStore();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const gridRef = useRef(null);

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
    let categoryItemList = {};
    switch (tabValue) {
      case TabSelected.INCOME:
        incomeCategoryList = data.incomeCategoryDtoList
          .map((item) => item.detailIncomeCategoryDtoList)
          .reduce((acc, cur) => [...acc, ...cur]);
        // const incomeCategoryNames = incomeCategoryList.map(
        //   (item) => item.detailIncomeCategoryName
        // );
        // const mainIncomeCategoryNames = data.incomeCategoryDtoList.map(
        //   (item) => item.incomeCategoryName
        // );
        // console.log(data.incomeCategoryDtoList);
        data.incomeCategoryDtoList.forEach((item) => {
          categoryItemList[item.incomeCategoryName] =
            item.detailIncomeCategoryDtoList.map(
              (detail) => detail.detailIncomeCategoryName
            );
        });
        console.log(categoryItemList);

        // setCategoryItemList(["", ...incomeCategoryNames]);
        setMainCategoryList(categoryItemList);

        const incomeData = data.incomeDtoList.map((item, i) => {
          item.date = item.incomeDt;
          item.category = incomeCategoryList.find(
            (category) =>
              category.detailIncomeCategoryId === item.detailIncomeCategoryId
          ).detailIncomeCategoryName;
          item.year = getYear(new Date(item.date));
          item.month = getMonth(new Date(item.date));
          item.rowNum = i;
          item.totalRow = data.incomeDtoList.length;
          return item;
        });

        prevRows = incomeData;
        setRows(incomeData);
        break;
      case TabSelected.EXPENSE:
        expenseCategoryList = data.expenseCategoryDtos
          .map((item) => item.detailExpenseCategoryDtos)
          .reduce((acc, cur) => [...acc, ...cur]);

        console.log(data);
        data.expenseCategoryDtos.forEach((item) => {
          categoryItemList[item.expenseCategoryName] =
            item.detailExpenseCategoryDtos.map(
              (detail) => detail.detailExpenseCategoryName
            );
        });
        console.log(categoryItemList);

        // setCategoryItemList(["", ...incomeCategoryNames]);
        setMainCategoryList(categoryItemList);

        const expenseData = data.expenseDtos.map((item, i) => {
          item.date = item.expenseDt;
          item.category = expenseCategoryList.find(
            (category) =>
              category.detailExpenseCategoryId === item.detailExpenseCategoryId
          ).detailExpenseCategoryName;
          item.year = getYear(new Date(item.date));
          item.month = getMonth(new Date(item.date));
          item.rowNum = i;
          item.totalRow = data.expenseDtos.length;
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
    return id;
  }

  function createNewRow() {
    const newIncomeData = {
      incomeDt: "",
      incomeItem: "",
      incomeAmount: "0",
      detailIncomeCategoryId: "",
      incomeMemo: "",
      month: getMonth(currentMonth),
      year: getYear(currentMonth),
      key: Math.floor(Math.random() * 1000),
    };

    const newExpenseData = {
      expenseDt: "",
      expenseItem: "",
      expenseCash: "0",
      expenseCard: "0",
      detailExpenseCategoryId: "",
      expenseMemo: "",
      month: getMonth(currentMonth),
      year: getYear(currentMonth),
      key: Math.floor(Math.random() * 1000),
    };
    let newData =
      tabValue === TabSelected.INCOME ? newIncomeData : newExpenseData;

    setRows([...rows, newData]);
    scrollToBottom();
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      gridRef.current.scrollToRow(rows.length);
    }, 50);
  };

  const isNumber = (value) => {
    return typeof value === "number" && isFinite(value);
  };

  const saveDataMutation = useMutation(
    async (rowData) => {
      let diff = rowData.filter((ele) => !prevRows.includes(ele));

      diff = diff.map((ele) =>
        tabValue === TabSelected.INCOME
          ? { ...ele, incomeDt: ele.date }
          : { ...ele, expenseDt: ele.date }
      );

      switch (tabValue) {
        case TabSelected.INCOME:
          diff.forEach((item) => {
            item.detailIncomeCategoryId = incomeCategoryList.find(
              (category) => category.detailIncomeCategoryName === item.category
            ).detailIncomeCategoryId;
            if (!isNumber(item.incomeAmount / 1)) item.incomeAmount = "0";
            item.incomeAmount = Math.abs(item.incomeAmount);
          });
          break;
        case TabSelected.EXPENSE:
          diff.forEach((item) => {
            item.detailExpenseCategoryId = expenseCategoryList.find(
              (category) => category.detailExpenseCategoryName === item.category
            ).detailExpenseCategoryId;
            if (!isNumber(item.expenseCard / 1)) item.expenseCard = "0";
            if (!isNumber(item.expenseCash / 1)) item.expenseCash = "0";
            item.expenseCard = Math.abs(item.expenseCard);
            item.expenseCash = Math.abs(item.expenseCash);
          });
          break;
        default:
          break;
      }

      const api =
        tabValue === TabSelected.INCOME ? INCOME_API_URL : EXPENSE_API_URL;

      const res = await axios.post(api, diff, {
        withCredentials: true,
      });
      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("저장이 성공적으로 완료 되었습니다!", {
          position: toast.POSITION.TOP_CENTER,
        });
        queryClient.invalidateQueries("getInoutData");
      },
      onError: (err) => {
        if (err instanceof TypeError) {
          toast.warn("누락된 항목이 있어 저장에 실패 하였습니다!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.warn("저장에 실패 하였습니다!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      },
    }
  );

  const deleteDataMutation = useMutation(
    async (itemIds) => {
      console.log("ids", itemIds);
      const api =
        tabValue === TabSelected.INCOME ? INCOME_API_URL : EXPENSE_API_URL;
      try {
        const res = await axios.delete(api, {
          data: itemIds,
          withCredentials: true,
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
    }, []);
    deleteDataMutation.mutate(itemIds);
  }

  const handleInoutData = async (url, params) => {
    const fetchedData = await getInoutDataFrom(url, params);
    setInoutDataWith(fetchedData);
  };

  const params = {};
  setParam();
  const { isLoading, refetch, isFetching } = useQuery(
    ["getInoutData", tabValue],
    () => {
      handleInoutData(
        tabValue === TabSelected.INCOME ? INCOME_API_URL : EXPENSE_API_URL,
        params
      );
    },
    { cacheTime: 0, refetchOnWindowFocus: false }
  );

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

  if (isFetching)
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
          style={{ height: 700 }}
          ref={gridRef}
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
          style={{ height: 700 }}
          ref={gridRef}
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

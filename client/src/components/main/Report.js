import { useRef, useState, useEffect } from "react";
import ChartCanvas from "./ChartCanvas";

import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import DateHeader from "../common/DateHeader";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import TabPanel from "./TabPanel";
import RadioButton from "./RadioButton";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

import {
  addMonths,
  subMonths,
  subYears,
  startOfMonth,
  endOfMonth,
  format,
} from "date-fns";

import axios from "axios";

import { useQuery } from "react-query";
import PacmanLoader from "react-spinners/PacmanLoader";

import {
  doughnutConfig,
  barConfig,
  lineConfig,
} from "../../utils/graphOptions";

import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Legend,
  DoughnutController,
  ArcElement,
  PieController,
  LineController,
  PointElement,
  LineElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Legend,
  DoughnutController,
  ArcElement,
  PieController,
  ChartDataLabels,
  LineController,
  PointElement,
  LineElement
);

const drawChart = (ctx, config) => {
  return new Chart(ctx, config);
};

const graphTypeOptions = [
  { value: "bar", label: "막대형" },
  { value: "doughnut", label: "파이형" },
];
const yearlyOptions = [
  { value: "table", label: "표" },
  { value: "chart", label: "그래프" },
];
const costOptions = [
  { value: "income", label: "수입" },
  { value: "expense", label: "지출" },
];

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

let columns = [
  { key: "category", name: "내용", width: 200 },
  { key: "jan", name: "1월" },
  { key: "feb", name: "2월" },
  { key: "mar", name: "3월" },
  { key: "apr", name: "4월" },
  { key: "may", name: "5월" },
  { key: "jun", name: "6월" },
  { key: "jul", name: "7월" },
  { key: "aug", name: "8월" },
  { key: "sep", name: "9월" },
  { key: "oct", name: "10월" },
  { key: "nov", name: "11월" },
  { key: "dec", name: "12월" },
  { key: "sum", name: "합계" },
];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabSelected = Object.freeze({
  MONTH: 0,
  YEAR: 1,
});

let currentMonth = new Date();

let categoryRows = [];

export default function Report() {
  const canvasRef = useRef(null);

  const [graphTypeOption, setgraphTypeOption] = useState("bar");
  const [yearlyOption, setYearlyOption] = useState("chart");
  const [costOption, setCostOption] = useState("income");
  const [tabValue, setTabValue] = useState(0);

  const [rows, setRows] = useState([]);
  const [category, setCategory] = useState("");
  const [startMonth, setStartMonth] = useState(new Date());

  const handleDropdownCategoryChange = (event) => {
    let newData = [];
    categoryRows.forEach((row) => {
      if (row.category === event.target.value) {
        newData = Object.entries(row)
          .slice(1, 13)
          .map((entry) => entry[1]);
        lineConfig.data.datasets[0].data = newData;
      }
    });

    setCategory(event.target.value);
  };

  const downloadToExcel = async (type) => {
    let url = "";
    switch (type) {
      case "income":
      case "expense":
        url = `${process.env.REACT_APP_API_URL}/api/excel/${type}?startDt=${params.startDt}&endDt=${params.endDt}`;
        break;
      case "year":
        url = `${process.env.REACT_APP_API_URL}/api/excel/${type}?startDt=${params.startDt}`;
        break;
      default:
        break;
    }

    try {
      const obj = {
        yearlyExcelDtoList: rows,
      };
      await axios(url, {
        method: type === "year" ? "POST" : "GET",
        data: type === "year" ? obj.yearlyExcelDtoList : {},
        responseType: "blob", // important
        withCredentials: true,
      }).then((response) => {
        console.log(response);
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: response.headers["content-type"] })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${type}-report-${params.startDt}-${params.endDt}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        return response;
      });
    } catch (err) {
      console.log(err.response.data);
    }
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

  const checkboxMap = {
    monthly(e) {
      setgraphTypeOption(e.target.value);
    },
    yearly(e) {
      setYearlyOption(e.target.value);
    },
    cost(e) {
      setCostOption(e.target.value);
    },
  };

  const handleCheckbox = (checkboxType, e) => {
    checkboxMap[checkboxType](e);
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      handleCheckbox(e.target.name, e);
    }
  };

  const getMonthlyData = (fetchedData) => {
    const newData = [];
    const newLabel = [];
    console.log(fetchedData);
    fetchedData.sort((a, b) => b.categorySum - a.categorySum);
    fetchedData.forEach((element, idx) => {
      newData[idx] = Math.round(element.categoryRatio * 100);
      newLabel[idx] = `${element.category} - ${element.categorySum}`;
    });

    return [newData, newLabel];
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const setParam = () => {
    switch (tabValue) {
      case TabSelected.MONTH:
        params.startDt = formatDate(startOfMonth(currentMonth));
        params.endDt = formatDate(endOfMonth(currentMonth));
        break;
      case TabSelected.YEAR:
        const startYear = format(startMonth, "yyyy");
        const startMon = startMonth;
        const startDay = format(startOfMonth(startMon), "dd");
        const endYear = format(subYears(startMonth, 1), "yyyy");
        const endMon = subMonths(startMonth, 1);
        const endDay = format(endOfMonth(endMon), "dd");

        params.endDt = `${startYear}-${format(endMon, "MM")}-${endDay}`;
        params.startDt = `${endYear}-${format(startMon, "MM")}-${startDay}`;

        break;
      default:
        break;
    }
  };

  const getReportDataFrom = async (url, params) => {
    try {
      const res = await axios(
        `${url}?endDt=${params.endDt}&startDt=${params.startDt}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const createMainRows = (categoryTitle) => {
    let obj = {};
    columns.forEach((column) => {
      if (column.key === "category") obj[column.key] = categoryTitle;
      else obj[column.key] = 0;
    });

    return obj;
  };

  const renderTotalYearReportOnTableAndGraph = (data) => {
    console.log(data);

    const yearlyIncomeMonthSums = data.incomeReportList.map(
      (data) => data.monthlySum
    );

    const yearlyExpenseMonthSums = data.expenseReportList.map(
      (data) => data.monthlySum
    );

    const yearlyTotalMonthSums = yearlyIncomeMonthSums.map(
      (x, y) => x - yearlyExpenseMonthSums[y]
    );

    lineConfig.data.datasets[0].data = yearlyTotalMonthSums;

    let incomeCategories = {};
    let expenseCategories = {};
    const tempRows = [];

    tempRows.push(createMainRows("수입지출합계"));
    tempRows.push(createMainRows("수입합계"));

    const yearlyIncomeReport = data.incomeReportList.map((data) =>
      data.incomeReport ? data.incomeReport : 0
    );

    yearlyIncomeReport.forEach((report, idx) => {
      if (report.length !== 0) {
        for (let i = 0; i < report.length; i++) {
          if (!incomeCategories[report[i].category])
            incomeCategories[report[i].category] = new Array(14).fill(0);
          incomeCategories[report[i].category][idx + 1] = report[i].categorySum;
        }
      }
    });

    for (let key in incomeCategories) {
      let idx = 1;
      let sum = 0;
      const row = {};
      for (let item of columns) {
        if (item.key === "category") row[item.key] = key;
        else if (item.key === "sum") {
          row[item.key] = sum;
          tempRows[1][item.key] += row[item.key];
        } else {
          row[item.key] = incomeCategories[key][idx++];
          tempRows[1][item.key] += row[item.key];
          sum += row[item.key];
        }
      }
      tempRows.push(row);
    }

    tempRows.push(createMainRows("지출합계"));
    let expenseSumRowPos = tempRows.length - 1;

    const yearlyExpenseReport = data.expenseReportList.map((data) =>
      data.expenseReport ? data.expenseReport : 0
    );

    yearlyExpenseReport.forEach((report, idx) => {
      if (report.length !== 0) {
        for (let i = 0; i < report.length; i++) {
          if (!expenseCategories[report[i].category])
            expenseCategories[report[i].category] = new Array(14).fill(0);
          expenseCategories[report[i].category][idx + 1] =
            report[i].categorySum;
        }
      }
    });

    for (let key in expenseCategories) {
      let idx = 1;
      let sum = 0;
      const row = {};
      for (let item of columns) {
        if (item.key === "category") row[item.key] = key;
        else if (item.key === "sum") {
          row[item.key] = sum;
          tempRows[expenseSumRowPos][item.key] += row[item.key];
        } else {
          row[item.key] = expenseCategories[key][idx++];
          tempRows[expenseSumRowPos][item.key] += row[item.key];
          sum += row[item.key];
        }
      }
      tempRows.push(row);
    }

    const obj = {};
    for (const property in tempRows[1]) {
      obj[property] =
        tempRows[1][property] - tempRows[expenseSumRowPos][property];
    }
    obj.category = "수입지출합계";
    tempRows[0] = obj;
    console.log(tempRows);
    categoryRows = tempRows.slice();
    setRows(tempRows);
  };

  const setReportDataWith = (data) => {
    switch (tabValue) {
      case TabSelected.MONTH:
        const [newData, newLabel] = getMonthlyData(data);
        console.log(newData, newLabel);
        doughnutConfig.data.labels = newLabel;
        doughnutConfig.data.datasets[0].data = newData;
        console.log(newData);
        barConfig.data.labels = newLabel;
        barConfig.data.datasets[0].data = newData;
        break;
      case TabSelected.YEAR:
        const yearLabel = [];
        let month = startMonth;
        for (let i = 1; i <= 12; i++) {
          const curMonth = month.getMonth();
          yearLabel.push(curMonth + 1);

          columns[i].key = months[curMonth];
          columns[i].name = `${curMonth + 1}월`;
          month = addMonths(month, 1);
        }

        lineConfig.data.labels = yearLabel;

        renderTotalYearReportOnTableAndGraph(data);

        break;
      default:
        break;
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    let charId;
    if (canvasRef.current) {
      charId = drawChart(
        canvasRef.current,
        tabValue === TabSelected.MONTH
          ? graphTypeOption === "bar"
            ? barConfig
            : doughnutConfig
          : lineConfig
      );

      canvasRef.current.onclick = function (evt) {
        const points = charId.getElementsAtEventForMode(
          evt,
          "nearest",
          { intersect: true },
          true
        );

        if (points.length) {
          const firstPoint = points[0];
          const label = charId.data.labels[firstPoint.index];
          const slabel = charId.data.datasets[firstPoint.datasetIndex].label;
          const value =
            charId.data.datasets[firstPoint.datasetIndex].data[
              firstPoint.index
            ];
          console.log(label, slabel, value);
        }
      };
    }
    return () => {
      charId && charId.destroy();
    };
  });

  let API_URL =
    tabValue === TabSelected.MONTH
      ? `${process.env.REACT_APP_API_URL}/api/report/month/${costOption}`
      : `${process.env.REACT_APP_API_URL}/api/report/year`;
  const params = {};
  setParam();

  const handleReportData = async (url, params) => {
    const fetchedData = await getReportDataFrom(url, params);

    setReportDataWith(fetchedData);
  };

  const { data, isLoading, refetch } = useQuery(
    [
      "getMonthOrYearReportData",
      costOption,
      tabValue,
      startMonth,
      yearlyOption,
    ],
    () => handleReportData(API_URL, params),
    { staleTime: 0, cacheTime: 0, refetchOnWindowFocus: false }
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

  return (
    <Grid container spacing={0}>
      <Grid xs={12}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="periodic report"
            >
              <Tab label="월간 보고서" {...a11yProps(0)} />
              <Tab label="연간 보고서" {...a11yProps(1)} />
            </Tabs>
          </Box>
        </Box>
      </Grid>

      <TabPanel value={tabValue} index={0}>
        <Grid display="flex" justifyContent="flex-end" sx={{ mb: 5, mt: -5 }}>
          <RadioButton
            legend={"차트"}
            buttonOptions={graphTypeOptions}
            checkedOption={graphTypeOption}
            buttonName={"monthly"}
            labelPlacement={"end"}
            handleChange={handleCheckboxChange}
          />

          <RadioButton
            legend={"항목"}
            buttonOptions={costOptions}
            checkedOption={costOption}
            buttonName={"cost"}
            labelPlacement={"end"}
            handleChange={handleCheckboxChange}
          />
        </Grid>
        <DateHeader
          type={"month"}
          currentTime={currentMonth}
          prev={prevMonth}
          next={nextMonth}
        />
        <ChartCanvas width={1000} height={500} ref={canvasRef} />
        <Box
          sx={{
            mt: 10,
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          {costOption === "income" && (
            <Button onClick={() => downloadToExcel("income")}>
              엑셀 다운로드 (수입)
            </Button>
          )}
          {costOption === "expense" && (
            <Button onClick={() => downloadToExcel("expense")}>
              엑셀 다운로드 (지출)
            </Button>
          )}
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid
          display="flex"
          justifyContent="flex-end"
          sx={{ mb: 5, mt: -5 }}
          alignItems="baseline"
        >
          <RadioButton
            legend={"형식"}
            buttonOptions={yearlyOptions}
            checkedOption={yearlyOption}
            buttonName={"yearly"}
            labelPlacement={"end"}
            handleChange={handleCheckboxChange}
          />
        </Grid>
        <DatePicker
          locale={ko}
          selected={startMonth}
          onChange={(date) => setStartMonth(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
        <DateHeader
          type={"year"}
          currentTime={startMonth}
          prev={setStartMonth}
          next={setStartMonth}
        />
        {yearlyOption === "table" && (
          <div>
            <DataGrid columns={columns} rows={rows} height={500} />
            <Stack direction="row" spacing={2}>
              <Button onClick={() => downloadToExcel("year")}>
                엑셀 다운로드 (연간 보고서)
              </Button>
            </Stack>
          </div>
        )}
        {yearlyOption === "chart" && (
          <>
            <span>
              <FormControl sx={{ ml: 70, minWidth: 120 }}>
                <InputLabel id="category-select-label">카테고리</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={category}
                  label="Age"
                  autoWidth
                  onChange={handleDropdownCategoryChange}
                >
                  {categoryRows.map((row) => {
                    return (
                      <MenuItem key={row.category} value={row.category}>
                        {row.category}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </span>
            <div>
              <ChartCanvas width={1000} height={500} ref={canvasRef} />
            </div>
          </>
        )}
      </TabPanel>
    </Grid>
  );
}

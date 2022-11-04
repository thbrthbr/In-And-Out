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

import TabPanel from "./TabPanel";
import RadioButton from "./RadioButton";

import {
  addMonths,
  subMonths,
  addYears,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
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

const columns = [
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
let currentYear = new Date();

let categoryRows = [];

export default function Report() {
  const canvasRef = useRef(null);

  const [graphTypeOption, setgraphTypeOption] = useState("bar");
  const [yearlyOption, setYearlyOption] = useState("chart");
  const [costOption, setCostOption] = useState("income");
  const [tabValue, setTabValue] = useState(0);

  const [rows, setRows] = useState([]);
  const [category, setCategory] = useState("");

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

  const prevYear = () => {
    currentYear = subYears(currentYear, 1);
    setParamAndRefetch();
  };
  const nextYear = () => {
    currentYear = addYears(currentYear, 1);
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

    fetchedData.forEach((element, idx) => {
      newData[idx] = Math.round(element.categoryRatio);
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
        params.startDt = formatDate(startOfYear(currentYear));
        params.endDt = formatDate(endOfYear(currentYear));
        break;
      default:
        break;
    }
  };

  const getReportDataFrom = async (url, params) => {
    try {
      const res = await axios(url, { params: params });
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const renderTotalYearReportOnGraph = (data) => {
    const yearlyIncomeData = data.incomeReportList.filter(
      (item) => item.year === currentYear.getFullYear()
    );
    const yearlyIncomeMonthSums = yearlyIncomeData.map(
      (data) => data.monthlySum
    );

    const yearlyExpenseData = data.expenseReportList.filter(
      (item) => item.year === currentYear.getFullYear()
    );
    const yearlyExpenseMonthSums = yearlyExpenseData.map(
      (data) => data.monthlySum
    );

    const yearlyTotalMonthSums = yearlyIncomeMonthSums.map(
      (x, y) => x - yearlyExpenseMonthSums[y]
    );

    lineConfig.data.datasets[0].data = yearlyTotalMonthSums;
  };

  // const renderIncomeYearReportOnGraph = (data) => {
  //   const yearlyIncomeData = data.incomeReportList.filter(
  //     (item) => item.year === currentYear.getFullYear()
  //   );
  //   const yearlyIncomeMonthSums = yearlyIncomeData.map(
  //     (data) => data.monthlySum
  //   );
  //   lineConfig.data.datasets[0].data = yearlyIncomeMonthSums;
  // };

  // const renderExpenseYearReportOnGraph = (data) => {
  //   const yearlyExpenseData = data.expenseReportList.filter(
  //     (item) => item.year === currentYear.getFullYear()
  //   );
  //   const yearlyExpenseMonthSums = yearlyExpenseData.map(
  //     (data) => data.monthlySum
  //   );
  //   lineConfig.data.datasets[0].data = yearlyExpenseMonthSums;
  // };

  const createMainRows = (categoryTitle) => {
    let obj = {};
    columns.forEach((column) => {
      if (column.key === "category") obj[column.key] = categoryTitle;
      else obj[column.key] = 0;
    });

    return obj;
  };

  const renderTotalYearReportOnTable = (data) => {
    let incomeCategories = {
      // 주수입: new Array(14).fill(0),
    };
    let expenseCategories = {
      // 주수입: new Array(14).fill(0),
    };
    const tempRows = [];

    tempRows.push(createMainRows("수입지출합계"));

    tempRows.push(createMainRows("수입합계"));

    const yearlyIncomeData = data.incomeReportList.filter(
      (item) => item.year === currentYear.getFullYear()
    );

    const yearlyIncomeReport = yearlyIncomeData.map((data) =>
      data.incomeReport ? data.incomeReport : 0
    );

    yearlyIncomeReport.forEach((report, idx) => {
      // console.log(report);
      if (report.length !== 0) {
        for (let i = 0; i < report.length; i++) {
          //categories[report[i].category][idx + 1] = report[i].categorySum;
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

    const yearlyExpenseData = data.expenseReportList.filter(
      (item) => item.year === currentYear.getFullYear()
    );

    const yearlyExpenseReport = yearlyExpenseData.map((data) =>
      data.expenseReport ? data.expenseReport : 0
    );

    yearlyExpenseReport.forEach((report, idx) => {
      // console.log(report);
      if (report.length !== 0) {
        for (let i = 0; i < report.length; i++) {
          //categories[report[i].category][idx + 1] = report[i].categorySum;
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
    // tempRows[1].map((row, idx) => console.log(row));
    console.log(tempRows);
    categoryRows = tempRows.slice();
    setRows(tempRows);
  };

  // test();
  const setReportDataWith = (data) => {
    switch (tabValue) {
      case TabSelected.MONTH:
        const [newData, newLabel] = getMonthlyData(data);
        console.log(newData, newLabel);
        doughnutConfig.data.labels = newLabel;
        doughnutConfig.data.datasets[0].data = newData;
        barConfig.data.labels = newLabel;
        barConfig.data.datasets[0].data = newData;
        // lineConfig.data.labels = newLabel;
        // lineConfig.data.datasets[0].data = newData;
        break;
      case TabSelected.YEAR:
        // console.log(currentYear.getFullYear());
        const yearLabel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        lineConfig.data.labels = yearLabel;

        let categories = {
          // 주수입: new Array(14).fill(0),
        };

        const yearlyIncomeData = data.incomeReportList.filter(
          (item) => item.year === currentYear.getFullYear()
        );
        const yearlyIncomeMonthSums = yearlyIncomeData.map(
          (data) => data.monthlySum
        );
        // lineConfig.data.datasets[0].data = yearlyIncomeMonthSums;
        // renderIncomeYearReportOnGraph(data);
        renderTotalYearReportOnGraph(data);
        renderTotalYearReportOnTable(data);

        // const yearlyIncomeReport = yearlyIncomeData.map((data) =>
        //   data.incomeReport ? data.incomeReport : 0
        // );

        // yearlyIncomeReport.forEach((report, idx) => {
        //   // console.log(report);
        //   if (report.length !== 0) {
        //     for (let i = 0; i < report.length; i++) {
        //       //categories[report[i].category][idx + 1] = report[i].categorySum;
        //       if (!categories[report[i].category])
        //         categories[report[i].category] = new Array(14).fill(0);
        //       categories[report[i].category][idx + 1] = report[i].categorySum;
        //     }
        //   }
        // });
        // console.log("categories", categories);

        // const tempRows = [];
        // for (let key in categories) {
        //   let idx = 1;
        //   let sum = 0;
        //   const row = {};
        //   for (let item of columns) {
        //     if (item.key === "category") row[item.key] = key;
        //     else if (item.key === "sum") row[item.key] = sum;
        //     else {
        //       row[item.key] = categories[key][idx++];
        //       sum += row[item.key];
        //     }
        //   }
        //   tempRows.push(row);
        // }

        // setRows(tempRows);

        // console.log(yearlyIncomeReport);

        // lineConfig.data.datasets[0].label = ""

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
      ? `/api/report/month/${costOption}`
      : `/api/report/year`;
  const params = {};
  setParam();

  const handleReportData = async (url, params) => {
    const fetchedData = await getReportDataFrom(url, params);

    setReportDataWith(fetchedData);
  };

  const { data, isLoading, refetch } = useQuery(
    ["getMonthReportData", costOption, tabValue],
    () => handleReportData(API_URL, params)
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
        <Grid display="flex" justifyContent="flex-end" sx={{ mb: 5, mt: -10 }}>
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
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid
          display="flex"
          justifyContent="flex-end"
          sx={{ mb: 5, mt: -10 }}
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

        <DateHeader currentTime={currentYear} prev={prevYear} next={nextYear} />
        {yearlyOption === "table" && (
          <div>
            <DataGrid columns={columns} rows={rows} height={500} />
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

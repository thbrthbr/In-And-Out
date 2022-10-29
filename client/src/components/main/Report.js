import { useRef, useState, useEffect } from "react";
import ChartCanvas from "./ChartCanvas";

import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import DateHeader from "../common/DateHeader";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

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
  doughnutOption,
  barOption,
  lineOption,
} from "../../option/graphOptions";

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
  { graph: "bar", label: "막대형" },
  { graph: "doughnut", label: "파이형" },
];
const yearlyOptions = [
  { form: "table", label: "표" },
  { form: "chart", label: "그래프" },
];
const costOptions = [
  { category: "income", label: "수입" },
  { category: "expense", label: "지출" },
];

const columns = [
  { key: "date", name: "기간" },
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

const doughnutConfig = {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
    labels: [],
  },
  options: doughnutOption,
};

const barConfig = {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        axis: "y",
        label: "My First Dataset",
        data: [],
        fill: false,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: barOption,
};

const lineConfig = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "My First Dataset",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  },
  options: lineOption,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const TabSelected = Object.freeze({
  MONTH: 0,
  YEAR: 1,
});

let currentMonth = new Date();
let currentYear = new Date();
const rows = [];

export default function Report() {
  const canvasRef = useRef(null);

  const [graphTypeOption, setgraphTypeOption] = useState("bar");
  const [yearlyOption, setYearlyOption] = useState("chart");
  const [costOption, setCostOption] = useState("income");
  const [tabValue, setTabValue] = useState(0);

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
      newData[idx] = element.category_ratio * 100;
      newLabel[idx] = `${element.category} - ${element.category_sum}`;
    });

    return [newData, newLabel];
  };

  const setParam = () => {
    switch (tabValue) {
      case TabSelected.MONTH:
        params.start_dt = startOfMonth(currentMonth);
        params.end_dt = endOfMonth(currentMonth);
        break;
      case TabSelected.YEAR:
        params.start_dt = startOfYear(currentYear);
        params.end_dt = endOfYear(currentYear);
        break;
      default:
        break;
    }
  };

  const getData = async (url, params) => {
    try {
      const res = await axios(url, { params: params });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const setData = () => {
    switch (tabValue) {
      case TabSelected.MONTH:
        const [newData, newLabel] = getMonthlyData(data[costOption]);
        doughnutConfig.data.labels = newLabel;
        doughnutConfig.data.datasets[0].data = newData;
        barConfig.data.labels = newLabel;
        barConfig.data.datasets[0].data = newData;
        lineConfig.data.labels = newLabel;
        lineConfig.data.datasets[0].data = newData;
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

  const API_URL = "http://localhost:5000/report";
  const params = {};
  setParam();

  const { data, isLoading, refetch } = useQuery(
    ["getReportData", costOption],
    () => getData(API_URL, params)
  );

  if (isLoading) return <PacmanLoader color="#36d7b7" />;
  setData();

  return (
    <div>
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

      <TabPanel value={tabValue} index={0}>
        <FormControl component="fieldset">
          <FormLabel component="legend">차트</FormLabel>
          <RadioGroup aria-label="position">
            {graphTypeOptions.map((option, idx) => (
              <FormControlLabel
                key={idx}
                checked={graphTypeOption === option.graph}
                value={option.graph}
                control={<Radio />}
                label={option.label}
                name="monthly"
                labelPlacement="end"
                onChange={handleCheckboxChange}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">항목</FormLabel>
          <RadioGroup aria-label="position">
            {costOptions.map((option, idx) => (
              <FormControlLabel
                key={idx}
                checked={costOption === option.category}
                value={option.category}
                control={<Radio />}
                label={option.label}
                name="cost"
                labelPlacement="end"
                onChange={handleCheckboxChange}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <DateHeader
          type={"month"}
          currentTime={currentMonth}
          prev={prevMonth}
          next={nextMonth}
        />
        <ChartCanvas width={1000} height={500} ref={canvasRef} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <FormControl component="fieldset">
          <FormLabel component="legend">형식</FormLabel>
          <RadioGroup aria-label="position">
            {yearlyOptions.map((option, idx) => (
              <FormControlLabel
                key={idx}
                checked={yearlyOption === option.form}
                value={option.form}
                control={<Radio />}
                label={option.label}
                name="yearly"
                labelPlacement="end"
                onChange={handleCheckboxChange}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <DateHeader currentTime={currentYear} prev={prevYear} next={nextYear} />
        {yearlyOption === "table" && (
          <div>
            <DataGrid columns={columns} rows={rows} />
          </div>
        )}
        {yearlyOption === "chart" && (
          <div>
            <ChartCanvas width={1000} height={500} ref={canvasRef} />
          </div>
        )}
      </TabPanel>
    </div>
  );
}

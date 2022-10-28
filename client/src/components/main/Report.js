import { Link, NavLink, useLocation } from "react-router-dom";

import { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import ChartCanvas from "./ChartCanvas";

import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import DateHeader from "../common/DateHeader";

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

const API_URL = "http://localhost:5000/report";
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

const drawChart = (ctx, config) => {
  return new Chart(ctx, config);
};

const graphTypes = ["bar", "doughnut"];
const yearlyOptions = ["table", "chart"];
const costOptions = ["income", "expense"];

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

// let data = []; //useState로 관리? -> getData -> setData로 처리해 rerendering
// let labels = [];
const rows = [];

// const rowData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
// const addRows = (rowData) => {
//   const obj = {};
//   Object.entries(columns).forEach((column) => {
//     obj[column[1].key] = rowData[column[0]];
//   });
//   // console.log(obj);
//   rows.push(obj);
// };

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

let currentMonth = new Date();
let currentYear = new Date();
let params = {};
export default function Report() {
  const canvasRef = useRef(null);
  const loc = useLocation();
  const params =
    loc.pathname === "/report/month"
      ? {
          start_dt: startOfMonth(currentMonth),
          end_dt: endOfMonth(currentMonth),
        }
      : {
          start_dt: startOfYear(currentMonth),
          end_dt: endOfYear(currentMonth),
        };
  // const [currentMonth, setCurrentMonth] = useState(new Date());
  // const [currentYear, setCurrentYear] = useState(new Date());
  // const [month, setMonthData] = useState([]);
  // const [label, setLabel] = useState([]);

  const setParam = () => {
    const path = loc.pathname;
    if (path === "/report/month") {
      params.start_dt = startOfMonth(currentMonth);
      params.end_dt = endOfMonth(currentMonth);
    } else {
      params.start_dt = startOfYear(currentYear);
      params.end_dt = endOfYear(currentYear);
    }
  };

  const setParamAndRefetch = () => {
    setParam();
    refetch();
  };
  const prevMonth = () => {
    // setCurrentMonth(subMonths(currentMonth, 1));
    currentMonth = subMonths(currentMonth, 1);
    setParamAndRefetch();
  };
  const nextMonth = () => {
    // setCurrentMonth(addMonths(currentMonth, 1));
    currentMonth = addMonths(currentMonth, 1);
    setParamAndRefetch();
  };

  const prevYear = () => {
    // setCurrentYear(subYears(currentYear, 1));
    currentYear = subYears(currentYear, 1);
    setParamAndRefetch();
  };
  const nextYear = () => {
    // setCurrentYear(addYears(currentYear, 1));
    currentYear = addYears(currentYear, 1);
    setParamAndRefetch();
  };

  const [graphTypeChecked, setGraphTypeChecked] = useState({
    option: "bar",
    checked: true,
  });

  const [yearlyOption, setYearlyOption] = useState({
    option: "chart",
    checked: true,
  });

  const [costOption, setCostOption] = useState({
    option: "income",
    checked: true,
  });

  const checkboxMap = {
    monthly(e) {
      setGraphTypeChecked({ option: e.target.value, checked: true });
    },
    yearly(e) {
      setYearlyOption({ option: e.target.value, checked: true });
    },
    cost(e) {
      setCostOption({ option: e.target.value, checked: true });
    },
  };

  const handleCheckbox = (checkboxType, e) => {
    checkboxMap[checkboxType](e);
  };

  const handleOnChange = (e) => {
    if (e.target.checked) {
      if (e.target.name === "monthly") {
        handleCheckbox("monthly", e);
      } else if (e.target.name === "yearly") {
        handleCheckbox("yearly", e);
      } else if (e.target.name === "cost") {
        handleCheckbox("cost", e);
      }
    }
  };

  const getMonthlyData = (fetchedData) => {
    const newData = [];
    const newLabel = [];
    fetchedData.map((element, idx) => {
      newData[idx] = element.category_ratio * 100;
      newLabel[idx] = `${element.category} - ${element.category_sum}`;
    });

    return [newData, newLabel];
  };
  const getData = async () => {
    const path = loc.pathname;
    if (path === "/report/monthly") {
      try {
        const res = await axios(`${API_URL}`, { params: params });
        console.log("data", res.data);
        const fetchedData = res.data[costOption.option]; // API문서보면 expense income URL이 따로 있는듯
        const [newData, newLabel] = getMonthlyData(fetchedData);

        doughnutConfig.data.labels = newLabel;
        doughnutConfig.data.datasets[0].data = newData;
        barConfig.data.labels = newLabel;
        barConfig.data.datasets[0].data = newData;
        lineConfig.data.labels = newLabel;
        lineConfig.data.datasets[0].data = newData;
        // charId.update();
        // setMonthData(newData);
        // setLabel(newLabel);
      } catch (err) {
        console.log(err);
      }
    } else if (path === "/report/yearly") {
    }
  };

  // useEffect(() => {
  //   getData(loc.pathname);

  //   addRows(rowData);
  //   //console.log(rows);
  // }, []);

  useEffect(() => {
    // console.log(data, label);
    let charId;
    if (canvasRef.current) {
      charId = drawChart(
        canvasRef.current,
        loc.pathname === "/report/monthly"
          ? graphTypeChecked.option === "bar"
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

  // useEffect(() => {
  //   getData(loc.pathname);
  // }, [costOption]);

  const { data, isLoading, refetch } = useQuery(
    ["getReportData", costOption],
    getData
  );

  if (isLoading) return <PacmanLoader color="#36d7b7" />;

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
          to={"/report/monthly"}
        >
          <SideButton>{"월간 보고서"}</SideButton>
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? { textDecoration: "none", borderBottom: "1px solid red" }
              : { color: "black", textDecoration: "none" }
          }
          to={"/report/yearly"}
        >
          <SideButton>{"연간 보고서"}</SideButton>
        </NavLink>
      </NavLinkContainer>

      {loc.pathname === "/report/monthly" && (
        <div>
          <div>
            <ul>
              {graphTypes.map((type, idx) => {
                return (
                  <li key={idx}>
                    <Checkbox
                      type={type}
                      name={"monthly"}
                      checked={graphTypeChecked.option === type ? true : false}
                      handleOnChange={handleOnChange}
                    />
                    {type === "bar" && "막대형"}
                    {type === "doughnut" && "파이형"}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <ul>
              {costOptions.map((type, idx) => {
                return (
                  <li key={idx}>
                    <Checkbox
                      type={type}
                      name={"cost"}
                      checked={costOption.option === type ? true : false}
                      handleOnChange={handleOnChange}
                    />
                    {type === "income" && "수입"}
                    {type === "expense" && "지출"}
                  </li>
                );
              })}
            </ul>
          </div>
          <DateHeader
            type={"month"}
            currentTime={currentMonth}
            prev={prevMonth}
            next={nextMonth}
          />
          <ChartCanvas width={1000} height={500} ref={canvasRef} />
        </div>
      )}

      {loc.pathname === "/report/yearly" && (
        <div>
          <ul>
            {yearlyOptions.map((type, idx) => {
              return (
                <li key={idx}>
                  <Checkbox
                    type={type}
                    name={"yearly"}
                    checked={yearlyOption.option === type ? true : false}
                    handleOnChange={handleOnChange}
                  />
                  {type === "table" && "표"}
                  {type === "chart" && "그래프"}
                </li>
              );
            })}
          </ul>
          {yearlyOption.option === "table" && (
            <div>
              <DataGrid columns={columns} rows={rows} />
            </div>
          )}
          {yearlyOption.option === "chart" && (
            <div>
              <DateHeader
                currentTime={currentYear}
                prev={prevYear}
                next={nextYear}
              />
              <ChartCanvas width={1000} height={500} ref={canvasRef} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

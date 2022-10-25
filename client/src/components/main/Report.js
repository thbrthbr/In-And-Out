import { Link, NavLink, useLocation } from "react-router-dom";

import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import ChartCanvas from "./ChartCanvas";

import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";

import axios from "axios";

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

let data = []; //useState로 관리? -> getData -> setData로 처리해 rerendering
let labels = [];
const rows = [];

const rowData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const addRows = (rowData) => {
  const obj = {};
  Object.entries(columns).forEach((column) => {
    obj[column[1].key] = rowData[column[0]];
  });
  // console.log(obj);
  rows.push(obj);
};

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

function getData() {}

export default function Report() {
  const canvasRef = useRef(null);
  const loc = useLocation();

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

  useEffect(() => {
    let charId;
    if (loc.pathname === "/report/monthly") {
      getData();
      data = [10, 20, 15, 5, 50];
      labels = [
        "주거 - 10% 100,000",
        "주거 - 10% 100,000",
        "주거 - 10% 100,000",
        "주거 - 10% 100,000",
        "주거 - 10% 100,000",
      ];
    } else if (loc.pathname === "/report/yearly") {
      getData();
      data = [20, 30, 10, 30, 10];
      labels = [
        "주거 - 20% 200,000",
        "주거 - 20% 200,000",
        "주거 - 20% 200,000",
        "주거 - 20% 200,000",
        "주거 - 20% 200,000",
      ];
    }
    doughnutConfig.data.labels = labels;
    doughnutConfig.data.datasets[0].data = data;
    barConfig.data.labels = labels;
    barConfig.data.datasets[0].data = data;
    lineConfig.data.labels = labels;
    lineConfig.data.datasets[0].data = data;
    addRows(rowData);
    console.log(rows);

    if (canvasRef.current) {
      charId = drawChart(
        canvasRef.current,
        loc.pathname === "/report/monthly"
          ? graphTypeChecked.option === "bar"
            ? barConfig
            : doughnutConfig
          : lineConfig
      );
    }
    return () => {
      charId && charId.destroy();
    };
  });

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
              <ChartCanvas width={1000} height={500} ref={canvasRef} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

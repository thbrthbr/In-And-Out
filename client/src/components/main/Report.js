import { Link, NavLink, useLocation } from "react-router-dom";

import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import ChartCanvas from "./ChartCanvas";

import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";

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

export default function Report() {
  const canvasRef = useRef(null);
  const loc = useLocation();

  const graphTypes = ["bar", "doughnut"];
  const [graphTypeChecked, setGraphTypeChecked] = useState({
    chart: "bar",
    checked: true,
  });

  const [yearlyOption, setYearlyOption] = useState({
    option: "chart",
    checked: true,
  });

  const yearlyOptions = ["table", "chart"];

  const handleOnChange = (e) => {
    if (e.target.name === "monthly" && e.target.checked) {
      setGraphTypeChecked({ chart: e.target.value, checked: true });
    } else if (e.target.name === "yearly" && e.target.checked) {
      setYearlyOption({ option: e.target.value, checked: true });
    }
  };

  let data = [];
  let labels = [];

  // 임시적으로 데이터 처리
  if (loc.pathname === "/report/monthly") {
    data = [10, 20, 15, 5, 50];
    labels = [
      "주거 - 10% 100,000",
      "주거 - 10% 100,000",
      "주거 - 10% 100,000",
      "주거 - 10% 100,000",
      "주거 - 10% 100,000",
    ];
  } else if (loc.pathname === "/report/yearly") {
    data = [20, 30, 10, 30, 10];
    labels = [
      "주거 - 20% 200,000",
      "주거 - 20% 200,000",
      "주거 - 20% 200,000",
      "주거 - 20% 200,000",
      "주거 - 20% 200,000",
    ];
  }

  const doughnutConfig = {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: data,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
        },
      ],
      labels: labels,
    },
    options: {
      responsive: false,
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var total = dataset.data.reduce(function (
              previousValue,
              currentValue,
              currentIndex,
              array
            ) {
              return previousValue + currentValue;
            });
            var currentValue = dataset.data[tooltipItem.index];
            var precentage = Math.floor((currentValue / total) * 100 + 0.5);
            return precentage + "%";
          },
        },
      },
      plugins: {
        datalabels: {
          formatter: (value) => {
            if (value < 1) return "";
            return `${value} %`;
          },
        },
        legend: {
          display: true,
          position: "right",
          align: "start",
        },
      },
    },
  };

  const barConfig = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          axis: "y",
          label: "My First Dataset",
          data: data,
          fill: false,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
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
    options: {
      responsive: false,
      indexAxis: "y",
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Chart.js Horizontal Bar Chart",
        },
      },
    },
  };

  const lineConfig = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: data,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
  };

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
  addRows(rowData);
  console.log(rows);

  useEffect(() => {
    let charId;
    if (canvasRef.current) {
      charId = drawChart(
        canvasRef.current,
        loc.pathname === "/report/monthly"
          ? graphTypeChecked.chart === "bar"
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

      <div>Report</div>
      <Link to="/profile_change">Setting</Link>
      <br />
      <Link to="/calendar">Calendar</Link>
      <br />
      <Link to="/inout">Inout</Link>
      <br />
      <Link to="/">Logout</Link>

      {loc.pathname === "/report/monthly" && (
        <div>
          <ul>
            {graphTypes.map((type, idx) => {
              return (
                <li key={idx}>
                  <Checkbox
                    type={type}
                    name={"monthly"}
                    checked={graphTypeChecked.chart === type ? true : false}
                    handleOnChange={handleOnChange}
                  />
                  {type === "bar" && "막대형"}
                  {type === "doughnut" && "파이형"}
                </li>
              );
            })}
          </ul>

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

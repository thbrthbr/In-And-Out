import { useRef, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

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

  const handleOnChange = (e) => {
    if (e.target.checked)
      setGraphTypeChecked({ chart: e.target.name, checked: true });
  };
  // console.log(graphTypeChecked);
  // const [data, setData] = useState([]);
  let data = [];
  let chartType = "doughnut"; // default: doghnut, checkbox에 따라 변함 - state로 관리 해야될듯
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

  const config = {
    type: chartType,
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

  useEffect(() => {
    let charId;
    if (canvasRef.current) {
      charId = drawChart(canvasRef.current, config);
    }
    return () => {
      charId.destroy();
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

      <ul>
        {graphTypes.map((type, idx) => {
          return (
            <li key={idx}>
              <input
                type="checkbox"
                value={type}
                name={type}
                checked={graphTypeChecked.chart === type && true}
                onChange={handleOnChange}
              />
              {type === "bar" && "막대형"}
              {type === "doughnut" && "파이형"}
            </li>
          );
        })}
      </ul>

      <canvas id="myChart" width={1000} height={500} ref={canvasRef}></canvas>
    </div>
  );
}

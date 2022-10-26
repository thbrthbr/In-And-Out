import { withTheme } from "styled-components";

const doughnutOption = {
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
};

const barOption = {
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
      labels: {
        generateLabels: (chart) => {
          return chart.data.labels.map((label, index) => ({
            text: label,
            fillStyle: chart.data.datasets[0].backgroundColor[index],
            hidden: false,
          }));
        },
      },
    },
  },
};

const lineOption = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

export { doughnutOption, barOption, lineOption };

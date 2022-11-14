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
      formatter: (value, ctx) => {
        if (value < 1) return "";
        return `${
          ctx.chart.data.labels[ctx.dataIndex].split("-")[0]
        } \n    ${value} %`;
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
      borderWidth: 0,
    },
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        if (value < 1) return "";
        return `${
          ctx.chart.data.labels[ctx.dataIndex].split("-")[0]
        } \n  ${value} %`;
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
            lineWidth: 0,
            borderColor: "#ffffff",
            hidden: false,
          }));
        },
      },
    },
    onClick: (evt, item) => {
      this.check("source", this.state.data.datasets[0].data[item[0]._index]);
      console.log("test");
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
          "rgba(252, 219, 3)",
          "rgba(14, 205, 235)",
          "rgba(149, 195, 230)",
          "rgba(125, 154, 232)",
          "rgba(160, 153, 232)",
          "rgba(193, 171, 235)",
          "rgba(210, 174, 232)",
          "rgba(206, 135, 214)",
          "rgba(224, 150, 207)",
          "rgba(227, 166, 186)",
          "rgba(227, 75, 90)",
          "rgba(186, 104, 74)",
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
        label: "Dataset",
        data: [],
        fill: false,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgba(252, 219, 3)",
          "rgba(14, 205, 235)",
          "rgba(149, 195, 230)",
          "rgba(125, 154, 232)",
          "rgba(160, 153, 232)",
          "rgba(193, 171, 235)",
          "rgba(210, 174, 232)",
          "rgba(206, 135, 214)",
          "rgba(224, 150, 207)",
          "rgba(227, 166, 186)",
          "rgba(227, 75, 90)",
          "rgba(186, 104, 74)",
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
        label: "Dataset",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  },
  options: lineOption,
};

export { doughnutConfig, barConfig, lineConfig };

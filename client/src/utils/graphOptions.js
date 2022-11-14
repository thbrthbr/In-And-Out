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
      labels: {
        useLineStyle: true,
        usePointStyle: true,
      },
      onHover: (evt, legendItem) => {
        legendItem.fillStyle = "black";

        const index = evt.chart.config.data.labels.indexOf(legendItem.text);
        const activeSegment = evt.chart.getDatasetMeta(0).data[index];
        const arr = activeSegment.options.backgroundColor.split(",");
        arr[3] = "0.8)";
        activeSegment.options.backgroundColor = arr.join(",");

        evt.chart.draw();
      },
      onLeave: (evt, legendItem) => {
        legendItem.fillStyle = legendItem.strokeStyle;
        const index = evt.chart.config.data.labels.indexOf(legendItem.text);
        const activeSegment = evt.chart.getDatasetMeta(0).data[index];
        const arr = activeSegment.options.backgroundColor.split(",");
        arr[3] = "0.4)";

        activeSegment.options.backgroundColor = arr.join(",");
        evt.chart.draw();
      },
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
          "rgb(255, 99, 132,0.4)",
          "rgb(255, 159, 64,0.4)",
          "rgb(255, 205, 86,0.4)",
          "rgb(75, 192, 192,0.4)",
          "rgb(54, 162, 235,0.4)",
          "rgba(252, 219, 3,0.4)",
          "rgba(14, 205, 235,0.4)",
          "rgba(149, 195, 230,0.4)",
          "rgba(125, 154, 232,0.4)",
          "rgba(160, 153, 232,0.4)",
          "rgba(193, 171, 235,0.4)",
          "rgba(210, 174, 232,0.4)",
          "rgba(206, 135, 214,0.4)",
          "rgba(224, 150, 207,0.4)",
          "rgba(227, 166, 186,0.4)",
          "rgba(227, 75, 90,0.4)",
          "rgba(186, 104, 74,0.4)",
        ],
        hoverBackgroundColor: [
          "rgb(255, 99, 132,0.8)",
          "rgb(255, 159, 64,0.8)",
          "rgb(255, 205, 86,0.8)",
          "rgb(75, 192, 192,0.8)",
          "rgb(54, 162, 235,0.8)",
          "rgba(252, 219, 3,0.8)",
          "rgba(14, 205, 235,0.8)",
          "rgba(149, 195, 230,0.8)",
          "rgba(125, 154, 232,0.8)",
          "rgba(160, 153, 232,0.8)",
          "rgba(193, 171, 235,0.8)",
          "rgba(210, 174, 232,0.8)",
          "rgba(206, 135, 214,0.8)",
          "rgba(224, 150, 207,0.8)",
          "rgba(227, 166, 186,0.8)",
          "rgba(227, 75, 90,0.8)",
          "rgba(186, 104, 74,0.8)",
        ],
        borderColor: [
          "rgb(255, 99, 132,0.8)",
          "rgb(255, 159, 64,0.8)",
          "rgb(255, 205, 86,0.8)",
          "rgb(75, 192, 192,0.8)",
          "rgb(54, 162, 235,0.8)",
          "rgba(252, 219, 3,0.8)",
          "rgba(14, 205, 235,0.8)",
          "rgba(149, 195, 230,0.8)",
          "rgba(125, 154, 232,0.8)",
          "rgba(160, 153, 232,0.8)",
          "rgba(193, 171, 235,0.8)",
          "rgba(210, 174, 232,0.8)",
          "rgba(206, 135, 214,0.8)",
          "rgba(224, 150, 207,0.8)",
          "rgba(227, 166, 186,0.8)",
          "rgba(227, 75, 90,0.8)",
          "rgba(186, 104, 74,0.8)",
        ],
        borderWidth: 3,
        hoverBorderWidth: 3,
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
          "rgb(255, 99, 132,0.4)",
          "rgb(255, 159, 64,0.4)",
          "rgb(255, 205, 86,0.4)",
          "rgb(75, 192, 192,0.4)",
          "rgb(54, 162, 235,0.4)",
          "rgba(252, 219, 3,0.4)",
          "rgba(14, 205, 235,0.4)",
          "rgba(149, 195, 230,0.4)",
          "rgba(125, 154, 232,0.4)",
          "rgba(160, 153, 232,0.4)",
          "rgba(193, 171, 235,0.4)",
          "rgba(210, 174, 232,0.4)",
          "rgba(206, 135, 214,0.4)",
          "rgba(224, 150, 207,0.4)",
          "rgba(227, 166, 186,0.4)",
          "rgba(227, 75, 90,0.4)",
          "rgba(186, 104, 74,0.4)",
        ],
        hoverBackgroundColor: [
          "rgb(255, 99, 132,0.8)",
          "rgb(255, 159, 64,0.8)",
          "rgb(255, 205, 86,0.8)",
          "rgb(75, 192, 192,0.8)",
          "rgb(54, 162, 235,0.8)",
          "rgba(252, 219, 3,0.8)",
          "rgba(14, 205, 235,0.8)",
          "rgba(149, 195, 230,0.8)",
          "rgba(125, 154, 232,0.8)",
          "rgba(160, 153, 232,0.8)",
          "rgba(193, 171, 235,0.8)",
          "rgba(210, 174, 232,0.8)",
          "rgba(206, 135, 214,0.8)",
          "rgba(224, 150, 207,0.8)",
          "rgba(227, 166, 186,0.8)",
          "rgba(227, 75, 90,0.8)",
          "rgba(186, 104, 74,0.8)",
        ],
        borderColor: [
          "rgb(255, 99, 132,0.8)",
          "rgb(255, 159, 64,0.8)",
          "rgb(255, 205, 86,0.8)",
          "rgb(75, 192, 192,0.8)",
          "rgb(54, 162, 235,0.8)",
          "rgba(252, 219, 3,0.8)",
          "rgba(14, 205, 235,0.8)",
          "rgba(149, 195, 230,0.8)",
          "rgba(125, 154, 232,0.8)",
          "rgba(160, 153, 232,0.8)",
          "rgba(193, 171, 235,0.8)",
          "rgba(210, 174, 232,0.8)",
          "rgba(206, 135, 214,0.8)",
          "rgba(224, 150, 207,0.8)",
          "rgba(227, 166, 186,0.8)",
          "rgba(227, 75, 90,0.8)",
          "rgba(186, 104, 74,0.8)",
        ],
        borderWidth: 3,
        hoverBorderWidth: 3,
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

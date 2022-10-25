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
    legend: {
      position: "right",
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Horizontal Bar Chart",
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

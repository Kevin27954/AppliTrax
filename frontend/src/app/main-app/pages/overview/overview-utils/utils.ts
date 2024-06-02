export const lineOptions = {
  y: {
    beginAtZero: true,
    ticks: {
      //color: textColorSecondary,
      precision: 0,
    },
    grid: {
      //color: surfaceBorder,
      drawBorder: false,
    },
  },
  x: {
    ticks: {
      //color: textColorSecondary,
    },
    grid: {
      //color: surfaceBorder,
      drawBorder: false,
    },
  },
};

export const pieOptions = {
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        //color: textColor,
      },
    },
  },
};

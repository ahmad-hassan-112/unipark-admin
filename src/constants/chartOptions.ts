import { ChartOptions, TooltipItem } from 'chart.js';

export const lineChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top',
      align: 'end',
      labels: {
        boxWidth: 14,
        boxHeight: 4,
        color: '#475569',
        font: {
          size: 14,
          weight: 400,
        },
        usePointStyle: false,
        generateLabels: chart => {
          const datasets = chart.data.datasets;

          return datasets.map((dataset, i) => {
            const borderColor = typeof dataset.borderColor === 'string' ? dataset.borderColor : '#475569';

            return {
              text: dataset.label || `Dataset ${i + 1}`,
              fillStyle: borderColor,
              strokeStyle: borderColor,
              fontColor: '#475569',
              borderRadius: 2,
              lineWidth: 1,
              hidden: !chart.isDatasetVisible(i),
              index: i,
            };
          });
        },
      },
    },
    tooltip: {
      boxWidth: 14,
      boxHeight: 4,
      mode: 'index',
      intersect: false,
      backgroundColor: '#ffffff',
      titleColor: '#6A7E8D',
      titleFont: {
        size: 14,
        weight: 400,
      },
      titleMarginBottom: 8,
      bodySpacing: 12,
      bodyColor: '#353D45',
      bodyFont: {
        size: 14,
        weight: 400,
      },
      padding: 16,
      cornerRadius: 8,
      displayColors: true,
      boxPadding: 6,
      borderColor: '#E6E6E6',
      borderWidth: 1,
      callbacks: {
        label: function (context: TooltipItem<'line'>) {
          return ` ${context.dataset.label}    ${context.formattedValue}`;
        },
      },
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
        color: 'rgba(0, 0, 0, 0.1)',
        drawTicks: false,
      },
      ticks: {
        color: '#6A7E8D',
      },
      border: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      max: 400,
      ticks: {
        stepSize: 10,
        color: '#6A7E8D',
        padding: 16,
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      offset: true,
    },
  },
};

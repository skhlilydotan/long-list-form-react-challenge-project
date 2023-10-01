import { CHART_COLOR_BY_COUNTRY } from '../constants';

export function getChartData(usersCountByCountry) {
  let chartData = {};

  const labels = Object.keys(usersCountByCountry);
  const datasets = [
    {
      label: '# Users',
      data: Object.values(usersCountByCountry),
      backgroundColor: Object.keys(usersCountByCountry).map(
        (country) => `rgba(${CHART_COLOR_BY_COUNTRY[country]}, 0.2)`
      ),
      borderColor: Object.keys(usersCountByCountry).map(
        (country) => `rgba(${CHART_COLOR_BY_COUNTRY[country]}, 1)`
      ),
      borderWidth: 1,
    },
  ];

  chartData.labels = labels;
  chartData.datasets = datasets;

  return chartData;
}

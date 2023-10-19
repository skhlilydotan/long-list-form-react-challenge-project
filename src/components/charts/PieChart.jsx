import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { getUsers } from '@slices/usersSlice';
import { getCountries } from '@slices/countriesSlice.js';
import { Container } from '@common/container';
import { Card } from '@common/card';

const PieChart = () => {
  const usersData = useSelector(getUsers);
  const countries = useSelector(getCountries);
  const countriesData = useMemo(() => {
    const result = countries.reduce((acc, country) => {
      acc[country] = usersData.filter(user => user.country.toLowerCase() === country.toLowerCase()).length;
      return acc;
    }, {});
    return Object.entries(result).map(([name, y]) => ({ name, y }));
  }, [usersData, countries]);

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },

    title: null,
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}',
        },
      },
    },
    series: [{
      name: 'Countries',
      colorByPoint: true,
      data: countriesData,
    }],
  };

  return (
    <Container>
      <Card>
        <Card.Header title='Countries statistics' />
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />

      </Card>
    </Container>
  );
};

export { PieChart };
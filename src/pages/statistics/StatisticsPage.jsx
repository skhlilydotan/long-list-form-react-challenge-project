import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import Loader from '@mui/material/CircularProgress';
import { Pie } from 'react-chartjs-2';

import { getChartData } from '../../utils/stats.utils';
import { useUsersContext } from '../../context/usersContext';

import styles from './statistics.module.css';

Chart.register(ArcElement, Tooltip, Legend);

function StatisticsPage() {
  const { users } = useUsersContext();

  if (!users) {
    return (
      <div className={styles.pageRoot}>
        <Loader size={80} />
      </div>
    );
  }

  const usersCountByCountry = users.reduce((result, user) => {
    if (result[user.country]) {
      result[user.country] = result[user.country] + 1;
    } else {
      result[user.country] = 1;
    }

    return result;
  }, {});

  const chartData = getChartData(usersCountByCountry);

  return (
    <div className={styles.pageRoot}>
      <Pie data={chartData} />
    </div>
  );
}

export default StatisticsPage;

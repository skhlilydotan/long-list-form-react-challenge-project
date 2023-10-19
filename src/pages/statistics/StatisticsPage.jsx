import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from './statistics.module.css';
import { useSelector } from 'react-redux';
import { getUsers } from '@slices/usersSlice.js';
import { PieChart } from '@components/charts';

const StatisticsPage = () => {
  const usersData = useSelector(getUsers);
  return <div className={styles.pageRoot}><PieChart />
  </div>;
};

export default StatisticsPage;

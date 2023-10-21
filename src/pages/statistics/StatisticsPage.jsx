import styles from './statistics.module.css';
import UserCountryPieChart from "./chart/UserCountryPieChart";

function StatisticsPage() {
  return <div className={styles.pageRoot}>
    <div className={styles.pageContentContainer}>
      <UserCountryPieChart />
    </div>
  </div>;
}

export default StatisticsPage;

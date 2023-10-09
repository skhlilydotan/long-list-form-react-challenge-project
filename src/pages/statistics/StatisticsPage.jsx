import styles from './statistics.module.css';
import { PieChart } from '@mui/x-charts/PieChart';
import {useUsersContext} from "../../context/usersContext.jsx";
import {useMemo} from "react";

const COLORS = ["#b30000", "#7c1158", "#4421af", "#1a53ff", "#0d88e6", "#00b7c7", "#5ad45a", "#8be04e", "#ebdc78"];

function StatisticsPage() {
    const {usersData} = useUsersContext();
    const series = useMemo(() => {
        const dataMap = usersData.reduce((result, row) => {
            const label = row.country;
            const value = (result.get(label) ?? 0) + 1;
            return result.set(label, value);
        }, new Map())
        const data = Array.from(dataMap, ([label, value]) => ({value, label}))
        return [
            {
                innerRadius: 70,
                outerRadius: 200,
                paddingAngle: 5,
                cornerRadius: 5,
                data
            }
        ]
    }, [usersData]);
    console.log(series);
    return (
        <div className={styles.pageRoot}>
            <PieChart
                colors={COLORS}
                series={series}
                width={700}
                height={500}
            />
        </div>
    );
}

export default StatisticsPage;

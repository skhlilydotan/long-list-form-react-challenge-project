import React, {useContext, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import UsersContext from "../../../context/usersContext.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

import countries from '../../../data/countries.json'

export const data = {
    labels: countries,
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3, 3, 6],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(205, 139, 64, 0.2)',
                'rgba(105, 139, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(205, 139, 64, 1)',
                'rgba(105, 139, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const UserCountryPieChart = ()  => {

    const userContext = useContext(UsersContext);

    useEffect(()=>{
        data.datasets[0].data = Object.values(userContext.usersData.reduce((acc, curr) =>{
            acc[curr.country] ? acc[curr.country]++ : acc[curr.country] = 1;
            return acc;
        }, {}));
    }, [userContext.usersData])

    return <Pie data={data} />;
}

export default UserCountryPieChart;
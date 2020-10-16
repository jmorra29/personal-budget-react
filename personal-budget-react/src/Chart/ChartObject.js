import React from 'react'
import Chart from "chart.js";
import axios from "axios";

var dataSource = {
    datasets:[
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#d83ba7',
                '#836037',
                '#e69ee5',
                '#57821c',
                '#7b396e',
                '#373e60',
                '#977105'
            ],
        }
    ],
    labels: []
};
const budget = {
    myBudget: [
    {
        title: 'Eat Out',
        budget: 35
    },
    {
        title: 'Rent',
        budget: 400
    },
    {
        title: 'Grocery',
        budget: 200
    },
    ]
};

function createChart(){
    var ctx = document.getElementById("myChart").getContext("2d");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: dataSource
    });
}
function getBudget() {
    axios.get('./budget.json')
    .then(function(res) {
        console.log(res);
        for(var i = 0; i < res.data.myBudget.length; i++){
            dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
            dataSource.labels[i] = res.data.myBudget[i].title;
        }
        createChart();
    });
}
getBudget();
    function ChartObject() {
        return(
            <article>
                <h1>Budget Chart</h1>
                <p>
                    <canvas id="myChart" width="400" height="400"></canvas>
                </p>
            </article>
        );
    }

    export default ChartObject;
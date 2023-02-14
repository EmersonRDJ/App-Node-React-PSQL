// Redux
import { useDispatch } from 'react-redux'

import Chart from 'chart.js/auto';
import { useState, useRef, useEffect } from 'react';

const Charts = props => {
    // const [data, setData] = useState({
    //     labels: labels,
    //     datasets: [{
    //       label: 'My First Dataset',
    //       data: [65, 59, 80, 81, 56, 55, 40],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(255, 159, 64, 0.2)',
    //         'rgba(255, 205, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(201, 203, 207, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgb(255, 99, 132)',
    //         'rgb(255, 159, 64)',
    //         'rgb(255, 205, 86)',
    //         'rgb(75, 192, 192)',
    //         'rgb(54, 162, 235)',
    //         'rgb(153, 102, 255)',
    //         'rgb(201, 203, 207)'
    //       ],
    //       borderWidth: 1
    //     }]
    // })
    const chartRef = useRef(null);
    // const { labels, datasets } = props;

    useEffect(() => {
        let chartInstance = null;
        const myChartRef = chartRef.current.getContext("2d");
    
        if (chartInstance) {
            chartInstance.destroy();
        }
        chartInstance = new Chart(myChartRef, {
            type: 'bar',
            data: {
                labels: props.labels,
                datasets: [{
                    label: props.dataSets.label,
                    data: props.dataSets.data ,
                    borderWidth: 1
                  }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                fill: true
            }
        });
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);

    return (
        <main className="h-screen w-screen flex items-center justify-center">
            <div className="max-h-[75%] h-fit max-w-screen w-fit justify-center items-center flex flex-col bg-slate-400 border-2 border-slate-500 rounded-xl px-5 pb-5">
                <div className='flex flex-row justify-between w-full'>
                <button className="self-start h-[9vh] px-[2%] py-[1%] my-[2%] min-w-fit block bg-slate-700 hover:bg-slate-900 text-slate-50 text-3xl rounded-md" onClick={_ => props.setOpenCharts(false)}>Voltar</button>
                <select className="self-end h-[9vh] px-[2%] py-[1%] my-[2%] min-w-fit block bg-slate-700 hover:bg-slate-900 text-slate-50 text-3xl rounded-md">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                </div>
                <div className="w-[150vh] h-[100vh] overflow-auto max-h-[70vh] scrollbar scrollbar-track-slate-700 scrollbar-thumb-slate-300 pr-6">
                    <canvas id="myChart" ref={chartRef} />
                </div>
            </div>
        </main>
    )
}

export default Charts
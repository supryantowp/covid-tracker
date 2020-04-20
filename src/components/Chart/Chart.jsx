import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { FetchDailyData } from "../../api/";
import style from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fethAPI = async () => {
      setDailyData(await FetchDailyData());
    };

    fethAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["infected", " Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: ["#333fff", "green", "rgba(255,0,0,0.5)"],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current country in ${country}` },
      }}
    />
  ) : null;

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#333fff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return (
    <div className={style.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;

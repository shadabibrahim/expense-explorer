import React from "react";
import { Line, Pie } from "@ant-design/charts";
import { Card, Row } from "antd";
import styles from "./styles.css"
function ChartComponent({ sortedTransactions }) {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });
  let spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type === "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });
  let finalSpendings = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});
  const config = {
    data: data,
    width: 500,
    autoFit: true,
    xField: "date",
    yField: "amount",
  };
  const spendingConfig = {
    data: Object.values(finalSpendings),
    width: 400,
    autoFit: true,
    appendPadding: 10,
    radius: 0.8,
    angleField: "amount",
    colorField: "tag",
  };

  let chart;
  let pieChart;
 
  const pieChartContainerStyle = {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // objectfit: " contain",
//    textAlign:'center',
  };

  return (
    <div className="container">
    <div className="cardStyle flex-grow">
      <h2 >Financial Statistics</h2>
      <Line
        {...config}
        onReady={(chartInstance) => (chart = chartInstance)}
      />
    </div>

    <div className="cardStyle fixed-width" >
      <h2>Total Spending</h2>
      <Pie
        {...spendingConfig}
        onReady={(chartInstance) => (pieChart = chartInstance)}
      />
    </div>
  </div>
  );
}

export default ChartComponent;

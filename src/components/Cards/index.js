import React from "react";
import "./styles.css";
import { Row, Card } from "antd";
import Button from "../Button/index";

function Cards({
  income,
  expense,
  totalBalance,
  showIncomeModal,
  showExpenseModal,
  deleteAllTransactions,
}) {
  return (
    <div>
      <Row className="my-row">
        <Card bordered={true} className="my-card">
          <h2>Current Balances</h2>
          <p>₹{totalBalance} </p>
          <Button text={"Reset Balance"} blue={true}  onClick={deleteAllTransactions}/>
        </Card>

        <Card bordered={true} className="my-card">
          <h2>Total Income</h2>
          <p>₹{income} </p>
          <Button text={"Add Income"} blue={true} onClick={showIncomeModal} />
        </Card>
        <Card bordered={true} className="my-card">
          <h2>Total Expenses</h2>
          <p>₹{expense} </p>
          <Button text={"Add Expense"} blue={true} onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
}

export default Cards;

import { useState } from "react";
import useAddTransaction from "../../hooks/useAddTransaction";
import useGetTransactions from "../../hooks/useGetTransactions";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import "./styles.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

function ExpenseTracker() {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotal } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, expenses, income } = transactionTotal;
  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription('')
    setTransactionAmount(0)
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(signOut);
    }
  };
  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>${expenses}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description.."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount.."
              required
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile">
            <img src={profilePhoto} alt="" className="profile-photo" />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;

            return (
              <li>
                <h4>{description}</h4>
                <p>
                  ${transactionAmount} .{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
        <h3 style={{ position: "absolute", bottom: 0, margin: 50 }}>
          Karthik Vinod ©{new Date().getFullYear()}-
          {(new Date().getFullYear() % 100) + 1}
        </h3>
      </div>
    </>
  );
}

export default ExpenseTracker;

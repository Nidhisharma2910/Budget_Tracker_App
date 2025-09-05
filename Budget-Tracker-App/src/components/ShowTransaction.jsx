import React, { useState, useContext, useEffect } from 'react';
import { Auth } from '../context/AuthContext';

function ShowTransaction() {
  const [select, setSelect] = useState('');
  const [response, setResponse] = useState([]);
  const [category, setCategory] = useState('');
  const [expensename, setExpensename] = useState('');
  const [error, setError] = useState({ flag: false, msg: '' });
  const [transaction, setTransaction] = useState(null);
  const [sum, setSum] = useState(0);
  const [cost, setCost] = useState('');
  const [expensecat, setExpensecat] = useState([]);
  const { key } = useContext(Auth);

  async function getTransactionByCategory(cat) {
    const res = await fetch("http://127.0.0.1:8000/tracker/serachbycat/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": "token " + key
      },
      body: JSON.stringify({
        category: cat
      })
    });
    const data = await res.json();

    if (data.status) {
      setResponse(data.msg);
      let sum1 = 0;
      for (let i = 0; i < data.msg.length; i++) {
        sum1 += parseInt(data.msg[i].cost);
      }
      setSum(sum1);
    } else {
      setResponse([]);
      setSum(0);
    }
  }

  function onchangeData(e) {
    const { name, value } = e.target;
    if (name === "category") {
      setCategory(value);
    } else if (name === "expensename") {
      setExpensename(value);
    } else if (name === "cost") {
      setCost(value);
    } else if (name === "allcategory") {
      setSelect(value);
      getTransactionByCategory(value);  // Use event value directly
    }
  }

  async function getalltransaction() {
    const res = await fetch("http://127.0.0.1:8000/tracker/gettransactions/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": "token " + key
      },
    });
    const data = await res.json();
    setResponse(data.msg);

    let sum1 = 0;
    for (let i = 0; i < data.msg.length; i++) {
      sum1 += parseInt(data.msg[i].cost);
    }
    setSum(sum1);
  }

  async function getallcategory() {
    const res = await fetch("http://127.0.0.1:8000/tracker/getdistintransaction/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": "token " + key
      },
    });
    const data = await res.json();
    if (data.status) {
      setExpensecat([...data.msg]);
    } else {
      setExpensecat([]);
    }
  }

  async function ondelete(id) {
    const res = await fetch("http://127.0.0.1:8000/tracker/delete/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": "token " + key
      },
      body: JSON.stringify({
        transactionid: id
      })
    });
    const data = await res.json();
    console.log(data);
    // Optionally refresh transactions after delete
    getalltransaction();
  }

  async function getThisTransaction(id) {
    const res = await fetch("http://127.0.0.1:8000/tracker/getatransaction/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": "token " + key
      },
      body: JSON.stringify({
        transactionid: id
      })
    });
    const data = await res.json();

    const category1 = document.querySelector(".category");
    const expense1 = document.querySelector(".expense");
    const cost1 = document.querySelector(".cost");

    category1.value = data.msg[0].category;
    expense1.value = data.msg[0].expensename;
    cost1.value = data.msg[0].cost;

    setCategory(data.msg[0].category);
    setExpensename(data.msg[0].expensename);
    setCost(data.msg[0].cost);
    setTransaction(data.msg[0].transactionid);
  }

  async function onupdate(e) {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/tracker/updateATransaction/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": "token " + key
      },
      body: JSON.stringify({
        category: category,
        expensename: expensename,
        cost: cost,
        transactionid: transaction
      })
    });
    const data = await res.json();

    if (data.status) {
      setError({
        flag: true,
        msg: "Item Updated Successfully."
      });
      setTimeout(() => {
        setError({ flag: false, msg: "" });
      }, 2000);
      getalltransaction(); // Refresh after update
    } else {
      setError({
        flag: false,
        msg: "Failed to Update."
      });
      setTimeout(() => {
        setError({ flag: false, msg: "" });
      }, 2000);
    }
  }

  useEffect(() => {
    getalltransaction();
    getallcategory();
  }, []);

  return (
    <div className="container">
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update This Transaction</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {error.msg && (
                <p style={{ color: error.flag ? "green" : "red" }}>{error.msg}</p>
              )}
              <form>
                <div className="mb-3">
                  <label htmlFor="categoryInput" className="form-label">Enter Category</label>
                  <input type="text" onChange={onchangeData} name="category" className="form-control category" id="categoryInput" aria-describedby="categoryHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="expenseInput" className="form-label">Enter Expense Name</label>
                  <input type="text" onChange={onchangeData} name="expensename" className="form-control expense" id="expenseInput" />
                </div>
                <div className="mb-3">
                  <label htmlFor="costInput" className="form-label">Enter Cost</label>
                  <input type="text" onChange={onchangeData} name="cost" className="form-control cost" id="costInput" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" onClick={onupdate}>Update</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container p-5">
        <p>Select Category</p>
        <select className="form-select" name="allcategory" onChange={onchangeData} aria-label="Default select example">
          <option value="">All Categories</option>
          {expensecat.length > 0 ? (
            expensecat.map((x, i) => (
              <option key={i} value={x.category}>{x.category}</option>
            ))
          ) : null}
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Expense Name</th>
            <th scope="col">Cost</th>
            <th scope="col">Date</th>
            <th scope="col">Customise</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {response.length > 0 ? response.map((data, i) => (
            <tr key={i}>
              <td>{data.category}</td>
              <td>{data.expensename}</td>
              <td>{data.cost}</td>
              <td>{data.date}</td>
              <td>
                <button type="button" onClick={() => getThisTransaction(data.transactionid)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => ondelete(data.transactionid)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" className="text-center">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Total Expenditure - {sum ? sum : "0"}</h3>
    </div>
  );
}

export default ShowTransaction;

import React, { useState, useEffect, useContext } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Auth } from '../context/AuthContext';

function ShowCharts() {
  const [transaction, setTransaction] = useState([]);
  const { key } = useContext(Auth);

  async function getalltransaction() {
    const res = await fetch("http://127.0.0.1:8000/tracker/gettransactions/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": "token " + key
      },
    });
    const data = await res.json();
    if (data.status) {
      const arr = data.msg.map(item => ({
        expensename: item.expensename,
        cost: Number(item.cost)
      }));
      setTransaction(arr);
    } else {
      setTransaction([]);
    }
  }

  useEffect(() => {
    getalltransaction();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h1>Showing Visualization</h1>
        <BarChart width={600} height={300} data={transaction} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="expensename" />
          <YAxis domain={[0, 'dataMax']} />
          <Tooltip />
          <Legend />
          <Bar dataKey="cost" fill="#8884d8" name="Expenditure" />
        </BarChart>
      </div>
    </div>
  );
}

export default ShowCharts;

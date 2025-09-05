import React from 'react';
import { Link } from 'react-router-dom';

function HomeNavbar() {
  function logout(){
    localStorage.removeItem("auth");
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="#">Budget Tracker App</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">Profile</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/createtransaction">Create Transaction</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/showtransaction">Show Trancsation</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/showcharts">Show Charts</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={logout}>Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default HomeNavbar
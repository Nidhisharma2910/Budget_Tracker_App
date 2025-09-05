import React, { useState } from 'react';

function Registration() {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmpassword: ''
  });
  const [error, setError] = useState({ flag: false, msg: "" });
  const [loading, setLoading] = useState(false);
  
  function onchangeData(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function submit(e) {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.firstname || !formData.lastname || !formData.password) {
      setError({ flag: false, msg: "All fields are required" });
      return;
    }
    
    if (formData.password !== formData.confirmpassword) {
      setError({ flag: false, msg: "Passwords don't match" });
      return;
    }
    
    if (formData.password.length < 6) {
      setError({ flag: false, msg: "Password must be at least 6 characters" });
      return;
    }

    setLoading(true);
    setError({ flag: false, msg: "" });

    try {
      const res = await fetch("http://127.0.0.1:8000/user/r1/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      
      if (!data.status) {
        setError({ flag: false, msg: data.message || "Registration failed" });
      } else {
        setError({ flag: true, msg: "Registration Successful" });
        // Reset form on success
        setFormData({
          email: '',
          firstname: '',
          lastname: '',
          password: '',
          confirmpassword: ''
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError({ flag: false, msg: "Network error. Please check your connection and try again." });
    } finally {
      setLoading(false);
      
      setTimeout(() => {
        setError({ flag: false, msg: "" });
      }, 2000);
    }
  }

  return (
    <div className='container p-5'>
      <h1>Register</h1>
      {error.msg && (
        <div className={`alert ${error.flag ? 'alert-success' : 'alert-danger'}`}>
          {error.msg}
        </div>
      )}
      {loading && <div className="alert alert-info">Loading...</div>}
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input 
            type="email" 
            name="email" 
            className="form-control" 
            id="email" 
            value={formData.email}
            onChange={onchangeData}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">Firstname</label>
          <input 
            type="text" 
            name="firstname" 
            className="form-control" 
            id="firstname" 
            value={formData.firstname}
            onChange={onchangeData}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Lastname</label>
          <input 
            type="text" 
            name="lastname" 
            className="form-control" 
            id="lastname" 
            value={formData.lastname}
            onChange={onchangeData}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            name="password" 
            className="form-control" 
            id="password" 
            value={formData.password}
            onChange={onchangeData}
            required
            minLength={6}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
          <input 
            type="password" 
            name="confirmpassword" 
            className="form-control" 
            id="confirmpassword" 
            value={formData.confirmpassword}
            onChange={onchangeData}
            required
          />
        </div>
        <button 
          type="submit" 
          onClick={submit} 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default Registration;
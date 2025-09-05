import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [error,setError] = useState({flag:false,msg:""})
  const [loading,setLoading] = useState()
  const navigate = useNavigate()


  function onchangeData(e){
    if(e.target.name === "email"){
      setEmail(e.target.value)
    }else if(e.target.name === "password"){
      setPassword(e.target.value)
    }
  }
  async function Login(){
    const res = await fetch("http://127.0.0.1:8000/user/l1/",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    });
    setLoading(true)

    const data = await res.json();

    return data
  }

  function submit(e){
    e.preventDefault()

    const data = Login();
    data.then((x)=>{
      localStorage.setItem("auth",x.token)
      setLoading(false)
      setError({flag:true,msg:"Registration Successfull"});
      
      setTimeout(()=>{
        setError({flag:false,msg:""})
        navigate("/profile")
       },2000)
    }).catch((e)=>{
      setLoading(false)
      setError({flag:false,msg:"Invalid Email and Password"})

      setTimeout(()=>{
       setError({flag:false,msg:""})
      },2000)
    })
  }

  useEffect(()=>{
    if(loading){
      Login()
    }
  },[loading])
  return (
    <div className='container p-5'>
      <h1>Login</h1>
      <p className='error'>{error.flag ? <p style={{"color":"green"}}>{error.msg}</p> : <p style={{"color":"red"}}>{error.msg}</p>}</p>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" name="email" onChange={onchangeData} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" name="password" onChange={onchangeData} className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" onClick={submit} className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login
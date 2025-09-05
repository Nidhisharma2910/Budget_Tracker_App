import React,{useState,useContext, useEffect} from 'react';
import { Auth } from '../context/AuthContext';

function CreateTransaction() {
  const [category,setCategory] = useState()
  const [expensename,setExpensename] = useState()
  const [cost,setCost] = useState();
  const [error,setError] = useState({flag:false,msg:""})
  const {key} = useContext(Auth);
  const [loading,setLoading] = useState()


  function onchangeData(e){
    if(e.target.name === "category"){
      setCategory(e.target.value)
    }else if(e.target.name === "expensename"){
      setExpensename(e.target.value)
    }else if(e.target.name === "cost"){
      setCost(e.target.value)
    }
  }

  async function callapi(){
    const res = await fetch("http://127.0.0.1:8000/tracker/createtransaction/",{
      method:"POST",
      headers:{
        "content-type":"application/json",
        "Authorization":"token "+key
      },
      body:JSON.stringify({
        category:category,
        expensename:expensename,
        cost:cost
      })
    })
    const data = await res.json();
    return data
  }


  function createtransaction(e){
    e.preventDefault()

    const data = callapi();

    data.then((x)=>{
      if(x.status){

        setLoading(false)
        setError({
          flag:true,
          msg:"Item Added Succefully..."
        })
        setTimeout(()=>{
          setError({flag:false,msg:""})
         },2000)
      }else{
        setLoading(false)
        setError({
          flag:false,
          msg:"Fill The Form Correctly..."
        })

        setTimeout(()=>{
          setError({flag:false,msg:""})
         },2000)
      }
    }).catch((e)=>{
      console.log(e)
    })
  }

  useEffect(()=>{
    if(loading){
      callapi()
    }
  },[loading])
  return (
    <div className="container">
      <h1>Create Transaction</h1>
      <p className='error'>{error.flag ? <p style={{"color":"green"}}>{error.msg}</p> : <p style={{"color":"red"}}>{error.msg}</p>}</p>

      <form >
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Enter Category</label>
      <input type="text" onChange={onchangeData} name="category" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Enter Expense Name</label>
      <input type="text" onChange={onchangeData} name="expensename" className="form-control" id="exampleInputPassword1"/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Enter Cost</label>
      <input type="text" onChange={onchangeData} name="cost" className="form-control" id="exampleInputPassword1"/>
    </div>
    <button type="submit" className="btn btn-primary" onClick={createtransaction}>Create Transaction</button>
  </form>
    </div>
  )
}

export default CreateTransaction
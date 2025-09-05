import React,{useContext, useEffect} from 'react'
import Navbar from './Navbar'
import { Outlet,useNavigate } from 'react-router-dom';
import {Auth} from '../context/AuthContext';

function AuthenticationComponent() {
  const data = useContext(Auth)
  const {authenticate,authstate} = data;
  const navigate = useNavigate()
  authenticate()
  
  
  useEffect(()=>{
    if(authstate){
      navigate("/profile")
    }
  },[authstate])
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default AuthenticationComponent
import React,{useContext, useEffect} from 'react';
import HomeNavbar from './HomeNavbar';
import { Outlet,useNavigate } from 'react-router-dom';
import {Auth} from '../context/AuthContext';

function Home() {
  const {authenticate,authstate,getuser} = useContext(Auth);
  let navigate = useNavigate()
  authenticate()

  useEffect(()=>{
    getuser()
  },[])


  useEffect(()=>{
    if(!authstate){
      navigate("/")
    }
  },[authstate])
  return (
    <div>
      <HomeNavbar />
      <Outlet />
    </div>
  )
}

export default Home
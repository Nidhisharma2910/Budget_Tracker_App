import React,{useContext} from 'react'
import { Auth } from '../context/AuthContext'

function Profile() {
  const {response} = useContext(Auth);
  return (
    <div className='container'>
      <h1>Profile</h1>
      {
        response.length > 0 ? response.map((x,i)=>{
          return <p key={i}>{x}</p>
        }) : ""
      }
    </div>
  )
}

export default Profile
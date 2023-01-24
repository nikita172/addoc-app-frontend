import React from 'react'
import "./header.css"
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom"

function Header({ companyName, state }) {
  const navigate = useNavigate()
  const authHandler = () => {
    if (state === "Login") {
      navigate("/login")
    } else if (state === "Register") {
      navigate("/register")
    } else if (state === "Logout") {
      localStorage.removeItem("addoc")
      navigate("/register")
    } else if (state === "Cancel") {
      navigate("/")
    }
  }
  return (
    <div className='headerContainer'>
      <div className='headerWrapper'>
        <h2 className='header'>{companyName}</h2>
        <Button className='registerButton' onClick={authHandler}>{state}</Button>
      </div>
    </div>
  )
}

export default Header
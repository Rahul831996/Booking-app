import React, { Fragment, useContext, useEffect } from 'react'
import Sidebar from "../sideBar/Sidebar"
// import Navbar from "../navbar/Navbar"
import "./Dashboard.css";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserList from "../list/UserList"

const Dashboard = () => {
  const navigate = useNavigate()

  const {user} = useContext(AuthContext)

  useEffect(() => {
    if(user.user.role !== "admin"){
      navigate("/")
    }
  },[navigate])
  return (
    <Fragment>
         <div className="home">
      <Sidebar />
      <UserList/>
    </div>
    </Fragment>
  )
}

export default Dashboard
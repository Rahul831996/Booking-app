import { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";



const Navbar = () => {
  const { user ,dispatch} = useContext(AuthContext);
 

  const [status, setStatus] = useState(false)

  const handleClick = async (e) => {
    e.preventDefault();
   
    try {
       await axios.get("/api/v1/logout/user");

       dispatch({ type: "LOGOUT_SUCCESS" });
    } catch (err) {
      dispatch({
        type: "LOGOUT_FAILURE",
        payload: err.response,
      })
    }
  };
  

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">RM.Booking</span>
        </Link>
        {user ?
          (<div className="isAuthenticated" onClick={() => setStatus(!status)}>
            <div className="img_name"> <img src={user?.user?.img || "Profile.png"} alt="profile_img" />  <span> {user?.user?.name}</span></div>
           { status ?   <div className="hide"> {user?.user?.role === "admin" ? (<>
              <Link to="/admin/dashboard">Dashboard</Link> <p onClick={handleClick}>Log Out</p></>) : <p onClick={handleClick}>Log Out</p>}</div> : ""}
          </div>) : (
            <div className="navItems">
               <Link to="/register"> 
              <button className="navButton">Register</button></Link>
              <Link to="/login">
                <button className="navButton">Login</button></Link>
            </div>
          )}
      </div>
    </div>
  )
}

export default Navbar
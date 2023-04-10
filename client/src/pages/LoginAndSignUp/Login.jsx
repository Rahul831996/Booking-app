import React, { Fragment, useContext, useState } from 'react'
import "./Login.css"
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {

    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
      });
    
      const {loading, error, dispatch } = useContext(AuthContext);
    
      const navigate = useNavigate()
    
      const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };
    
      const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post("/api/v1/login/user", credentials);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          navigate("/")
        } catch (err) {
          dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
      };
    
    
      return (
        <div className="login">
          <div className="lContainer">
            <h1>Login</h1>
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              placeholder="Email"
              id="email"
              onChange={handleChange}
              className="lInput"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="lInput"
            />
            <button disabled={loading} onClick={handleClick} className="lButton">
              Login
            </button>
            <div className="gotoRegister">
              No account? <Link to="/register">Register</Link>
            </div>
            {error && <span>{error.message}</span>}
          </div>
        </div>
      );
    };

export default Login
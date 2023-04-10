import React, { Fragment, useContext, useState } from 'react';
import "./Register.css";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';

const Register = () => {
const navigate = useNavigate()
    const [details, setDetails] = useState({
        name: undefined,
        email: undefined,
        password: undefined,
    });
    console.log(details)

    const { dispatch } = useContext(AuthContext);

    const registerDataHandler = (e) => {
        setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            dispatch({
                type: "REGISTER_REQUIREST",
            });

            const res = await axios.post(`/api/v1/register/user`, details)
            console.log(res)
            dispatch({
                type: "REGISTER_SUCCESS",
                payload: res.data,
            });

            navigate("/")

            console.log(res)
        } catch (err) {
            dispatch({
                type: "REGISTER_FAILURE",
                payload: err?.response?.message?.data,
            })
        }
    }


    return (
        <Fragment>
            <div className="register">
                <div className="form">
                    <h1>Register</h1>
                    <form action="" className='registerForm' encType='multipart/form-data'>
                        <label htmlFor="name">Name</label>
                        <input required type="text" onChange={registerDataHandler} id='name' placeholder='Full Name' />
                        <label htmlFor="email">Email</label>
                        <input required type="email" onChange={registerDataHandler} id='email' placeholder="Email" />
                        <label htmlFor="password">Password</label>
                        <input required type="password" onChange={registerDataHandler} id='password' placeholder="Password" />
                        <button onClick={handleClick} className='formBtn'>Send</button>
                        <div className="allreadyLogin">
                            Have an account? <Link to="/login">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Register
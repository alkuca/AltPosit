import React, { useState } from 'react';
import '../App.css';
import { Link, Redirect } from 'react-router-dom';
import logo from "../Images/logo.svg";
import {connect} from "react-redux";
import {login} from "../actions/auth";



const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const {  email, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
       await login(email, password);
    };

    if(isAuthenticated){
        return <Redirect to = "/"/>
    }

    return (
        <div className="login--page">
            <div className="login--page--logo--container">
                <Link to="/landing">
                    <img src={logo} alt="logo"/>
                </Link>
            </div>
            <div className="login--container">
                <div className="login--content">
                    <div className="login--content--title--container">
                        <h1 className="login--content--title">Sign In</h1>
                    </div>
                    <div className="login--content--form--container">
                        <form onSubmit={e => onSubmit(e)}>
                            <label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => onChange(e)}
                                    required
                                />
                                <br />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </label>
                            <div className="login-buttons-container">

                            </div>

                            <div className="remember--me--container">
                                <input className="remember--me--checkbox" type="checkbox" name="test" value="test" /><label className="remember--me--label">Remember Me</label>
                                <label className="forgot--password--label">Forgot Password?</label>
                            </div>
                            <div className="sign--in--button--container">
                                <button type="submit" className="sign--in--button">Sign In</button>
                            </div>
                        </form>
                    </div>
                    <div className="sign--up--here--container">
                        <p className="sign--up--here">Don't Have an Account?</p>
                        <Link to="register">
                            <p className="sign--up--here--link">Sign Up Here!</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);

import React, { useState } from 'react';
import '../App.css';
import { Link,Redirect } from 'react-router-dom';
import logo from "../Images/navbarLogo.png";
import {connect} from "react-redux";
import {resetPassword, subLoading} from "../actions/auth";
import logoLoaderWhite from "../Images/loaderLogoWhite.gif";


const PasswordResetPage = ({ resetPassword, subLoading, submitLoading,passwordReset,match }) => {

    const [submit, setSubmit] = useState(false);

    const [formData, setFormData] = useState({
        newPassword: "",
        newPassword2: ""
    });


    const { newPassword, newPassword2 } = formData;


    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        setSubmit(true);
        if(newPassword !== newPassword2){
            console.log("passwords do not match");
        }else{
            subLoading();
            await resetPassword(newPassword,match.params.token);
        }
    };

    if(passwordReset){
        return <Redirect to = "/login"/>
    }


    return (
        <div className="login--page">
            <div className="login--page--logo--container">
                <Link to="/">
                    <img className="login--page--logo"  src={logo} alt="logo"/>
                </Link>
            </div>
            <div className="register--container">
                <div className="register--content">
                    <div className="register--content--title--container">
                        <h1 className="register--content--title">Reset Password</h1>
                    </div>
                    <div className="register--content--form--container">
                        <form onSubmit={e => onSubmit(e)}>
                            <label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={e => onChange(e)}
                                    required
                                />
                                <input
                                    type="password"
                                    name="newPassword2"
                                    placeholder="Repeat New Password"
                                    value={newPassword2}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </label>
                            <div className="sign--in--button--container">
                                <button type="submit" className="reset--password--button">
                                    {submit && submitLoading ?
                                        < img className="button--loader--white" src={logoLoaderWhite} alt="loader"/>
                                        : "Reset Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    submitLoading:state.auth.submitLoading,
    passwordReset:state.auth.passwordReset
});

export default connect(mapStateToProps, { resetPassword,subLoading })(PasswordResetPage);

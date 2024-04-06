import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";

function Signup() {
    const nameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null)
    const {setUser, setToken,} = useStateContext()
    

    
    const onSubmit = (e) => {

       

 
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            
        };
        
    axiosClient.post('/signup',payload)
        .then(({data})=>{
            setToken(data.token);
            setUser(data.user);
        }).catch(err=>{
            console.error(err);
            const response = err.response;

            if(response && response.status ===422){
                setErrors(response.data.errors)
                console.log(response.data.errors);
            }
        })

    
    

    
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Sign up for free</h1>
                    {
                        errors && <div class='alert'>
                            {
                                Object.keys(errors).map(key=>(
                                    <p key={key}>{errors[key][0]}</p>
                                ))
                            }
                        </div>
                    }
                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email address"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="passwordConfirmation"
                        placeholder="Password confirmation"
                    />

                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already registered? <Link to="/login">Signin</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;

import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

function DefaultLayout() {
    const { user, token, setUser, setToken} = useStateContext();
    
    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout').then(()=>{
            
            setToken(null)
            setUser(null);
        })
    };
    if (!token) {
        return <Navigate to="/login" />;
    }

    useEffect(()=>{
        axiosClient.get('/user')
        .then(({data})=>setUser(data))    }, [])
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a href="#" className="btn-logout" onClick={onLogout}>
                            Logout
                        </a>
                    </div>
                </header>

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DefaultLayout;

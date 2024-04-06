import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function UserForm() {
    const { id } = useParams();

    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState(null);

    const { setNotification} = useStateContext();

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    console.log(data.data);
                    setUser(data.data);
                })
                .catch((e) => {
                    setLoading(false);
                    console.log(e);
                });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (user.id) {
            
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    
                    
                    setNotification('User was successfully updated')
                    navigate("/users");
                })
                .catch((err) => {
                    console.error(err);
                    const response = err.response;

                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                        console.log(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/users", user)
                .then(() => {
                
                    setNotification('User was successfully created')
                    navigate("/users");
                })
                .catch((err) => {
                    console.error(err);
                    const response = err.response;

                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                        console.log(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}

                {errors && (
                    <div class="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={user.name}
                            type="text"
                            placeholder="name"
                            onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="email"
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="password"
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="password confirmation"
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password_confirmation: e.target.value,
                                })
                            }
                        />

                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default UserForm;

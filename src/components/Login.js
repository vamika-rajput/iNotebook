import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            // Save the auth token and redirect to home
            localStorage.setItem('token', json.authtoken);
            navigate("/"); // Redirect to the homepage
        } else {
            alert("Invalid credentials");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    

    return (
        
        <div className="container" style={{ maxWidth: '500px', margin: 'auto', marginTop: '50px' }}>
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={credentials.email}
                        id="email"
                        aria-describedby="emailHelp"
                        onChange={onChange} // Attach the onChange handler
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={credentials.password}
                        id="password"
                        onChange={onChange} // Attach the onChange handler
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                
            </form>
            </div>
    
        
    );
};

export default Login;


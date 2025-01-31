import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ showAlert }) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

    // Email validation function
    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    // Name validation function (Min 4 characters, only letters and spaces)
    const validateName = (name) => /^[A-Za-z\s]{4,}$/.test(name);

    // Validate fields dynamically
    const validateField = (name, value) => {
        let errorMsg = "";
        if (name === "name" && !validateName(value)) errorMsg = "Name must be at least 4 characters long and contain only letters.";
        if (name === "email" && !validateEmail(value)) errorMsg = "Invalid email format.";
        if (name === "password") {
            if (value.length < 6) {
                errorMsg = "Password must be at least 6 characters long.";
            } else if (!/[A-Z]/.test(value)) {
                errorMsg = "Password must contain at least one uppercase letter.";
            } else if (!/[0-9]/.test(value)) {
                errorMsg = "Password must contain at least one number.";
            } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                errorMsg = "Password must contain at least one special character.";
            }
        }
        if (name === "confirmPassword" && value !== credentials.password) errorMsg = "Passwords do not match.";
        return errorMsg;
    };

    // Handle input change
    const onChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });

        let newErrors = { ...errors };

        // Check if the field is empty and add a "required" message
        if (!value.trim()) {
            newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
        } else {
            newErrors[name] = validateField(name, value);
        }

        setErrors(newErrors);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = credentials;
        let newErrors = {};

        // Check if fields are empty
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!email.trim()) newErrors.email = "Email is required.";
        if (!password.trim()) newErrors.password = "Password is required.";
        if (!confirmPassword.trim()) newErrors.confirmPassword = "Confirm password is required.";

        // Check validation for other fields
        Object.keys(credentials).forEach((key) => {
            const errorMsg = validateField(key, credentials[key]);
            if (errorMsg) newErrors[key] = errorMsg;
        });

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return; // Stop form submission if there are errors

        try {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                showAlert("Account successfully created", "success");
                navigate("/");
            } else {
                setErrors({ general: json.error || "Error during signup." });
            }
        } catch (error) {
            console.error("Signup error:", error);
            setErrors({ general: "Server error, please try again later." });
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px', margin: 'auto', marginTop: '50px' }}>
            <h2 className="text-center mb-4">Sign Up</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        value={credentials.name} 
                        onChange={onChange} 
                        required 
                    />
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        value={credentials.email} 
                        onChange={onChange} 
                        required 
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        name="password" 
                        value={credentials.password} 
                        onChange={onChange} 
                        required 
                    />
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        name="confirmPassword" 
                        value={credentials.confirmPassword} 
                        onChange={onChange} 
                        required 
                    />
                    {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                </div>

                {errors.general && <small className="text-danger d-block mb-3">{errors.general}</small>}

                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;

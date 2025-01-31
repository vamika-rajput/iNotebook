import React, { useEffect } from 'react';
import { Link, useLocation ,useNavigate } from "react-router-dom";

function Navbar() {
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        console.log(location.pathname);
    }, [location]);

    const handleLogout = () => {
        // Remove the auth token from localStorage
        localStorage.removeItem('token');
        
        // Redirect to the login page
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/Home" ? "active" : ""}`}
                                aria-current="page"
                                to="/Home"
                            >
                                Home
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                                to="/about"
                            >
                                About
                            </Link>
                        </li> */}
                    </ul>
                    <form className="d-flex">

                    {!localStorage.getItem('token') ? (
                            <>
                                <Link className="btn btn-outline-success mx-2" to="/Login" role="button">Login</Link>
                                <Link className="btn btn-outline-success mx-2" to="/SignUp" role="button">SignUp</Link>
                            </>
                        ) : (
                            // Show Logout button if user is logged in
                            <button className="btn btn-outline-success mx-2" onClick={handleLogout}>
                                Logout
                            </button>
                        )}

                    </form>
                   
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

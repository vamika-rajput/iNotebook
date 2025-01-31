import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
// import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import AddNote from './components/AddNote';

function App() {
    const [alert, setAlert] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const showAlert = (message, type) => {
        setAlert({ msg: message, type });
        setTimeout(() => {
            setAlert(null);
        }, 3000); // Alert disappears after 3 seconds
    };

    useEffect(() => {
        // Check if the user is logged in by verifying the auth token
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <NoteState>
            <Router>
                <Navbar />
                <Alert alert={alert} />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home showAlert={showAlert} isLoggedIn={isLoggedIn} />} />
                        <Route path="/Home" element={<Home showAlert={showAlert} isLoggedIn={isLoggedIn} />} />

                        {/* <Route path="/about" element={<About />} /> */}
                        <Route path="/login" element={<Login showAlert={showAlert} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/signup" element={<Signup showAlert={showAlert} />} />
                        <Route path="/addnote" element={<AddNote showAlert={showAlert} />} />

                        
                    </Routes>
                </div>
            </Router>
        </NoteState>
    );
}

export default App;

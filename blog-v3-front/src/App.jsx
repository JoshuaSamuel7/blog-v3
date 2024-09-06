import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from "./components/Home";
import About from './components/About'
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Compose from './components/Compose';
import Spinner from "./components/Spinner";
import axios from 'axios';

function App() {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const baseURL = 'http://localhost:8000';

    useEffect(() => {
        axios.get(baseURL + '/current_user', { withCredentials: true })
            .then(response => {
                setUser(response.data.user);
                setLoading(false); 
            })
            .catch(() => setLoading(false)); 
    }, []); 

    if (loading) {
        return <div className="spinner-load"><Spinner></Spinner></div>; 
    }

    return (
        <div>
            <Navbar user={user} url={baseURL} setUser={setUser} />
            <Router>
                <Routes>
                    <Route path='/' element={<Home url={baseURL} user={user} />}></Route>
                    <Route path='/about' element={<About />}></Route>
                    <Route path='/contact' element={<Contact />}></Route>
                    <Route path='/login' element={user? <Navigate to="/"/> :<Login url={baseURL} user={user} setUser={setUser} />}></Route>
                    <Route path='/register' element={user? <Navigate to="/"/> :<Register url={baseURL} user={user} setUser={setUser} />}></Route>
                    <Route path='/compose' element={user ? <Compose user={user} url={baseURL} /> : <Navigate to="/login" />}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App;

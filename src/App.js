import React from 'react';
import { Container } from "@material-ui/core";
//import { BrowserRouter, Switch, Route } from 'react-router-dom'; //Switch was replaced by Routes
//import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'; //Redirect was replaced by Navigate
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    // :id (column id) means the id is dynamic
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    {/*<Route path="/" exact component={Home} />*/}
                    {/*<Route path="/" element={<Home />} />*/}
                    <Route path="/" element={<Navigate replace to="/posts" />} />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    {/*<Route path="/auth" element={<Auth />} />*/}
                    <Route path="/auth" element={!user ? <Auth /> : <Navigate replace to="/posts" />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );

};

export default App;
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from "./components/Home";
import { Crud } from "./components/Crud";
export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/crud" element={<Crud />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
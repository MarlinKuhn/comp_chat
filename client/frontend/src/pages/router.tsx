import {HashRouter, Route, Routes} from "react-router-dom";
import React from "react";
import ConnectPage from "@pages/connect-page";

export default function Router() {
    return (
        <HashRouter basename={"/"}>
            {/* The rest of your app goes here */}
            <Routes>
                <Route path="/" element={<ConnectPage/>} index/>
            </Routes>
        </HashRouter>
    )
}
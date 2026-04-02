import {HashRouter, Route, Routes} from "react-router-dom";
import React from "react";
import ConnectPage from "@pages/connect-page";
import ServerPage from "@pages/server-page";

export default function Router() {
    return (
        <HashRouter basename={"/"}>
            {/* The rest of your app goes here */}
            <Routes>
                <Route path="/" element={<ConnectPage/>} index/>
                <Route path="/server" element={<ServerPage/>}/>
            </Routes>
        </HashRouter>
    )
}
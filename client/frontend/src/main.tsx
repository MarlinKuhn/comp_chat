import React from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'
import Router from "@pages/router";

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <Router/>
    </React.StrictMode>
)

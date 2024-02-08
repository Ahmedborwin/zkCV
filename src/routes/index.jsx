import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"

// Pages
import HomePage from "../pages/HomePage"
import AboutPage from "../pages/AboutPage"
import NotFoundPage from "../pages/NotFoundPage"

const PageRoutes = () => (
    <HashRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* In v6, you handle not found pages by specifying a path="*" at the bottom */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </HashRouter>
)

export default PageRoutes

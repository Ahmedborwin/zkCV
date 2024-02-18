import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"

// Components
import Navigation from "../components/Navigation"

// Pages
import HomePage from "../pages/HomePage"
import AboutPage from "../pages/AboutPage"
import NotFoundPage from "../pages/NotFoundPage"
import ConfirmCV from "../pages/ConfirmCV"
import CVPage from "../pages/CVPage"
import JobAddPage from "../pages/JobAddPage"
import JobsPage from "../pages/JobsPage"

const PageRoutes = () => (
    <HashRouter>
        <Navigation />
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/confirm-cv" element={<ConfirmCV />} />
            <Route path="/cv" element={<CVPage />} />
            <Route path="/job" element={<JobAddPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route element={<NotFoundPage />} />
        </Routes>
    </HashRouter>
)

export default PageRoutes

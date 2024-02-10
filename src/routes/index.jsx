import React from 'react';
import {
  HashRouter,
  Route,
  Routes
} from 'react-router-dom';

// Components
import Navigation from '../components/Navigation';

// Pages
import HomePage from "../pages/HomePage"
import AboutPage from "../pages/AboutPage"
import NotFoundPage from "../pages/NotFoundPage"
import EmployeePage from '../pages/EmployeePage';
import EmployerPage from '../pages/EmployerPage';

const PageRoutes = () => (
  <HashRouter>
    <Navigation />
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/employee" element={<EmployeePage />} />
      <Route path="/employer" element={<EmployerPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);

export default PageRoutes;

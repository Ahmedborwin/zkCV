import React from 'react';
import { 
    HashRouter, 
    Route, 
    Routes
} from 'react-router-dom';

// Pages
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';

const PageRoutes = () => (
  <HashRouter>
    <Routes>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route component={NotFoundPage} />
    </Routes>
  </HashRouter>
);

export default PageRoutes;


import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Layout } from '../components/layout/Layout';

// Pages
import Landing from '../pages/Landing';
import Home from '../pages/Home';
import Todos from '../pages/Todos';
import Projects from '../pages/Projects';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';
import ProductivityTips from '../pages/ProductivityTips';
import NotFound from '../pages/NotFound';

export const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Landing page is outside of the main App Layout */}
        <Route path={ROUTES.LANDING} element={<Landing />} />
        
        {/* All App routes are wrapped in Layout */}
        <Route element={<Layout><Home /></Layout>} path={ROUTES.HOME} />
        <Route element={<Layout><Todos /></Layout>} path={ROUTES.TODOS} />
        <Route element={<Layout><Projects /></Layout>} path={ROUTES.PROJECTS} />
        <Route element={<Layout><Analytics /></Layout>} path={ROUTES.ANALYTICS} />
        <Route element={<Layout><ProductivityTips /></Layout>} path={ROUTES.TIPS} />
        <Route element={<Layout><Settings /></Layout>} path={ROUTES.SETTINGS} />
        
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </HashRouter>
  );
};

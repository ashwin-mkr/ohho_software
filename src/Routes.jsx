import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SecurePaymentProcessing from './pages/secure-payment-processing';
import AdminDashboardAnalytics from './pages/admin-dashboard-analytics';
import SystemLogsMonitor from './pages/system-logs-monitor';
import DynamicContactForm from './pages/dynamic-contact-form';
import UserManagementPanel from './pages/user-management-panel';
import ThreeDAnimatedLandingPage from './pages/3d-animated-landing-page';
import RealTimeChatInterface from './pages/real-time-chat-interface';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ThreeDAnimatedLandingPage />} />
        <Route path="/secure-payment-processing" element={<SecurePaymentProcessing />} />
        <Route path="/admin-dashboard-analytics" element={<AdminDashboardAnalytics />} />
        <Route path="/system-logs-monitor" element={<SystemLogsMonitor />} />
        <Route path="/dynamic-contact-form" element={<DynamicContactForm />} />
        <Route path="/user-management-panel" element={<UserManagementPanel />} />
        <Route path="/3d-animated-landing-page" element={<ThreeDAnimatedLandingPage />} />
        <Route path="/real-time-chat-interface" element={<RealTimeChatInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

/**
 * Redirect authenticated users away from auth pages straight to the dashboard.
 */
const PublicOnly = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

const App = () => (
  <Routes>
    <Route
      path="/login"
      element={
        <PublicOnly>
          <Login />
        </PublicOnly>
      }
    />
    <Route
      path="/register"
      element={
        <PublicOnly>
          <Register />
        </PublicOnly>
      }
    />

    <Route
      element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>

    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;

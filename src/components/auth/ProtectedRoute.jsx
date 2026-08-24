import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-text-faint border-t-accent" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    const shouldRemember = location.pathname !== '/account';
    return (
      <Navigate
        to="/login"
        replace
        state={shouldRemember ? { from: location } : undefined}
      />
    );
  }

  return <Outlet />
}
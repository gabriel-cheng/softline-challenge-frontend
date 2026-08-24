import { UserRound } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

const HEADER_MAX_WIDTH = 'max-w-4xl'

export function AppLayout({ children, maxWidth = 'max-w-4xl' }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <main className="flex min-h-screen flex-col items-center bg-canvas px-6 py-12">
      <div className={`mb-6 flex w-full ${HEADER_MAX_WIDTH} items-center justify-between gap-3`}>
        {isHome ? (
          <span />
        ) : (
          <Link
            to="/"
            className="text-xs text-text-muted underline-offset-2 hover:text-text-primary hover:underline"
          >
            ← voltar ao menu
          </Link>
        )}

        <div className="flex items-center gap-3">
          {user?.username && (
            <span className="text-xs text-text-faint">conectado como {user.username}</span>
          )}
          {user && (
            <Link
              to="/account"
              aria-label="Account settings"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-hairline text-text-muted
                transition-colors hover:border-text-faint hover:text-text-primary"
            >
              <UserRound size={16} />
            </Link>
          )}
          <Button variant="ghost" onClick={logout}>
            desconectar-se
          </Button>
        </div>
      </div>

      <div className={`w-full ${maxWidth}`}>{children}</div>
    </main>
  );
}
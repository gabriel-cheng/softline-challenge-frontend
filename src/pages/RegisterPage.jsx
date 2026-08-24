import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/users';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { LiveIndicator } from '../components/ui/LiveIndicator';
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export function RegisterPage() {
  useDocumentTitle('Registrar-se');

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPass) {
      setError('As senhas não combinam.')
      return
    }

    setSubmitting(true);
    try {
      await registerUser(username, password);
      navigate('/login', { state: { prefillUsername: username } });
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Este nome de usuário já está em uso, por favor tente outro.');
      } else {
        setError("Não foi possível criar uma conta. Por favor, tente novamente!");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-3">
          <h1 className="text-sm font-semibold tracking-wide text-text-primary">
            Criar uma conta
          </h1>
          <LiveIndicator label="secure" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-hairline bg-panel p-6"
          noValidate
        >
          <div className="flex flex-col gap-4">
            <Input
              id="username"
              label="Username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={submitting}
              required
            />

            <Input
              id="password"
              label="Senha"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              disabled={submitting}
              required
            />

            <Input
              id="confirmPass"
              label="Confirmar senha"
              type="password"
              autoComplete="new-password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              disabled={submitting}
              required
            />
          </div>

          {error && (
            <div className="mt-4 rounded-md border border-danger/30 bg-danger-soft px-3 py-2 text-xs text-danger">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={submitting}
            className="mt-5 w-full"
          >
            Criar conta
          </Button>

          <p className="mt-4 text-center text-xs text-text-faint">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-accent hover:underline">
              Conectar-se
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
import { useEffect, useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { updateUser } from '../api/users';
import { extractErrorMessage } from '../api/errors';

export function EditUserPage() {
  const { user, refresh } = useAuth();

  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user])

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword && newPassword !== confirmPassword) {
      setError('As senhas não combinam.');
      return;
    }

    const payload = {}
    if (username !== user.username) payload.username = username;
    if (newPassword) payload.password = newPassword;

    if (Object.keys(payload).length === 0) {
      setError('Nada pra atualizar.');
      return;
    }

    setSubmitting(true)
    try {
      await updateUser(user.usersId, payload);
      await refresh();
      setNewPassword('');
      setConfirmPassword('');
      setSuccess(true);
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Este nome de usuário já está em uso.');
      } else {
        setError(extractErrorMessage(err));
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AppLayout title="Editar Usuário" maxWidth="max-w-sm">
      <h1 className="mb-4 text-sm font-semibold tracking-wide text-text-primary">
        Configurações da conta
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-hairline bg-panel p-6"
        noValidate
      >
        <div className="flex flex-col gap-4">
          <Input
            id="account-username"
            label="Username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={submitting}
            required
          />

          <div className="border-t border-hairline-soft pt-4">
            <p className="mb-3 text-xs text-text-faint">
              Deixe os campos de senha em branco para manter sua senha atual.
            </p>

            <div className="flex flex-col gap-4">
              <Input
                id="account-new-password"
                label="New password"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={submitting}
              />

              <Input
                id="account-confirm-password"
                label="Confirm new password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={submitting || !newPassword}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-md border border-danger/30 bg-danger-soft px-3 py-2 text-xs text-danger">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-md border border-accent/30 bg-accent-soft px-3 py-2 text-xs text-accent">
            Configurações da conta atualizadas com sucesso.
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={submitting}
          className="mt-5 w-full"
        >
          salvar alterações
        </Button>
      </form>
    </AppLayout>
  );
}
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { LiveIndicator } from '../components/ui/LiveIndicator'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPass] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const redirectTo = location.state?.from?.pathname ?? '/'

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      await login(username, password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid username or password.')
      } else {
        setError("Couldn't sign in. Please try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-3">
          <h1 className="text-sm font-semibold tracking-wide text-text-primary">
            Sign in
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
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
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
            sign in
          </Button>
        </form>
      </div>
    </main>
  )
}
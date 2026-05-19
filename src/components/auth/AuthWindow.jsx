import { useState } from 'react'
import RetroButton from '../ui/RetroButton'
import RetroInput from '../ui/RetroInput'

export default function AuthWindow() {
  const [activeTab, setActiveTab] = useState('login')

  // ─── Login State (DTO-Ready) ───
  const [loginPayload, setLoginPayload] = useState({
    email: '',
    password: '',
  })

  // ─── Register State (DTO-Ready) ───
  const [registerPayload, setRegisterPayload] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [statusMessage, setStatusMessage] = useState('')

  // ─── Login Handler (Backend Integration Point) ───
  const handleLogin = async (e) => {
    e.preventDefault()
    // TODO: Replace with actual API call → POST /api/auth/login
    console.log('[AUTH] Login payload:', loginPayload)
    setStatusMessage('Logging in... (waiting for backend)')
  }

  // ─── Register Handler (Backend Integration Point) ───
  const handleRegister = async (e) => {
    e.preventDefault()
    if (registerPayload.password !== registerPayload.confirmPassword) {
      setStatusMessage('Error: Passwords do not match!')
      return
    }
    const { confirmPassword, ...dto } = registerPayload
    // TODO: Replace with actual API call → POST /api/auth/register
    console.log('[AUTH] Register payload:', dto)
    setStatusMessage('Registering... (waiting for backend)')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex">
        <button
          className={`retro-tab ${activeTab === 'login' ? 'retro-tab-active' : ''}`}
          onClick={() => { setActiveTab('login'); setStatusMessage('') }}
        >
          🔑 Login
        </button>
        <button
          className={`retro-tab ${activeTab === 'register' ? 'retro-tab-active' : ''}`}
          onClick={() => { setActiveTab('register'); setStatusMessage('') }}
        >
          📝 Register
        </button>
      </div>

      {/* Tab Content */}
      <div className="retro-raised flex-1 p-4">
        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[32px]">🔐</span>
              <div>
                <p className="font-bold text-[13px]">Welcome to PiringSehat</p>
                <p className="text-[11px] text-gray-600">
                  Enter your credentials to continue.
                </p>
              </div>
            </div>

            <RetroInput
              label="Email:"
              id="login-email"
              type="email"
              value={loginPayload.email}
              onChange={(e) =>
                setLoginPayload({ ...loginPayload, email: e.target.value })
              }
              required
            />
            <RetroInput
              label="Password:"
              id="login-password"
              type="password"
              value={loginPayload.password}
              onChange={(e) =>
                setLoginPayload({ ...loginPayload, password: e.target.value })
              }
              required
            />

            <div className="flex justify-end gap-2 mt-3">
              <RetroButton type="submit" primary>
                OK
              </RetroButton>
              <RetroButton onClick={() => setLoginPayload({ email: '', password: '' })}>
                Cancel
              </RetroButton>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[32px]">👤</span>
              <div>
                <p className="font-bold text-[13px]">Create New Account</p>
                <p className="text-[11px] text-gray-600">
                  Fill in the details below.
                </p>
              </div>
            </div>

            <RetroInput
              label="Username:"
              id="reg-username"
              value={registerPayload.username}
              onChange={(e) =>
                setRegisterPayload({ ...registerPayload, username: e.target.value })
              }
              required
            />
            <RetroInput
              label="Email:"
              id="reg-email"
              type="email"
              value={registerPayload.email}
              onChange={(e) =>
                setRegisterPayload({ ...registerPayload, email: e.target.value })
              }
              required
            />
            <RetroInput
              label="Password:"
              id="reg-password"
              type="password"
              value={registerPayload.password}
              onChange={(e) =>
                setRegisterPayload({ ...registerPayload, password: e.target.value })
              }
              required
            />
            <RetroInput
              label="Confirm Password:"
              id="reg-confirm"
              type="password"
              value={registerPayload.confirmPassword}
              onChange={(e) =>
                setRegisterPayload({
                  ...registerPayload,
                  confirmPassword: e.target.value,
                })
              }
              required
            />

            <div className="flex justify-end gap-2 mt-3">
              <RetroButton type="submit" primary>
                Register
              </RetroButton>
              <RetroButton
                onClick={() =>
                  setRegisterPayload({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                  })
                }
              >
                Clear
              </RetroButton>
            </div>
          </form>
        )}
      </div>

      {/* Status Bar */}
      <div className="retro-statusbar">
        <div className="retro-statusbar-section">
          {statusMessage || 'Ready'}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const executives = [
  { id: 'juan', name: 'Juan Minni', role: 'CEO', password: 'Starken2025#@PER@' },
  { id: 'dante', name: 'Dante Martins', role: 'CCO', password: 'Starken2025#@DANTE@' },
  { id: 'gabriel', name: 'Gabriel Anibelli', role: 'CPO', password: 'Starken2025#@PER@' },
  { id: 'victor', name: 'Victor Lapegna', role: 'COO', password: 'Starken2025#@PER@' },
]

export default function LoginPage() {
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const user = executives.find(exec => exec.id === selectedUser)
    if (!user) {
      setError('Selecione um executivo')
      return
    }

    if (password !== user.password) {
      setError('Senha incorreta')
      return
    }

    // Save session
    localStorage.setItem('stark_session', JSON.stringify({
      id: user.id,
      name: user.name,
      role: user.role,
      loginTime: new Date().toISOString()
    }))

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-sidebar flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="text-5xl">⚡</span>
            <span className="text-3xl font-bold text-white">STARK</span>
          </Link>
          <p className="text-dark-muted mt-2">CFO Virtual com IA</p>
        </div>

        {/* Login Card */}
        <div className="bg-dark-card/50 backdrop-blur-xl rounded-2xl p-8 border border-dark-border shadow-2xl">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Bem-vindo de volta
          </h2>

          {/* User Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {executives.map(exec => (
              <button
                key={exec.id}
                type="button"
                onClick={() => {
                  setSelectedUser(exec.id)
                  setError('')
                }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedUser === exec.id
                    ? 'border-starken-primary bg-starken-primary/20 text-white'
                    : 'border-dark-border bg-dark-sidebar/50 text-dark-muted hover:border-dark-muted'
                }`}
              >
                <div className="text-2xl mb-1">👤</div>
                <div className="font-semibold text-sm">{exec.name.split(' ')[0]}</div>
                <div className="text-xs opacity-60">{exec.role}</div>
              </button>
            ))}
          </div>

          {/* Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-dark-muted text-sm mb-2">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 bg-dark-sidebar border border-dark-border rounded-xl text-white placeholder-dark-muted focus:outline-none focus:border-starken-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-white"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-starken-primary to-starken-secondary text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Entrar
            </button>
          </form>
        </div>

        {/* Back to landing */}
        <div className="text-center mt-6">
          <Link href="/" className="text-dark-muted hover:text-white transition-colors">
            ← Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  )
}

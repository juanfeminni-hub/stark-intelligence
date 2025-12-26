'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface Session {
  id: string
  name: string
  role: string
  loginTime: string
}

const menuItems = [
  { href: '/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/dashboard/stark', icon: '⚡', label: 'STARK - CFO Virtual' },
  { separator: true },
  { href: '/dashboard/contas-pagar', icon: '💳', label: 'Contas a Pagar' },
  { href: '/dashboard/contas-receber', icon: '🤑', label: 'Contas a Receber' },
  { href: '/dashboard/fluxo-caixa', icon: '📈', label: 'Fluxo de Caixa' },
  { separator: true },
  { href: '/dashboard/dre', icon: '📋', label: 'DRE' },
  { href: '/dashboard/analiticos', icon: '🔍', label: 'Analíticos' },
  { href: '/dashboard/relatorios', icon: '📄', label: 'Relatórios' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('stark_session')
    if (!stored) {
      router.push('/login')
      return
    }

    try {
      const parsed = JSON.parse(stored)
      setSession(parsed)
    } catch {
      router.push('/login')
    }

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('stark_session')
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-4xl animate-pulse">⚡</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-starken-primary dark:bg-dark-sidebar transition-all duration-300 z-50 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            {sidebarOpen && (
              <span className="text-xl font-bold text-white">STARK</span>
            )}
          </div>
          {sidebarOpen && (
            <p className="text-xs text-white/60 mt-1">Intelligence</p>
          )}
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item, idx) =>
            item.separator ? (
              <div key={idx} className="h-px bg-white/10 my-3" />
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  pathname === item.href
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          )}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-8 w-6 h-6 bg-starken-primary dark:bg-dark-card border-2 border-white/20 rounded-full text-white text-xs flex items-center justify-center hover:scale-110 transition-transform"
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Header */}
        <header className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              {menuItems.find(item => item.href === pathname)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-500 dark:text-dark-muted hover:text-starken-primary transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-800 dark:text-white">
                  {session?.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-dark-muted">
                  {session?.role}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 dark:text-dark-muted hover:text-red-500 transition-colors"
                title="Sair"
              >
                🚪
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

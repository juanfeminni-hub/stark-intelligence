'use client'

import { useState } from 'react'

// Dados de exemplo (depois virão da API)
const dadosFinanceiros = {
  receitas: {
    total: 54982.75,
    starken: 29833.00,
    alpha: 25149.75,
  },
  despesas: {
    total: 31869.90,
  },
  lucro: 23112.85,
  margem: 42.0,
  clientes: {
    starken: 14,
    alpha: 15,
    total: 29,
  }
}

export default function DashboardPage() {
  const [mesAtual] = useState('2025-12')

  const kpis = [
    {
      label: 'Receita Total',
      value: `R$ ${dadosFinanceiros.receitas.total.toLocaleString('pt-BR')}`,
      icon: '💰',
      color: 'from-green-500 to-emerald-600',
      change: '+53.7%',
    },
    {
      label: 'Despesas',
      value: `R$ ${dadosFinanceiros.despesas.total.toLocaleString('pt-BR')}`,
      icon: '💳',
      color: 'from-red-500 to-rose-600',
      change: '+12.0%',
    },
    {
      label: 'Lucro Líquido',
      value: `R$ ${dadosFinanceiros.lucro.toLocaleString('pt-BR')}`,
      icon: '📈',
      color: 'from-starken-primary to-starken-secondary',
      change: '+218%',
    },
    {
      label: 'Clientes Ativos',
      value: dadosFinanceiros.clientes.total.toString(),
      icon: '👥',
      color: 'from-blue-500 to-indigo-600',
      change: '+6',
    },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Visão Geral Financeira
          </h2>
          <p className="text-gray-500 dark:text-dark-muted">
            Dezembro 2025
          </p>
        </div>

        <select
          value={mesAtual}
          className="px-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-gray-800 dark:text-white"
        >
          <option value="2025-12">Dezembro 2025</option>
          <option value="2025-11">Novembro 2025</option>
          <option value="2025-10">Outubro 2025</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{kpi.icon}</span>
              <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                kpi.change.startsWith('+')
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {kpi.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {kpi.value}
            </div>
            <div className="text-sm text-gray-500 dark:text-dark-muted">
              {kpi.label}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Evolução de Receitas
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-dark-sidebar rounded-xl">
            <span className="text-gray-400 dark:text-dark-muted">
              📊 Gráfico em breve
            </span>
          </div>
        </div>

        {/* Segments */}
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Receita por Segmento
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-dark-muted">Starken</span>
                <span className="font-semibold text-gray-800 dark:text-white">
                  R$ {dadosFinanceiros.receitas.starken.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="h-3 bg-gray-100 dark:bg-dark-sidebar rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-starken-primary to-starken-secondary rounded-full"
                  style={{
                    width: `${(dadosFinanceiros.receitas.starken / dadosFinanceiros.receitas.total) * 100}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-dark-muted">Alpha Project</span>
                <span className="font-semibold text-gray-800 dark:text-white">
                  R$ {dadosFinanceiros.receitas.alpha.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="h-3 bg-gray-100 dark:bg-dark-sidebar rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  style={{
                    width: `${(dadosFinanceiros.receitas.alpha / dadosFinanceiros.receitas.total) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-dark-muted">Margem Líquida</span>
              <span className="text-2xl font-bold text-starken-primary">
                {dadosFinanceiros.margem}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-starken-primary to-starken-secondary rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Fale com o STARK</h3>
            <p className="text-white/80">
              Pergunte qualquer coisa sobre suas finanças
            </p>
          </div>
          <a
            href="/dashboard/stark"
            className="px-6 py-3 bg-white text-starken-primary font-bold rounded-xl hover:scale-105 transition-transform"
          >
            ⚡ Abrir Chat
          </a>
        </div>
      </div>
    </div>
  )
}

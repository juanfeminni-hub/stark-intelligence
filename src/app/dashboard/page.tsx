'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Dados Financeiros Completos
const dadosFinanceiros = {
  '2025-12': {
    periodo: 'Dezembro 2025',
    receitas: { total: 54982.75, starken: 29833.00, alpha: 25149.75, recebido: 0, pendente: 54982.75 },
    despesas: { total: 31869.90, pessoal: 11100, comercial: 7500, estrutura: 3009, ferramentas: 2760.90, alpha: 7500, pago: 0, pendente: 31869.90 },
    resultado: { lucro: 23112.85, margem: 42.0 },
    clientes: { starken: 14, alpha: 15, total: 29, novos: 4 }
  },
  '2025-11': {
    periodo: 'Novembro 2025',
    receitas: { total: 35768.18, starken: 19833, alpha: 15935.18, recebido: 10916, pendente: 24852.18 },
    despesas: { total: 21360.90, pessoal: 11100, comercial: 7500, estrutura: 3009, ferramentas: 2760.90, alpha: 0, pago: 21360.90, pendente: 0 },
    resultado: { lucro: 14407.28, margem: 40.3 },
    clientes: { starken: 13, alpha: 12, total: 25, novos: 3 }
  }
}

const topClientes = [
  { nome: 'Bengers - App Festival', valor: 10000, segmento: 'starken' },
  { nome: 'Brazza Hamburgueria', valor: 3000, segmento: 'alpha' },
  { nome: 'Brazza BNU', valor: 3000, segmento: 'starken' },
  { nome: 'Churrascaria Paiaguas', valor: 3149.75, segmento: 'alpha' },
  { nome: 'Fratellis Pizzaria', valor: 2500, segmento: 'alpha' },
]

const vencimentosProximos = [
  { tipo: 'despesa', nome: 'Salários Equipe', valor: 11100, dia: 5, categoria: 'pessoal' },
  { tipo: 'despesa', nome: 'Dante (Closer)', valor: 3500, dia: 5, categoria: 'comercial' },
  { tipo: 'receita', nome: 'Mortadella', valor: 2000, dia: 10, categoria: 'cliente' },
  { tipo: 'despesa', nome: 'Aluguel Sala', valor: 2800, dia: 10, categoria: 'estrutura' },
  { tipo: 'receita', nome: 'Rosa Mexicano BNU', valor: 2000, dia: 15, categoria: 'cliente' },
  { tipo: 'receita', nome: 'Rosa Mexicano Brusque', valor: 2000, dia: 15, categoria: 'cliente' },
]

const projecao6Meses = [
  { mes: 'Dez 25', receita: 54.9 },
  { mes: 'Jan 26', receita: 70.3 },
  { mes: 'Fev 26', receita: 75.3 },
  { mes: 'Mar 26', receita: 79.8 },
  { mes: 'Abr 26', receita: 87.8 },
  { mes: 'Mai 26', receita: 93.8 },
]

export default function DashboardPage() {
  const [mesAtual, setMesAtual] = useState('2025-12')
  const [saudacao, setSaudacao] = useState('Bom dia')
  const [userName, setUserName] = useState('Juan')
  const [activeTab, setActiveTab] = useState<'dia' | 'semana' | 'mes'>('dia')

  useEffect(() => {
    const hora = new Date().getHours()
    if (hora >= 12 && hora < 18) setSaudacao('Boa tarde')
    if (hora >= 18) setSaudacao('Boa noite')

    const session = localStorage.getItem('stark_session')
    if (session) {
      try {
        const parsed = JSON.parse(session)
        setUserName(parsed.name?.split(' ')[0] || 'Juan')
      } catch {}
    }
  }, [])

  const dados = dadosFinanceiros[mesAtual as keyof typeof dadosFinanceiros] || dadosFinanceiros['2025-12']

  const kpis = [
    {
      label: 'Receita Total',
      value: `R$ ${dados.receitas.total.toLocaleString('pt-BR')}`,
      icon: '💰',
      change: '+53.7%',
      positive: true,
    },
    {
      label: 'Despesas',
      value: `R$ ${dados.despesas.total.toLocaleString('pt-BR')}`,
      icon: '💳',
      change: '+12.0%',
      positive: false,
    },
    {
      label: 'Lucro Líquido',
      value: `R$ ${dados.resultado.lucro.toLocaleString('pt-BR')}`,
      icon: '📈',
      change: '+218%',
      positive: true,
    },
    {
      label: 'Clientes Ativos',
      value: dados.clientes.total.toString(),
      icon: '👥',
      change: `+${dados.clientes.novos}`,
      positive: true,
    },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* STARK Greeting Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-starken-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* STARK Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-starken-primary to-starken-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-starken-primary/30">
                  <span className="text-5xl">⚡</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-3 border-slate-900 animate-pulse" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {saudacao}, {userName}! 👋
                </h2>
                <p className="text-slate-400 mt-1">
                  STARK aqui com seu resumo financeiro
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex-1 grid grid-cols-3 gap-4 md:ml-auto md:max-w-md">
              <div className="text-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <div className="text-2xl font-bold text-white">R$ 55k</div>
                <div className="text-xs text-slate-500">Receita</div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <div className="text-2xl font-bold text-green-400">42%</div>
                <div className="text-xs text-slate-500">Margem</div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <div className="text-2xl font-bold text-white">29</div>
                <div className="text-xs text-slate-500">Clientes</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 mb-4">
            {(['dia', 'semana', 'mes'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-starken-primary text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {tab === 'dia' ? '📅 Hoje' : tab === 'semana' ? '📆 Semana' : '🗓️ Mês'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/30">
            {activeTab === 'dia' && (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📊</span>
                  <div>
                    <p className="text-white font-medium">Dezembro fechando muito bem!</p>
                    <p className="text-slate-400 text-sm">Receita de R$ 54.982 com margem de 42% - acima da meta de 30%.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <p className="text-amber-400 font-medium">Vencimentos próximos</p>
                    <p className="text-slate-400 text-sm">Salários no dia 05 (R$ 14.600) e aluguel dia 10 (R$ 2.800).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🚀</span>
                  <div>
                    <p className="text-green-400 font-medium">4 novos clientes este mês</p>
                    <p className="text-slate-400 text-sm">Alpha crescendo forte: Fabinhus, Tempero Manero, Super Dupe e Majo Sushi.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'semana' && (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-xl">💰</span>
                  <div>
                    <p className="text-green-400 font-medium">R$ 8.000 a receber</p>
                    <p className="text-slate-400 text-sm">Mortadella (dia 10), Rosa Mexicano BNU e Brusque (dia 15).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">💳</span>
                  <div>
                    <p className="text-red-400 font-medium">R$ 17.400 a pagar</p>
                    <p className="text-slate-400 text-sm">Salários (R$ 14.600) e aluguel (R$ 2.800).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">📊</span>
                  <div>
                    <p className="text-white font-medium">Saldo previsto: -R$ 9.400</p>
                    <p className="text-slate-400 text-sm">Normal para início de mês. Receitas concentradas no meio/fim.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mes' && (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📈</span>
                  <div>
                    <p className="text-white font-medium">Projeção: R$ 70k em Janeiro</p>
                    <p className="text-slate-400 text-sm">Crescimento de 27% com novos clientes Alpha e Matriz.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🎯</span>
                  <div>
                    <p className="text-starken-light font-medium">Meta Q1 2026: R$ 80k MRR</p>
                    <p className="text-slate-400 text-sm">Estamos no caminho! +5 clientes/mês no Alpha.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">💎</span>
                  <div>
                    <p className="text-purple-400 font-medium">Alpha representa 46% da receita</p>
                    <p className="text-slate-400 text-sm">Franquia crescendo rápido. Royalties de 15% compensam.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Button */}
          <div className="mt-4 flex gap-3">
            <Link
              href="/dashboard/stark"
              className="flex-1 py-3 bg-gradient-to-r from-starken-primary to-starken-secondary text-white font-semibold rounded-xl text-center hover:shadow-lg hover:shadow-starken-primary/30 transition-all hover:scale-[1.02]"
            >
              ⚡ Conversar com STARK
            </Link>
            <button className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all">
              🔔
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all hover:scale-[1.02] group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl group-hover:scale-110 transition-transform">{kpi.icon}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                kpi.positive
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {kpi.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
              {kpi.value}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {kpi.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projeção Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            📈 Projeção 6 Meses
          </h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {projecao6Meses.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-starken-primary to-starken-secondary rounded-t-lg transition-all hover:from-starken-secondary hover:to-emerald-500"
                  style={{ height: `${(item.receita / 100) * 100}%` }}
                />
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">{item.mes}</div>
                <div className="text-xs font-semibold text-slate-700 dark:text-white">R$ {item.receita}k</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clientes */}
        <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            👥 Top Clientes
          </h3>
          <div className="space-y-3">
            {topClientes.map((cliente, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    cliente.segmento === 'starken'
                      ? 'bg-starken-primary/20 text-starken-primary'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-slate-700 dark:text-white">{cliente.nome}</div>
                    <div className="text-xs text-slate-500">{cliente.segmento === 'starken' ? 'Starken' : 'Alpha'}</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-white">
                  R$ {cliente.valor.toLocaleString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vencimentos e Segmentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximos Vencimentos */}
        <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            📅 Próximos Vencimentos
          </h3>
          <div className="space-y-2">
            {vencimentosProximos.slice(0, 5).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className={`text-xl ${item.tipo === 'receita' ? '' : ''}`}>
                    {item.tipo === 'receita' ? '💰' : '💳'}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-slate-700 dark:text-white">{item.nome}</div>
                    <div className="text-xs text-slate-500">Dia {item.dia}</div>
                  </div>
                </div>
                <div className={`text-sm font-bold ${
                  item.tipo === 'receita' ? 'text-green-500' : 'text-red-400'
                }`}>
                  {item.tipo === 'receita' ? '+' : '-'}R$ {item.valor.toLocaleString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Receita por Segmento */}
        <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            🏢 Receita por Segmento
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-starken-primary" />
                  <span className="text-slate-600 dark:text-slate-400">Starken Tecnologia</span>
                </div>
                <span className="font-bold text-slate-800 dark:text-white">
                  R$ {dados.receitas.starken.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-starken-primary to-starken-secondary rounded-full transition-all"
                  style={{ width: `${(dados.receitas.starken / dados.receitas.total) * 100}%` }}
                />
              </div>
              <div className="text-xs text-slate-500 mt-1">{dados.clientes.starken} clientes • 100% receita própria</div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-slate-600 dark:text-slate-400">Alpha Project</span>
                </div>
                <span className="font-bold text-slate-800 dark:text-white">
                  R$ {dados.receitas.alpha.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all"
                  style={{ width: `${(dados.receitas.alpha / dados.receitas.total) * 100}%` }}
                />
              </div>
              <div className="text-xs text-slate-500 mt-1">{dados.clientes.alpha} clientes • 15% royalties Alpha</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Margem Líquida</span>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-starken-primary">{dados.resultado.margem}%</span>
              <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">Meta: 30%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

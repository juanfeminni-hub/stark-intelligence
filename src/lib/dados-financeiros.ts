// Dados Financeiros Completos - STARK Intelligence
// Migrado do sistema starken-financeiro

export interface Cliente {
  nome: string
  valor: number
  tipo: 'mrr' | 'tcv' | 'projeto'
  segmento: 'starken' | 'alpha'
  status: 'ativo' | 'novo' | 'inativo'
  vencimento?: number // dia do mês
}

export interface Despesa {
  nome: string
  valor: number
  categoria: 'pessoal' | 'comercial' | 'estrutura' | 'ferramentas' | 'alpha'
  vencimento: number
  recorrente: boolean
}

export interface DadosMensais {
  periodo: string
  receitas: {
    total: number
    starken: number
    alpha: number
    recebido: number
    pendente: number
  }
  despesas: {
    total: number
    pessoal: number
    comercial: number
    estrutura: number
    ferramentas: number
    alpha: number
    pago: number
    pendente: number
  }
  resultado: {
    lucro: number
    margem: number
  }
  clientes: {
    starken: number
    alpha: number
    total: number
    novos: number
  }
}

// Clientes Starken Tecnologia
export const clientesStarken: Cliente[] = [
  { nome: 'Mortadella Blumenau', valor: 2000, tipo: 'mrr', segmento: 'starken', status: 'ativo', vencimento: 10 },
  { nome: 'Rosa Mexicano Blumenau', valor: 2000, tipo: 'mrr', segmento: 'starken', status: 'ativo', vencimento: 15 },
  { nome: 'Rosa Mexicano Brusque', valor: 2000, tipo: 'mrr', segmento: 'starken', status: 'ativo', vencimento: 15 },
  { nome: 'Hamburgueria Feio', valor: 2000, tipo: 'mrr', segmento: 'starken', status: 'ativo', vencimento: 10 },
  { nome: 'Academia São Pedro', valor: 1080, tipo: 'mrr', segmento: 'starken', status: 'ativo', vencimento: 5 },
  { nome: 'JPR Móveis Rústicos', valor: 2000, tipo: 'mrr', segmento: 'starken', status: 'ativo', vencimento: 20 },
  { nome: 'Realizzati Móveis', valor: 2500, tipo: 'mrr', segmento: 'starken', status: 'ativo', vencimento: 15 },
  { nome: 'Suprema Pizza', valor: 2000, tipo: 'mrr', segmento: 'starken', status: 'ativo', vencimento: 10 },
  { nome: 'Shield Car Blumenau', valor: 297, tipo: 'mrr', segmento: 'starken', status: 'ativo', vencimento: 5 },
  { nome: 'Estilo Tulipa', valor: 659, tipo: 'mrr', segmento: 'starken', status: 'ativo', vencimento: 10 },
  { nome: 'Alexandria Burger', valor: 2000, tipo: 'mrr', segmento: 'starken', status: 'ativo', vencimento: 15 },
  { nome: 'Divino Tempero', valor: 1000, tipo: 'mrr', segmento: 'starken', status: 'ativo', vencimento: 10 },
  { nome: 'Dommus Smart Home', valor: 297, tipo: 'mrr', segmento: 'starken', status: 'ativo', vencimento: 5 },
  { nome: 'Brazza BNU', valor: 3000, tipo: 'mrr', segmento: 'starken', status: 'ativo', vencimento: 20 },
  { nome: 'The Garrison', valor: 1500, tipo: 'mrr', segmento: 'starken', status: 'novo', vencimento: 15 },
  { nome: 'Arena Gourmet', valor: 1000, tipo: 'mrr', segmento: 'starken', status: 'novo', vencimento: 10 },
  { nome: 'Bengers - App Festival', valor: 10000, tipo: 'projeto', segmento: 'starken', status: 'ativo', vencimento: 25 },
]

// Clientes Alpha Project
export const clientesAlpha: Cliente[] = [
  { nome: 'Oca Restaurante', valor: 2000, tipo: 'mrr', segmento: 'alpha', status: 'ativo', vencimento: 10 },
  { nome: 'Madrugão Lanches', valor: 2000, tipo: 'mrr', segmento: 'alpha', status: 'ativo', vencimento: 10 },
  { nome: 'Saporitto Pizzaria', valor: 1500, tipo: 'mrr', segmento: 'alpha', status: 'ativo', vencimento: 15 },
  { nome: 'Fratellis Pizzaria', valor: 2500, tipo: 'mrr', segmento: 'alpha', status: 'ativo', vencimento: 15 },
  { nome: 'Brazza Hamburgueria', valor: 3000, tipo: 'mrr', segmento: 'alpha', status: 'ativo', vencimento: 20 },
  { nome: 'Fabinhus Restaurante', valor: 1000, tipo: 'mrr', segmento: 'alpha', status: 'novo', vencimento: 10 },
  { nome: 'Tempero Manero Grill', valor: 1000, tipo: 'mrr', segmento: 'alpha', status: 'novo', vencimento: 10 },
  { nome: 'Super Dupe Hamburgueria BC', valor: 2000, tipo: 'mrr', segmento: 'alpha', status: 'novo', vencimento: 15 },
  { nome: 'Majo Sushi', valor: 2000, tipo: 'mrr', segmento: 'alpha', status: 'novo', vencimento: 10 },
  { nome: 'Aseyori', valor: 2500, tipo: 'mrr', segmento: 'alpha', status: 'novo', vencimento: 15 },
  { nome: 'Temakeria', valor: 1500, tipo: 'mrr', segmento: 'alpha', status: 'novo', vencimento: 10 },
  { nome: 'Churrascaria Paiaguas', valor: 3149.75, tipo: 'tcv', segmento: 'alpha', status: 'ativo', vencimento: 20 },
  { nome: 'Matriz Cliente 1', valor: 3000, tipo: 'tcv', segmento: 'alpha', status: 'ativo', vencimento: 25 },
  { nome: 'Matriz Cliente 2', valor: 3000, tipo: 'tcv', segmento: 'alpha', status: 'ativo', vencimento: 25 },
  { nome: 'Matriz Cliente 3', valor: 3000, tipo: 'tcv', segmento: 'alpha', status: 'ativo', vencimento: 25 },
]

// Despesas Fixas
export const despesasFixas: Despesa[] = [
  // Pessoal
  { nome: 'Ederson (Dev Sênor)', valor: 3200, categoria: 'pessoal', vencimento: 5, recorrente: true },
  { nome: 'Victor (Developer)', valor: 3000, categoria: 'pessoal', vencimento: 5, recorrente: true },
  { nome: 'Igor (Developer)', valor: 2300, categoria: 'pessoal', vencimento: 5, recorrente: true },
  { nome: 'Kim (Designer)', valor: 1300, categoria: 'pessoal', vencimento: 5, recorrente: true },
  { nome: 'Erick (Developer)', valor: 1300, categoria: 'pessoal', vencimento: 5, recorrente: true },
  // Comercial
  { nome: 'Dante (Closer)', valor: 3500, categoria: 'comercial', vencimento: 5, recorrente: true },
  { nome: 'Nathan (SDR)', valor: 2000, categoria: 'comercial', vencimento: 5, recorrente: true },
  { nome: 'João (SDR)', valor: 2000, categoria: 'comercial', vencimento: 5, recorrente: true },
  // Estrutura
  { nome: 'Aluguel Sala', valor: 2800, categoria: 'estrutura', vencimento: 10, recorrente: true },
  { nome: 'Celesc (Energia)', valor: 100, categoria: 'estrutura', vencimento: 15, recorrente: true },
  { nome: 'Internet Claro', valor: 109, categoria: 'estrutura', vencimento: 20, recorrente: true },
  // Ferramentas
  { nome: 'Claude Code', valor: 500, categoria: 'ferramentas', vencimento: 1, recorrente: true },
  { nome: 'ClickUp', valor: 350, categoria: 'ferramentas', vencimento: 1, recorrente: true },
  { nome: 'VPS Hostinger', valor: 200, categoria: 'ferramentas', vencimento: 5, recorrente: true },
  { nome: 'Lovable', valor: 130, categoria: 'ferramentas', vencimento: 1, recorrente: true },
  { nome: 'Adobe', valor: 110, categoria: 'ferramentas', vencimento: 10, recorrente: true },
  { nome: 'Criativivo', valor: 100, categoria: 'ferramentas', vencimento: 15, recorrente: true },
  { nome: 'CapCut', valor: 65.90, categoria: 'ferramentas', vencimento: 1, recorrente: true },
  { nome: 'Canva Pro', valor: 35, categoria: 'ferramentas', vencimento: 1, recorrente: true },
  { nome: 'Railway', valor: 35, categoria: 'ferramentas', vencimento: 1, recorrente: true },
  { nome: 'Netlify', valor: 35, categoria: 'ferramentas', vencimento: 1, recorrente: true },
  // Alpha
  { nome: 'Repasse Alpha', valor: 7500, categoria: 'alpha', vencimento: 10, recorrente: true },
]

// Dados Mensais Históricos
export const dadosMensais: Record<string, DadosMensais> = {
  '2025-10': {
    periodo: 'Outubro 2025',
    receitas: { total: 46365.05, starken: 22833, alpha: 23532.05, recebido: 41869.90, pendente: 4495.15 },
    despesas: { total: 43047.07, pessoal: 11100, comercial: 7500, estrutura: 3009, ferramentas: 13938.07, alpha: 7500, pago: 43047.07, pendente: 0 },
    resultado: { lucro: 3317.98, margem: 7.2 },
    clientes: { starken: 12, alpha: 10, total: 22, novos: 3 }
  },
  '2025-11': {
    periodo: 'Novembro 2025',
    receitas: { total: 35768.18, starken: 19833, alpha: 15935.18, recebido: 10916, pendente: 24852.18 },
    despesas: { total: 21360.90, pessoal: 11100, comercial: 7500, estrutura: 3009, ferramentas: 2760.90, alpha: 0, pago: 21360.90, pendente: 0 },
    resultado: { lucro: 14407.28, margem: 40.3 },
    clientes: { starken: 13, alpha: 12, total: 25, novos: 3 }
  },
  '2025-12': {
    periodo: 'Dezembro 2025',
    receitas: { total: 54982.75, starken: 29833, alpha: 25149.75, recebido: 0, pendente: 54982.75 },
    despesas: { total: 31869.90, pessoal: 11100, comercial: 7500, estrutura: 3009, ferramentas: 2760.90, alpha: 7500, pago: 0, pendente: 31869.90 },
    resultado: { lucro: 23112.85, margem: 42.0 },
    clientes: { starken: 14, alpha: 15, total: 29, novos: 4 }
  },
  '2026-01': {
    periodo: 'Janeiro 2026',
    receitas: { total: 70333, starken: 32333, alpha: 38000, recebido: 0, pendente: 70333 },
    despesas: { total: 31869.90, pessoal: 11100, comercial: 7500, estrutura: 3009, ferramentas: 2760.90, alpha: 7500, pago: 0, pendente: 31869.90 },
    resultado: { lucro: 38463.10, margem: 54.7 },
    clientes: { starken: 16, alpha: 18, total: 34, novos: 5 }
  },
}

export function getMesAtual(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function getDadosMes(mes: string): DadosMensais | null {
  return dadosMensais[mes] || null
}

export function getTopClientes(limit: number = 5): Cliente[] {
  const todos = [...clientesStarken, ...clientesAlpha]
  return todos.sort((a, b) => b.valor - a.valor).slice(0, limit)
}

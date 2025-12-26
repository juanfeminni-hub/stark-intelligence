'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const suggestions = [
  { icon: '📊', text: 'Resumo de dezembro' },
  { icon: '💳', text: 'Vencimentos da semana' },
  { icon: '📈', text: 'Compare Starken vs Alpha' },
  { icon: '🔮', text: 'Projeção 6 meses' },
]

const quickActions = [
  { icon: '📋', label: 'DRE', action: 'Gere o DRE de dezembro' },
  { icon: '⚠️', label: 'Alertas', action: 'Quais alertas ativos?' },
  { icon: '👥', label: 'Clientes', action: 'Top 5 clientes' },
  { icon: '💰', label: 'Margem', action: 'Como está a margem?' },
]

export default function StarkPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'E aí! Sou o STARK, seu CFO Virtual. 🔥\n\nDezembro tá fechando muito bem - R$ 55k de receita com 42% de margem. A Alpha já representa quase metade do faturamento!\n\nMe pergunta qualquer coisa sobre as finanças.',
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      })

      const data = await response.json()

      await new Promise(resolve => setTimeout(resolve, 500))
      setIsTyping(false)

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || 'Desculpa, tive um problema aqui. Tenta de novo?',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Ops, erro de conexão. Verifica a internet e tenta novamente.',
        timestamp: new Date(),
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-starken-primary via-emerald-500 to-starken-secondary" />
          <div className="relative p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                  <span className="text-4xl">⚡</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">STARK</h2>
                <p className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  CFO Virtual • Sempre online
                </p>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10">
                  <span className="text-lg">📊</span>
                </button>
                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10">
                  <span className="text-lg">⚙️</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2 ml-1">
                    <div className="w-6 h-6 bg-gradient-to-br from-starken-primary to-starken-secondary rounded-lg flex items-center justify-center">
                      <span className="text-xs">⚡</span>
                    </div>
                    <span className="text-sm font-medium text-starken-light">STARK</span>
                    <span className="text-xs text-slate-500">
                      {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
                <div
                  className={`rounded-2xl p-4 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-starken-primary to-starken-secondary text-white rounded-tr-sm'
                      : 'bg-slate-800/80 backdrop-blur-sm text-white border border-slate-700/50 rounded-tl-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                </div>
                {msg.role === 'user' && (
                  <div className="text-right mt-1 mr-1">
                    <span className="text-xs text-slate-500">
                      {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl rounded-tl-sm p-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-starken-primary to-starken-secondary rounded-lg flex items-center justify-center">
                    <span className="text-xs animate-pulse">⚡</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-starken-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-starken-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-starken-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length < 3 && (
          <div className="px-6 pb-4">
            <p className="text-xs text-slate-500 mb-3">Sugestões rápidas</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion.text)}
                  className="group px-4 py-2 bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/50 hover:border-starken-primary/50 rounded-xl text-sm text-slate-300 hover:text-white transition-all flex items-center gap-2"
                >
                  <span className="group-hover:scale-110 transition-transform">{suggestion.icon}</span>
                  {suggestion.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pergunte sobre suas finanças..."
                disabled={isLoading}
                className="w-full px-5 py-4 bg-slate-800/60 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-starken-primary/50 focus:ring-2 focus:ring-starken-primary/20 transition-all disabled:opacity-50"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-starken-primary transition-colors">
                <span className="text-lg">🎤</span>
              </button>
            </div>
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="px-6 py-4 bg-gradient-to-r from-starken-primary to-starken-secondary hover:from-starken-secondary hover:to-starken-primary text-white font-semibold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-starken-primary/20 hover:shadow-starken-primary/40 hover:scale-105"
            >
              {isLoading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <span>Enviar</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-72 space-y-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 border border-slate-700/50">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Status Financeiro</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm">Receita Dez</span>
              <span className="text-white font-semibold">R$ 54.982</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm">Margem</span>
              <span className="text-green-400 font-semibold">42%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm">Clientes</span>
              <span className="text-white font-semibold">29</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400">Saúde financeira ótima</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 border border-slate-700/50">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(action.action)}
                className="p-3 bg-slate-800/60 hover:bg-slate-700/80 rounded-xl border border-slate-700/50 hover:border-starken-primary/50 transition-all group"
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{action.icon}</div>
                <div className="text-xs text-slate-400 group-hover:text-white transition-colors">{action.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 border border-slate-700/50">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Próximos Vencimentos</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-slate-800/40 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-red-400">💳</span>
                <span className="text-sm text-slate-300">Salários</span>
              </div>
              <span className="text-xs text-red-400">Dia 05</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-800/40 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-green-400">💰</span>
                <span className="text-sm text-slate-300">Mortadella</span>
              </div>
              <span className="text-xs text-green-400">Dia 10</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-800/40 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-green-400">💰</span>
                <span className="text-sm text-slate-300">Rosa Mexicano</span>
              </div>
              <span className="text-xs text-green-400">Dia 15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

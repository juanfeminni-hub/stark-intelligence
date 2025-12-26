'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const suggestions = [
  'Qual o resultado de dezembro?',
  'Quais contas vencem essa semana?',
  'Compare Starken vs Alpha',
  'Me dê um resumo financeiro',
]

export default function StarkPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'E aí! Sou o STARK, seu CFO Virtual. Cara, dezembro tá bem tranquilo - temos quase R$ 55k pra entrar e uma margem de 42%. Me pergunta qualquer coisa sobre as finanças!',
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || 'Desculpa, tive um problema aqui. Tenta de novo?',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch {
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
    <div className="h-[calc(100vh-140px)] flex flex-col bg-gradient-to-br from-dark-bg via-dark-card to-dark-sidebar rounded-2xl overflow-hidden border border-dark-border">
      {/* Header */}
      <div className="bg-gradient-to-r from-starken-primary to-starken-secondary p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-3xl">⚡</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">STARK</h2>
            <p className="text-white/70 text-sm">CFO Virtual • Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user'
                  ? 'bg-starken-primary text-white'
                  : 'bg-dark-card text-white border border-dark-border'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">⚡</span>
                  <span className="font-semibold text-starken-light">STARK</span>
                </div>
              )}
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <div className={`text-xs mt-2 ${
                msg.role === 'user' ? 'text-white/60' : 'text-dark-muted'
              }`}>
                {msg.timestamp.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-dark-card text-white border border-dark-border rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <span className="text-lg animate-pulse">⚡</span>
                <span className="text-dark-muted">STARK está pensando...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length < 3 && (
        <div className="px-6 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(suggestion)}
                className="px-4 py-2 bg-dark-card border border-dark-border rounded-full text-sm text-dark-muted hover:text-white hover:border-starken-primary transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-dark-border bg-dark-sidebar">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Pergunte sobre suas finanças..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-white placeholder-dark-muted focus:outline-none focus:border-starken-primary transition-colors disabled:opacity-50"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-starken-primary to-starken-secondary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? '...' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  )
}

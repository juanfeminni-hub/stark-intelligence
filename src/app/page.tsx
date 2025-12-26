'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-starken-primary via-starken-secondary to-starken-light">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            <span className="text-2xl font-bold text-white">STARK Intelligence</span>
          </div>
          <Link
            href="/login"
            className="px-6 py-2 bg-white text-starken-primary font-semibold rounded-full hover:bg-opacity-90 transition-all"
          >
            Entrar
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slideUp">
            Seu CFO Virtual
            <br />
            <span className="text-starken-light">com IA</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 animate-fadeIn">
            Converse naturalmente sobre suas finanças.
            Receba insights, alertas e relatórios automáticos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp">
            <Link
              href="/login"
              className="px-8 py-4 bg-white text-starken-primary font-bold text-lg rounded-xl hover:scale-105 transition-transform shadow-lg"
            >
              Começar Agora
            </Link>
            <a
              href="#features"
              className="px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-all border border-white/30"
            >
              Ver Recursos
            </a>
          </div>
        </div>

        {/* Features */}
        <section id="features" className="max-w-7xl mx-auto mt-32 grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-white mb-2">Chat Natural</h3>
            <p className="text-white/70">
              Pergunte "Quanto tenho a receber?" e receba respostas instantâneas do STARK.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-xl font-bold text-white mb-2">Alertas Proativos</h3>
            <p className="text-white/70">
              Vencimentos, anomalias e oportunidades identificadas automaticamente.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Relatórios IA</h3>
            <p className="text-white/70">
              DRE, projeções e análises geradas automaticamente com insights.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-4xl mx-auto mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-white">R$ 2,5M+</div>
            <div className="text-white/60">Gerenciados</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white">500+</div>
            <div className="text-white/60">Alertas/mês</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white">99%</div>
            <div className="text-white/60">Precisão</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white">24/7</div>
            <div className="text-white/60">Disponível</div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto mt-32 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para ter um CFO Virtual?
          </h2>
          <Link
            href="/login"
            className="inline-block px-10 py-5 bg-white text-starken-primary font-bold text-xl rounded-xl hover:scale-105 transition-transform shadow-lg"
          >
            Começar Gratuitamente
          </Link>
          <p className="text-white/60 mt-4">
            14 dias grátis. Sem cartão de crédito.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="text-white font-semibold">STARK Intelligence</span>
          </div>
          <p className="text-white/60 text-sm">
            Desenvolvido por Starken Tecnologia
          </p>
        </div>
      </footer>
    </div>
  )
}

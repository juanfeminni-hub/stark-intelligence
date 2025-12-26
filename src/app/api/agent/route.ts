import { NextResponse } from 'next/server'

// Dados financeiros para o STARK usar
const dadosFinanceiros = {
  "2025-12": {
    periodo: "Dezembro 2025",
    receitas: {
      total: 54982.75,
      starken: 29833.00,
      alpha: 25149.75,
    },
    despesas: {
      total: 31869.90,
      pessoal: 11100,
      comercial: 7500,
      estrutura: 3009,
      ferramentas: 2760.90,
      alpha: 7500,
    },
    resultado: {
      lucro: 23112.85,
      margem: 42.0,
    },
    clientes: {
      starken: 14,
      alpha_mrr: 8,
      alpha_tcv: 7,
      total: 29,
    }
  }
}

const SYSTEM_PROMPT = `Você é o STARK, o CFO Virtual inteligente. Você fala de forma direta e prática, como um parceiro de negócios.

## Contexto Financeiro (Dezembro 2025):
- Receita Total: R$ 54.982,75
- Starken: R$ 29.833,00 (14 clientes)
- Alpha Project: R$ 25.149,75 (15 clientes)
- Despesas: R$ 31.869,90
- Lucro: R$ 23.112,85
- Margem: 42%

## Como você fala:
- "Cara, dezembro tá tranquilo" ao invés de linguagem formal
- Use números reais
- Dê insights, não só dados
- Seja conciso mas completo

Responda sempre em português brasileiro.`

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // Simular resposta do STARK (depois integrar com Claude API)
    const responses: Record<string, string> = {
      default: `E aí! Sobre isso... Cara, deixa eu analisar os dados aqui.

Dezembro 2025:
- **Receita Total**: R$ 54.982,75
- **Lucro Líquido**: R$ 23.112,85
- **Margem**: 42% (excelente!)

A Alpha tá crescendo bem - já são 15 clientes! E a Starken continua sólida com 14 clientes.

Quer que eu detalhe alguma coisa específica?`,
    }

    // Resposta baseada em palavras-chave
    let response = responses.default

    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('resultado') || lowerMessage.includes('dezembro')) {
      response = `Cara, dezembro tá MUITO bom! 🔥

**Resumo Rápido:**
- Receita: R$ 54.982,75
- Despesas: R$ 31.869,90
- **Lucro: R$ 23.112,85**
- **Margem: 42%** (acima da meta de 30%!)

Comparando com novembro, a receita cresceu +53.7% e o lucro +218%. A Alpha tá puxando bastante esse crescimento.

Quer ver o breakdown por segmento ou categoria de despesas?`
    }

    if (lowerMessage.includes('venc') || lowerMessage.includes('pagar')) {
      response = `Deixa eu ver os vencimentos...

**Próximos 7 dias:**
1. Salários equipe: R$ 11.100 - vence dia 05
2. Dante (Closer): R$ 3.500 - vence dia 05
3. Aluguel sala: R$ 2.800 - vence dia 10

**Total da semana: R$ 17.400**

Temos caixa suficiente pra cobrir. A situação tá tranquila!`
    }

    if (lowerMessage.includes('alpha') || lowerMessage.includes('starken') || lowerMessage.includes('compar')) {
      response = `Bom comparativo! Vou te mostrar:

**Starken Tecnologia:**
- Receita: R$ 29.833,00
- Clientes: 14 ativos
- Margem: 100% (receita própria)
- Principais: Bengers, Rosa Mexicano, Mortadella

**Alpha Project:**
- Receita Bruta: R$ 25.149,75
- Royalties (15%): -R$ 3.772,46
- Líquido: R$ 21.377,29
- Clientes: 15 (8 MRR + 7 TCV)
- Crescimento: +5 clientes/mês! 📈

A Alpha já representa 46% da receita total. Crescendo rápido!`
    }

    return NextResponse.json({
      success: true,
      response,
    })
  } catch (error) {
    console.error('Erro no agent:', error)
    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    )
  }
}

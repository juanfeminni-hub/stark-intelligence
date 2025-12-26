import { NextResponse } from 'next/server'

const topClientes = [
  { nome: 'Bengers - App Festival', valor: 10000, segmento: 'Starken' },
  { nome: 'Brazza Hamburgueria', valor: 3000, segmento: 'Alpha' },
  { nome: 'Brazza BNU', valor: 3000, segmento: 'Starken' },
  { nome: 'Churrascaria Paiaguas', valor: 3149.75, segmento: 'Alpha' },
  { nome: 'Fratellis Pizzaria', valor: 2500, segmento: 'Alpha' },
]

const projecoes = [
  { mes: 'Dez 2025', receita: 54982.75 },
  { mes: 'Jan 2026', receita: 70333 },
  { mes: 'Fev 2026', receita: 75333 },
  { mes: 'Mar 2026', receita: 79833 },
  { mes: 'Abr 2026', receita: 87833 },
  { mes: 'Mai 2026', receita: 93833 },
]

export async function POST(request: Request) {
  try {
    const { message } = await request.json()
    const lowerMessage = message.toLowerCase()

    let response = ''

    if (lowerMessage.includes('resultado') || lowerMessage.includes('dezembro') || lowerMessage.includes('resumo')) {
      response = `Cara, dezembro tá MUITO bom! 🔥

**Resumo Rápido:**
- Receita: R$ 54.982,75
- Despesas: R$ 31.869,90
- **Lucro: R$ 23.112,85**
- **Margem: 42%** (acima da meta de 30%!)

Comparando com novembro:
- Receita: +53.7%
- Lucro: +218%
- Clientes: +4 novos

A Alpha tá puxando bastante esse crescimento. Já são 15 clientes no projeto!

Quer ver o breakdown por segmento ou categoria de despesas?`
    }
    else if (lowerMessage.includes('venc') || lowerMessage.includes('pagar') || lowerMessage.includes('semana')) {
      response = `Deixa eu ver os vencimentos da semana... 📅

**Dia 05:**
- 💳 Salários equipe: R$ 11.100
- 💳 Dante (Closer): R$ 3.500
- 💳 Nathan + João (SDRs): R$ 4.000

**Dia 10:**
- 💰 Mortadella: R$ 2.000
- 💳 Aluguel sala: R$ 2.800
- 💰 Hamburgueria Feio: R$ 2.000

**Dia 15:**
- 💰 Rosa Mexicano BNU: R$ 2.000
- 💰 Rosa Mexicano Brusque: R$ 2.000
- 💰 Realizzati: R$ 2.500

**Resumo:**
- A pagar: R$ 21.400
- A receber: R$ 10.500
- Saldo semana: -R$ 10.900

Normal pro início do mês. As receitas estão mais concentradas no meio/fim. Situação tá sob controle!`
    }
    else if (lowerMessage.includes('alpha') || lowerMessage.includes('starken') || lowerMessage.includes('compar')) {
      response = `Bom comparativo! Vou te mostrar: 📊

**Starken Tecnologia:**
- Receita: R$ 29.833,00 (54%)
- Clientes: 14 ativos
- Margem: 100% (receita própria)
- Ticket Médio: R$ 2.130
- Top 3: Bengers (R$ 10k), Brazza BNU (R$ 3k), Realizzati (R$ 2.5k)

**Alpha Project:**
- Receita Bruta: R$ 25.149,75 (46%)
- Royalties (15%): -R$ 3.772,46
- Líquido: R$ 21.377,29
- Clientes: 15 (8 MRR + 7 TCV)
- Ticket Médio: R$ 1.676
- Crescimento: +5 clientes/mês! 📈

**Insight:**
A Alpha já representa 46% da receita total e tá crescendo MUITO rápido. Com os royalties de 15%, ainda fica muito vantajoso. Se mantiver +5 clientes/mês, em 6 meses pode ultrapassar a Starken!`
    }
    else if (lowerMessage.includes('proje') || lowerMessage.includes('futuro') || lowerMessage.includes('6 meses')) {
      response = `Vou te mostrar a projeção dos próximos 6 meses! 🔮

**Projeção de Receita:**
${projecoes.map(p => `- ${p.mes}: R$ ${p.receita.toLocaleString('pt-BR')}`).join('\n')}

**Crescimento:**
- De Dez/25 a Mai/26: +70.6%
- Média mensal: +11.8%

**O que vai puxar esse crescimento:**
1. Alpha crescendo +5 clientes/mês
2. Renovações TCV no Q1 (12 contratos)
3. Novos clientes Starken (The Garrison, Arena Gourmet)
4. Bengers pagando última parcela

**Meta Q1 2026: R$ 80k MRR**
Estamos no caminho certo! 🚀`
    }
    else if (lowerMessage.includes('dre') || lowerMessage.includes('demonstra')) {
      response = `DRE - Dezembro 2025 📋

**RECEITA BRUTA**
- Starken Tecnologia: R$ 29.833,00
- Alpha Project: R$ 25.149,75
- **Total: R$ 54.982,75**

**(-) DEDUÇÕES**
- Royalties Alpha (15%): R$ 3.772,46
- **Receita Líquida: R$ 51.210,29**

**(-) DESPESAS OPERACIONAIS**
- Pessoal: R$ 11.100,00 (21%)
- Comercial: R$ 7.500,00 (15%)
- Estrutura: R$ 3.009,00 (6%)
- Ferramentas: R$ 2.760,90 (5%)
- Repasse Alpha: R$ 7.500,00 (15%)
- **Total: R$ 31.869,90**

**RESULTADO**
- **Lucro Operacional: R$ 19.340,39**
- **Margem Operacional: 37.8%**

**Lucro Líquido: R$ 23.112,85**
**Margem Líquida: 42%** ✅

Acima da meta de 30%! Tá EXCELENTE.`
    }
    else if (lowerMessage.includes('alert') || lowerMessage.includes('aten')) {
      response = `Alertas ativos no momento! ⚠️

**🔴 Alta Prioridade:**
- Vencimentos dia 05: R$ 18.600 (salários + comercial)

**🟡 Média Prioridade:**
- Aluguel vence dia 10: R$ 2.800
- 3 clientes Alpha sem confirmação de pagamento

**🟢 Informativo:**
- 4 novos clientes este mês! 🎉
- Margem 42% (acima da meta)
- Receita +53.7% vs novembro

**Ações Recomendadas:**
1. Garantir caixa para folha (dia 05)
2. Cobrar clientes Alpha pendentes
3. Preparar renovações TCV Janeiro

Tudo sob controle, mas fique de olho nos vencimentos do dia 05!`
    }
    else if (lowerMessage.includes('cliente') || lowerMessage.includes('top') || lowerMessage.includes('maior')) {
      response = `Top 5 clientes em dezembro! 👥

${topClientes.map((c, i) => `**${i + 1}. ${c.nome}**\n   - Valor: R$ ${c.valor.toLocaleString('pt-BR')}\n   - Segmento: ${c.segmento}`).join('\n\n')}

**Concentração:**
- Top 5 = R$ 21.649,75 (39% da receita)
- Bengers sozinho = 18% da receita

**Observação:**
Bengers é um projeto pontual (App Festival). Quando acabar, precisamos compensar com novos clientes. A boa notícia é que a Alpha tá crescendo forte!`
    }
    else if (lowerMessage.includes('margem') || lowerMessage.includes('lucro')) {
      response = `Análise de Margem - Dezembro 2025 💰

**Margem Líquida: 42%**
Meta: 30% ✅ (superamos em 12 pontos!)

**Evolução:**
- Outubro: 7.2%
- Novembro: 40.3%
- Dezembro: 42% 📈

**Por que melhorou tanto?**
1. Receita cresceu +53.7%
2. Despesas controladas (+12%)
3. Mix de clientes mais rentável
4. Alpha sem repasse em Nov (ajuste)

**Estrutura de Custos:**
- Pessoal: 21% (R$ 11.1k)
- Comercial: 15% (R$ 7.5k)
- Estrutura: 6% (R$ 3k)
- Ferramentas: 5% (R$ 2.7k)
- Alpha: 15% (R$ 7.5k)

Tá saudável! Se manter acima de 30%, tamos bem.`
    }
    else {
      response = `E aí! Sobre "${message}"... 🤔

Cara, deixa eu analisar os dados aqui.

**Dezembro 2025:**
- Receita Total: R$ 54.982,75
- Lucro Líquido: R$ 23.112,85
- Margem: 42% (excelente!)
- Clientes: 29 ativos

A Alpha tá crescendo bem - já são 15 clientes! E a Starken continua sólida com 14 clientes.

**Posso te ajudar com:**
- 📊 Resumo de dezembro
- 💳 Vencimentos da semana
- 📈 Comparativo Starken vs Alpha
- 🔮 Projeção 6 meses
- 📋 DRE completo
- ⚠️ Alertas ativos
- 👥 Top clientes
- 💰 Análise de margem

O que você quer saber?`
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

import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import RotaHero from '../components/RotaHero.jsx'

const TABS = [
  { id: 'entrar', label: 'Entrar' },
  { id: 'criar', label: 'Criar conta' },
]

function formatarTelefone(valor) {
  const digitos = valor.replace(/\D/g, '').slice(0, 11)
  const ddd = digitos.slice(0, 2)
  const parte1 = digitos.slice(2, 7)
  const parte2 = digitos.slice(7, 11)
  if (digitos.length <= 2) return ddd
  if (digitos.length <= 7) return `(${ddd}) ${parte1}`
  return `(${ddd}) ${parte1}-${parte2}`
}

export default function AcessoPage() {
  const navegar = useNavigate()
  const [aba, setAba] = useState('entrar')
  const [etapa, setEtapa] = useState('telefone') // 'telefone' | 'codigo'
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [codigo, setCodigo] = useState(['', '', '', ''])
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const inputsCodigo = useRef([])

  const telefoneValido = telefone.replace(/\D/g, '').length === 11
  const nomeValido = aba === 'entrar' || nome.trim().length > 1

  function trocarAba(novaAba) {
    setAba(novaAba)
    setEtapa('telefone')
    setErro('')
  }

  async function enviarCodigo(e) {
    e.preventDefault()
    if (!telefoneValido || !nomeValido) {
      setErro(
        !nomeValido
          ? 'Informe seu nome para criar a conta.'
          : 'Informe um telefone com DDD, com 11 dígitos.',
      )
      return
    }
    setErro('')
    setEnviando(true)

    // TODO: integrar com o endpoint do Django REST Framework, algo como:
    // await api.post('/auth/codigo/', { telefone, nome, modo: aba })
    await new Promise((resolve) => setTimeout(resolve, 700))

    setEnviando(false)
    setEtapa('codigo')
    setTimeout(() => inputsCodigo.current[0]?.focus(), 50)
  }

  function atualizarDigito(indice, valor) {
    const digito = valor.replace(/\D/g, '').slice(-1)
    const novoCodigo = [...codigo]
    novoCodigo[indice] = digito
    setCodigo(novoCodigo)
    if (digito && indice < 3) {
      inputsCodigo.current[indice + 1]?.focus()
    }
  }

  function voltarParaDigito(indice, e) {
    if (e.key === 'Backspace' && !codigo[indice] && indice > 0) {
      inputsCodigo.current[indice - 1]?.focus()
    }
  }

  async function confirmarCodigo(e) {
    e.preventDefault()
    if (codigo.some((d) => d === '')) {
      setErro('Digite os 4 dígitos recebidos por SMS.')
      return
    }
    setErro('')
    setEnviando(true)

    // TODO: await api.post('/auth/confirmar/', { telefone, codigo: codigo.join('') })
    await new Promise((resolve) => setTimeout(resolve, 700))

    setEnviando(false)
    navegar('/viagens')
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-sand font-body text-ink md:flex-row">
      {/* painel da rota — hero, oculto em telas muito pequenas para priorizar o formulário */}
      <div className="hidden md:block md:w-[44%] lg:w-[38%]">
        <RotaHero />
      </div>
      <div className="block h-40 w-full md:hidden">
        <RotaHero />
      </div>

      {/* painel de acesso */}
      <div className="flex flex-1 items-center justify-center px-6 py-10 md:px-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex gap-8 border-b border-ink/10">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => trocarAba(tab.id)}
                className={`relative pb-3 font-body text-base transition-colors ${
                  aba === tab.id ? 'text-ink' : 'text-ink/40 hover:text-ink/70'
                }`}
              >
                {tab.label}
                {aba === tab.id && (
                  <span className="absolute -bottom-px left-0 right-0 h-[3px] bg-clay" />
                )}
              </button>
            ))}
          </div>

          {etapa === 'telefone' && (
            <form onSubmit={enviarCodigo} className="flex flex-col gap-6">
              <div>
                <h2 className="font-display text-2xl font-medium text-ink">
                  {aba === 'entrar' ? 'Que bom te ver de novo' : 'Vamos te cadastrar'}
                </h2>
                <p className="mt-1 text-sm text-ink/60">
                  {aba === 'entrar'
                    ? 'Confirme seu telefone para receber o código de acesso.'
                    : 'Leva menos de um minuto. Você vai receber um código por SMS.'}
                </p>
              </div>

              {aba === 'criar' && (
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs uppercase tracking-wide text-ink/50">
                    Nome completo
                  </span>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Como você quer ser chamado"
                    className="border-b-2 border-ink/15 bg-transparent py-2 font-body text-lg text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-clay"
                  />
                </label>
              )}

              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wide text-ink/50">
                  Telefone com DDD
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={telefone}
                  onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                  placeholder="(61) 90000-0000"
                  className="border-b-2 border-ink/15 bg-transparent py-2 font-body text-lg text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-clay"
                />
              </label>

              {erro && <p className="text-sm text-clay-dark">{erro}</p>}

              <button
                type="submit"
                disabled={enviando}
                className="mt-2 bg-clay py-3.5 font-body text-base font-medium text-sand transition-colors hover:bg-clay-dark disabled:opacity-60"
              >
                {enviando ? 'Enviando código…' : 'Receber código por SMS'}
              </button>
            </form>
          )}

          {etapa === 'codigo' && (
            <form onSubmit={confirmarCodigo} className="flex flex-col gap-6">
              <div>
                <h2 className="font-display text-2xl font-medium text-ink">
                  Digite o código
                </h2>
                <p className="mt-1 text-sm text-ink/60">
                  Enviamos 4 dígitos por SMS para {telefone}.
                </p>
              </div>

              <div className="flex gap-3">
                {codigo.map((digito, indice) => (
                  <input
                    key={indice}
                    ref={(el) => (inputsCodigo.current[indice] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digito}
                    onChange={(e) => atualizarDigito(indice, e.target.value)}
                    onKeyDown={(e) => voltarParaDigito(indice, e)}
                    className="h-14 w-14 border-b-2 border-ink/15 bg-transparent text-center font-display text-2xl text-ink outline-none transition-colors focus:border-clay"
                  />
                ))}
              </div>

              {erro && <p className="text-sm text-clay-dark">{erro}</p>}

              <button
                type="submit"
                disabled={enviando}
                className="mt-2 bg-clay py-3.5 font-body text-base font-medium text-sand transition-colors hover:bg-clay-dark disabled:opacity-60"
              >
                {enviando ? 'Confirmando…' : 'Confirmar e continuar'}
              </button>

              <button
                type="button"
                onClick={() => setEtapa('telefone')}
                className="text-sm text-ink/50 underline decoration-ink/20 underline-offset-4 hover:text-ink"
              >
                Corrigir número
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

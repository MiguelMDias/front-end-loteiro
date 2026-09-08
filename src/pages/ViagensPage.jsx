import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VIAGENS } from '../data/viagens.js'
import ViagemCard from '../components/ViagemCard.jsx'

const DIAS = Array.from({ length: 6 }).map((_, i) => {
  const data = new Date()
  data.setDate(data.getDate() + i)
  return data
})

const NOMES_DIA = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

const SENTIDOS = [
  { id: 'ida', label: 'Cavalcante → Brasília' },
  { id: 'volta', label: 'Brasília → Cavalcante' },
]

export default function ViagensPage() {
  const navegar = useNavigate()
  const [diaIndex, setDiaIndex] = useState(0)
  const [sentido, setSentido] = useState('ida')

  const viagensFiltradas = useMemo(() => {
    return VIAGENS.filter((v) =>
      sentido === 'ida'
        ? v.origem === 'Cavalcante'
        : v.origem === 'Brasília',
    )
  }, [sentido])

  return (
    <div className="min-h-screen bg-sand font-body text-ink">
      {/* cabeçalho */}
      <header className="border-b-2 border-gold bg-dusk px-6 py-6 text-sand md:px-14">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-sand/60">
          Loteiro
        </p>
        <h1 className="mt-2 font-display text-2xl font-medium md:text-3xl">
          Escolha sua viagem
        </h1>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8 md:px-0">
        {/* sentido da viagem */}
        <div className="mb-6 flex gap-6 border-b border-ink/10">
          {SENTIDOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSentido(s.id)}
              className={`relative pb-3 font-body text-sm transition-colors ${
                sentido === s.id ? 'text-ink' : 'text-ink/40 hover:text-ink/70'
              }`}
            >
              {s.label}
              {sentido === s.id && (
                <span className="absolute -bottom-px left-0 right-0 h-[3px] bg-clay" />
              )}
            </button>
          ))}
        </div>

        {/* seletor de dia — faixa horizontal, tipo calendário de rodoviária */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
          {DIAS.map((data, i) => {
            const ativo = i === diaIndex
            return (
              <button
                key={i}
                onClick={() => setDiaIndex(i)}
                className={`flex flex-none flex-col items-center gap-0.5 px-4 py-2.5 transition-colors ${
                  ativo
                    ? 'bg-clay text-sand'
                    : 'bg-white/40 text-ink/60 hover:bg-white/70'
                }`}
              >
                <span className="font-body text-xs uppercase tracking-wide">
                  {NOMES_DIA[data.getDay()]}
                </span>
                <span className="font-display text-lg font-medium leading-none">
                  {data.getDate()}
                </span>
              </button>
            )
          })}
        </div>

        {/* lista de viagens */}
        <div className="flex flex-col gap-3">
          {viagensFiltradas.length === 0 && (
            <p className="py-10 text-center text-sm text-ink/50">
              Nenhuma viagem encontrada para esse sentido neste dia.
            </p>
          )}
          {viagensFiltradas.map((viagem) => (
            <ViagemCard
              key={viagem.id}
              viagem={viagem}
              aoSelecionar={(v) => navegar(`/viagens/${v.id}`)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

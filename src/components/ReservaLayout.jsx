import { useNavigate } from 'react-router-dom'
import EtapasReserva from './EtapasReserva.jsx'

export default function ReservaLayout({ viagem, etapa, aoVoltar, children }) {
  const navegar = useNavigate()

  return (
    <div className="min-h-screen bg-sand font-body text-ink">
      <header className="border-b-2 border-gold bg-dusk px-6 py-6 text-sand md:px-14">
        <button
          onClick={aoVoltar ?? (() => navegar(-1))}
          className="font-body text-xs uppercase tracking-[0.2em] text-sand/60 hover:text-sand"
        >
          ← voltar
        </button>
        <h1 className="mt-2 font-display text-2xl font-medium md:text-3xl">
          {viagem.origem} → {viagem.destino}
        </h1>
        <p className="mt-1 font-body text-sm text-sand/70">
          Saída {viagem.saida} · Chegada {viagem.chegada} · {viagem.motorista}
        </p>
      </header>

      <div className="mx-auto max-w-3xl px-6 pt-8 md:px-0">
        <EtapasReserva atual={etapa} />
      </div>

      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-8 md:px-0">
        {children}
      </main>
    </div>
  )
}

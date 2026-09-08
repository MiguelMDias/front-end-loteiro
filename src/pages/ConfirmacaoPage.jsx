import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { VIAGENS } from '../data/viagens.js'
import ReservaLayout from '../components/ReservaLayout.jsx'
import { useReserva } from '../context/ReservaContext.jsx'

export default function ConfirmacaoPage() {
  const { viagemId } = useParams()
  const navegar = useNavigate()
  const viagem = VIAGENS.find((v) => v.id === viagemId)
  const { dados, limpar } = useReserva()
  const [confirmando, setConfirmando] = useState(false)
  const [confirmado, setConfirmado] = useState(false)

  if (!viagem) return null

  async function confirmarReserva() {
    setConfirmando(true)

    // TODO: integrar com a API — POST /reservas/
    // body: { viagemId, embarque, embarqueReferencia, destino, destinoReferencia,
    //         assento, precisaCadeirinha }
    // o backend deve validar concorrência (assento ainda livre) e status de pendência financeira
    await new Promise((resolve) => setTimeout(resolve, 800))

    setConfirmando(false)
    setConfirmado(true)
  }

  if (confirmado) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-sand px-6 text-center font-body text-ink">
        <span className="h-1.5 w-14 bg-clay" />
        <h1 className="mt-5 font-display text-3xl font-medium">
          Vaga garantida
        </h1>
        <p className="mt-2 max-w-xs text-sm text-ink/60">
          Assento {dados.assento} reservado para {viagem.origem} → {viagem.destino},
          saída {viagem.saida}. Pague pela plataforma para confirmar sua vaga.
        </p>
        <button
          onClick={() => {
            limpar()
            navegar('/viagens')
          }}
          className="mt-8 bg-clay px-6 py-3 font-body text-sm font-medium text-sand transition-colors hover:bg-clay-dark"
        >
          Ver outras viagens
        </button>
      </div>
    )
  }

  return (
    <ReservaLayout
      viagem={viagem}
      etapa="confirmar"
      aoVoltar={() => navegar(`/viagens/${viagem.id}/assento`)}
    >
      <div className="flex flex-col divide-y divide-ink/10 border border-ink/10 bg-white/40">
        <Linha label="Embarque" valor={dados.embarque} nota={dados.embarqueReferencia} />
        <Linha label="Destino" valor={dados.destino} nota={dados.destinoReferencia} />
        <Linha label="Assento" valor={dados.assento} />
        <Linha
          label="Cadeirinha infantil"
          valor={dados.precisaCadeirinha ? 'Sim' : 'Não'}
        />
      </div>

      <div className="flex items-center justify-between border-t-2 border-dashed border-ink/15 pt-6">
        <div>
          <p className="font-body text-xs uppercase tracking-wide text-ink/50">
            Total
          </p>
          <p className="font-display text-2xl font-medium text-ink">
            R$ {viagem.preco}
          </p>
        </div>
        <button
          onClick={confirmarReserva}
          disabled={confirmando}
          className="bg-clay px-8 py-3.5 font-body text-base font-medium text-sand transition-colors hover:bg-clay-dark disabled:opacity-60"
        >
          {confirmando ? 'Reservando…' : 'Confirmar reserva'}
        </button>
      </div>
    </ReservaLayout>
  )
}

function Linha({ label, valor, nota }) {
  return (
    <div className="flex items-start justify-between gap-6 px-5 py-4">
      <span className="font-body text-sm text-ink/50">{label}</span>
      <span className="text-right font-body text-sm font-medium text-ink">
        {valor || '—'}
        {nota && <span className="block font-normal text-ink/50">{nota}</span>}
      </span>
    </div>
  )
}

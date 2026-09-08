import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { VIAGENS } from '../data/viagens.js'
import ReservaLayout from '../components/ReservaLayout.jsx'
import MapaAssentos from '../components/MapaAssentos.jsx'
import { useReserva } from '../context/ReservaContext.jsx'

export default function AssentoPage() {
  const { viagemId } = useParams()
  const navegar = useNavigate()
  const viagem = VIAGENS.find((v) => v.id === viagemId)
  const { dados, atualizar } = useReserva()
  const [erro, setErro] = useState('')

  if (!viagem) return null

  function continuar() {
    if (!dados.assento) {
      setErro('Escolha um assento no mapa da van.')
      return
    }
    setErro('')
    navegar(`/viagens/${viagem.id}/confirmar`)
  }

  return (
    <ReservaLayout
      viagem={viagem}
      etapa="assento"
      aoVoltar={() => navegar(`/viagens/${viagem.id}/destino`)}
    >
      <div>
        <h2 className="mb-4 font-display text-2xl font-medium text-ink">
          Escolha seu assento
        </h2>
        <MapaAssentos
          ocupados={viagem.assentosOcupados}
          selecionado={dados.assento}
          aoSelecionar={(codigo) => {
            atualizar({ assento: codigo })
            setErro('')
          }}
        />
      </div>

      <label className="flex items-start gap-3 border border-ink/10 bg-white/40 px-5 py-4">
        <input
          type="checkbox"
          checked={dados.precisaCadeirinha}
          onChange={(e) => atualizar({ precisaCadeirinha: e.target.checked })}
          className="mt-1 h-4 w-4 accent-clay"
        />
        <span>
          <span className="block font-body text-sm font-medium text-ink">
            Preciso de cadeirinha infantil
          </span>
          <span className="block font-body text-xs text-ink/50">
            O motorista será avisado e vai preparar o assento antes da saída.
          </span>
        </span>
      </label>

      {erro && <p className="-mt-4 font-body text-sm text-clay-dark">{erro}</p>}

      <div className="flex justify-end border-t-2 border-dashed border-ink/15 pt-6">
        <button
          onClick={continuar}
          className="bg-clay px-8 py-3.5 font-body text-base font-medium text-sand transition-colors hover:bg-clay-dark"
        >
          Continuar
        </button>
      </div>
    </ReservaLayout>
  )
}

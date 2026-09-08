import { useNavigate, useParams } from 'react-router-dom'
import { VIAGENS } from '../data/viagens.js'
import ReservaLayout from '../components/ReservaLayout.jsx'

export default function DetalhesViagemPage() {
  const { viagemId } = useParams()
  const navegar = useNavigate()
  const viagem = VIAGENS.find((v) => v.id === viagemId)

  if (!viagem) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sand font-body text-ink/60">
        Viagem não encontrada.
      </div>
    )
  }

  const vagasLivres = viagem.vagasTotais - viagem.assentosOcupados.length

  return (
    <ReservaLayout
      viagem={viagem}
      etapa="detalhes"
      aoVoltar={() => navegar('/viagens')}
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 border border-ink/10 bg-white/40 px-6 py-6 sm:grid-cols-4">
        <Info label="Motorista" valor={viagem.motorista} />
        <Info label="Veículo" valor={viagem.veiculo} />
        <Info label="Duração" valor="4h15" />
        <Info label="Vagas livres" valor={`${vagasLivres} de ${viagem.vagasTotais}`} />
      </div>

      <div className="border border-ink/10 bg-white/40 px-6 py-6">
        <h2 className="font-display text-lg font-medium text-ink">O que levar</h2>
        <ul className="mt-3 flex flex-col gap-1.5 font-body text-sm text-ink/70">
          <li>Uma bagagem de mão por passageiro está incluída no valor</li>
          <li>Bagagem extra é combinada direto com o motorista</li>
          <li>Chegue ao ponto de embarque com 10 minutos de antecedência</li>
        </ul>
      </div>

      <div className="flex items-center justify-between border-t-2 border-dashed border-ink/15 pt-6">
        <div>
          <p className="font-body text-xs uppercase tracking-wide text-ink/50">
            Valor da passagem
          </p>
          <p className="font-display text-2xl font-medium text-ink">
            R$ {viagem.preco}
          </p>
        </div>
        <button
          onClick={() => navegar(`/viagens/${viagem.id}/embarque`)}
          className="bg-clay px-8 py-3.5 font-body text-base font-medium text-sand transition-colors hover:bg-clay-dark"
        >
          Continuar
        </button>
      </div>
    </ReservaLayout>
  )
}

function Info({ label, valor }) {
  return (
    <div>
      <p className="font-body text-xs uppercase tracking-wide text-ink/50">
        {label}
      </p>
      <p className="mt-0.5 font-body text-sm font-medium text-ink">{valor}</p>
    </div>
  )
}

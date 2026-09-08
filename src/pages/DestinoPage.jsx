import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { VIAGENS } from '../data/viagens.js'
import ReservaLayout from '../components/ReservaLayout.jsx'
import FormularioEndereco from '../components/FormularioEndereco.jsx'
import { useReserva } from '../context/ReservaContext.jsx'

export default function DestinoPage() {
  const { viagemId } = useParams()
  const navegar = useNavigate()
  const viagem = VIAGENS.find((v) => v.id === viagemId)
  const { dados, atualizar } = useReserva()
  const [erro, setErro] = useState('')

  if (!viagem) return null

  function continuar() {
    if (!dados.destino.trim()) {
      setErro('Informe o endereço onde você quer descer.')
      return
    }
    setErro('')
    navegar(`/viagens/${viagem.id}/assento`)
  }

  return (
    <ReservaLayout
      viagem={viagem}
      etapa="destino"
      aoVoltar={() => navegar(`/viagens/${viagem.id}/embarque`)}
    >
      <FormularioEndereco
        titulo={`Onde você quer descer em ${viagem.destino}?`}
        descricao="O motorista te deixa nesse endereço ao final da viagem, se estiver dentro da rota."
        endereco={dados.destino}
        referencia={dados.destinoReferencia}
        onEndereco={(valor) => atualizar({ destino: valor })}
        onReferencia={(valor) => atualizar({ destinoReferencia: valor })}
        erro={erro}
      />

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

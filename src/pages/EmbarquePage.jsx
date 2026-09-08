import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { VIAGENS } from '../data/viagens.js'
import ReservaLayout from '../components/ReservaLayout.jsx'
import FormularioEndereco from '../components/FormularioEndereco.jsx'
import { useReserva } from '../context/ReservaContext.jsx'

export default function EmbarquePage() {
  const { viagemId } = useParams()
  const navegar = useNavigate()
  const viagem = VIAGENS.find((v) => v.id === viagemId)
  const { dados, atualizar } = useReserva()
  const [erro, setErro] = useState('')

  if (!viagem) return null

  function continuar() {
    if (!dados.embarque.trim()) {
      setErro('Informe o endereço onde você quer ser pego.')
      return
    }
    setErro('')
    navegar(`/viagens/${viagem.id}/destino`)
  }

  return (
    <ReservaLayout
      viagem={viagem}
      etapa="embarque"
      aoVoltar={() => navegar(`/viagens/${viagem.id}`)}
    >
      <FormularioEndereco
        titulo={`Onde te pegamos em ${viagem.origem}?`}
        descricao="O motorista vai até esse endereço antes de seguir viagem. Seja específico para facilitar achar o local."
        endereco={dados.embarque}
        referencia={dados.embarqueReferencia}
        onEndereco={(valor) => atualizar({ embarque: valor })}
        onReferencia={(valor) => atualizar({ embarqueReferencia: valor })}
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

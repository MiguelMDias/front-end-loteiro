const ETAPAS = [
  { id: 'detalhes', label: 'Viagem' },
  { id: 'embarque', label: 'Embarque' },
  { id: 'destino', label: 'Destino' },
  { id: 'assento', label: 'Assento' },
  { id: 'confirmar', label: 'Confirmar' },
]

export default function EtapasReserva({ atual }) {
  const indiceAtual = ETAPAS.findIndex((e) => e.id === atual)

  return (
    <ol className="flex items-start">
      {ETAPAS.map((etapa, i) => {
        const concluida = i < indiceAtual
        const ativa = i === indiceAtual
        return (
          <li key={etapa.id} className="flex flex-1 flex-col items-center last:flex-none">
            <div className="flex w-full items-center">
              <span
                className={`h-2.5 w-2.5 flex-none rounded-full border-2 ${
                  concluida || ativa
                    ? 'border-clay bg-clay'
                    : 'border-ink/20 bg-transparent'
                }`}
              />
              {i < ETAPAS.length - 1 && (
                <span
                  className={`mx-1 h-0.5 flex-1 ${
                    concluida ? 'bg-clay' : 'border-t-2 border-dashed border-ink/15'
                  }`}
                />
              )}
            </div>
            <span
              className={`mt-1.5 font-body text-[11px] ${
                ativa ? 'font-medium text-ink' : 'text-ink/40'
              }`}
            >
              {etapa.label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

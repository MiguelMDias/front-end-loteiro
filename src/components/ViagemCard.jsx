export default function ViagemCard({ viagem, aoSelecionar }) {
  const vagasLivres = viagem.vagasTotais - viagem.assentosOcupados.length
  const quaseLotada = vagasLivres <= 3 && vagasLivres > 0
  const lotada = vagasLivres === 0

  return (
    <button
      onClick={() => !lotada && aoSelecionar(viagem)}
      disabled={lotada}
      className="group flex w-full items-stretch gap-0 border border-ink/10 bg-white/40 text-left transition-colors hover:border-clay disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-ink/10"
    >
      {/* horário — bloco tipo painel de rodoviária */}
      <div className="flex w-24 flex-none flex-col items-center justify-center gap-1 border-r border-dashed border-ink/15 bg-dusk py-5 text-sand">
        <span className="font-display text-xl font-medium leading-none">
          {viagem.saida}
        </span>
        <span className="h-px w-6 bg-sand/30" />
        <span className="font-body text-xs text-sand/70">{viagem.chegada}</span>
      </div>

      <div className="flex flex-1 items-center justify-between gap-4 px-5 py-4">
        <div>
          <p className="font-display text-lg font-medium text-ink">
            {viagem.origem} → {viagem.destino}
          </p>
          <p className="mt-0.5 font-body text-sm text-ink/60">
            {viagem.motorista} · {viagem.veiculo}
          </p>
        </div>

        <div className="flex flex-none flex-col items-end gap-1">
          <span className="font-display text-lg font-medium text-clay-dark">
            R$ {viagem.preco}
          </span>
          <span
            className={`font-body text-xs ${
              lotada
                ? 'text-ink/40'
                : quaseLotada
                  ? 'text-clay-dark'
                  : 'text-ink/50'
            }`}
          >
            {lotada ? 'Lotada' : `${vagasLivres} vaga${vagasLivres === 1 ? '' : 's'} livre${vagasLivres === 1 ? '' : 's'}`}
          </span>
        </div>
      </div>
    </button>
  )
}

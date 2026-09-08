import { FILEIRAS } from '../data/viagens.js'

function Assento({ codigo, estado, aoClicar }) {
  if (!codigo) {
    // vão do corredor — mantém o espaço sem renderizar assento
    return <div className="h-12 w-12" />
  }

  const estilos = {
    livre: 'border-ink/20 bg-white/50 text-ink/70 hover:border-clay hover:text-ink',
    ocupado: 'cursor-not-allowed border-ink/10 bg-ink/10 text-ink/25',
    selecionado: 'border-clay bg-clay text-sand',
  }

  return (
    <button
      type="button"
      disabled={estado === 'ocupado'}
      onClick={() => aoClicar(codigo)}
      className={`flex h-12 w-12 flex-none flex-col items-center justify-center gap-0.5 border-2 font-body text-xs font-medium transition-colors ${estilos[estado]}`}
      aria-label={`Assento ${codigo}, ${estado}`}
    >
      {/* indicador de encosto — reforça a leitura de "assento" em vez de "botão" */}
      <span className="h-1 w-6 rounded-t-sm bg-current opacity-40" />
      <span>{codigo}</span>
    </button>
  )
}

export default function MapaAssentos({ ocupados, selecionado, aoSelecionar }) {
  return (
    <div className="border border-ink/10 bg-white/30 px-6 py-8">
      {/* indicação do motorista, ancora a orientação da van */}
      <div className="mb-6 flex justify-end pr-1">
        <div className="flex flex-col items-center gap-1 text-ink/40">
          <div className="h-8 w-8 rounded-full border-2 border-current" />
          <span className="font-body text-[10px] uppercase tracking-wide">
            motorista
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {FILEIRAS.map((fileira) => (
          <div key={fileira.id} className="flex justify-center gap-3">
            {fileira.assentos.map((codigo, i) => {
              const estado = !codigo
                ? null
                : selecionado === codigo
                  ? 'selecionado'
                  : ocupados.includes(codigo)
                    ? 'ocupado'
                    : 'livre'
              return (
                <Assento
                  key={codigo ?? `vao-${fileira.id}-${i}`}
                  codigo={codigo}
                  estado={estado}
                  aoClicar={aoSelecionar}
                />
              )
            })}
          </div>
        ))}
      </div>

      {/* legenda */}
      <div className="mt-8 flex justify-center gap-6 border-t border-ink/10 pt-5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 border-2 border-ink/20 bg-white/50" />
          <span className="font-body text-xs text-ink/60">Livre</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 border-2 border-ink/10 bg-ink/10" />
          <span className="font-body text-xs text-ink/60">Ocupado</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 border-2 border-clay bg-clay" />
          <span className="font-body text-xs text-ink/60">Seu assento</span>
        </div>
      </div>
    </div>
  )
}

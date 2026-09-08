import { ASSENTOS_CARRO } from '../data/viagens.js'

function Assento({ codigo, label, estado, aoClicar }) {
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
      className={`flex h-16 w-20 flex-none flex-col items-center justify-center gap-1 border-2 font-body text-xs font-medium transition-colors ${estilos[estado]}`}
      aria-label={`Assento ${label}, ${estado}`}
    >
      {/* indicador de encosto — reforça a leitura de "assento" */}
      <span className="h-1 w-8 rounded-t-sm bg-current opacity-40" />
      <span className="text-center leading-tight">{label}</span>
    </button>
  )
}

export default function MapaAssentos({ ocupados, selecionado, aoSelecionar }) {
  const [dianteiro, ...traseiros] = ASSENTOS_CARRO

  function estadoDe(codigo) {
    if (selecionado === codigo) return 'selecionado'
    if (ocupados.includes(codigo)) return 'ocupado'
    return 'livre'
  }

  return (
    <div className="flex flex-col items-center border border-ink/10 bg-white/30 px-6 py-10">
      {/* carroceria do carro — visto de cima, frente para cima */}
      <div className="relative w-fit rounded-t-[3rem] rounded-b-xl border-2 border-ink/15 px-8 pb-8 pt-6">
        {/* para-brisa */}
        <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-ink/15" />

        {/* banco da frente: motorista + passageiro */}
        <div className="flex justify-center gap-3">
          <div className="flex h-16 w-20 flex-none flex-col items-center justify-center gap-1 border-2 border-dashed border-ink/20 text-ink/40">
            <span className="h-4 w-4 rounded-full border-2 border-current" />
            <span className="text-center font-body text-[10px] uppercase tracking-wide">
              Motorista
            </span>
          </div>
          <Assento
            codigo={dianteiro.codigo}
            label={dianteiro.label}
            estado={estadoDe(dianteiro.codigo)}
            aoClicar={aoSelecionar}
          />
        </div>

        {/* banco de trás: 3 lugares */}
        <div className="mt-4 flex justify-center gap-3">
          {traseiros.map((assento) => (
            <Assento
              key={assento.codigo}
              codigo={assento.codigo}
              label={assento.label}
              estado={estadoDe(assento.codigo)}
              aoClicar={aoSelecionar}
            />
          ))}
        </div>
      </div>

      {/* legenda */}
      <div className="mt-8 flex gap-6 border-t border-ink/10 pt-5">
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

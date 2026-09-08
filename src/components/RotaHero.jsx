const PARADAS = [
  { km: 0, nome: 'Cavalcante', nota: 'Chapada dos Veadeiros' },
  { km: 118, nome: 'Alto Paraíso', nota: 'parada de café' },
  { km: 210, nome: 'Colinas do Sul', nota: 'trecho de serra' },
  { km: 306, nome: 'Brasília', nota: 'Rodoviária do Plano Piloto' },
]

export default function RotaHero() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-dusk text-sand">
      {/* gradiente de céu ao entardecer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #152840 0%, #223A5E 45%, #6b3f3a 78%, #C1502E 100%)',
        }}
      />

      {/* "sol" baixo no horizonte */}
      <div className="absolute left-1/2 top-[58%] h-24 w-24 -translate-x-1/2 rounded-full bg-gold opacity-90 blur-[1px]" />

      <div className="relative flex h-full flex-col justify-between px-10 py-12 md:px-14 md:py-16">
        <div>
          <p className="font-body text-sm uppercase tracking-[0.2em] text-sand/70">
            Loteiro
          </p>
          <h1 className="mt-3 max-w-sm font-display text-4xl font-medium leading-[1.05] text-sand md:text-5xl">
            Sua vaga na van,
            <br />
            sem esperar resposta
            <br />
            no grupo.
          </h1>
        </div>

        {/* a rota em si: linha vertical com paradas */}
        <div className="relative mt-10 flex-1 border-l-2 border-dashed border-gold/60 pl-6">
          <ul className="flex h-full flex-col justify-between gap-8">
            {PARADAS.map((parada) => (
              <li key={parada.km} className="relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-gold bg-dusk" />
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-lg font-medium text-sand">
                    {parada.nome}
                  </span>
                  <span className="font-body text-xs text-sand/60">
                    km {parada.km}
                  </span>
                </div>
                <p className="font-body text-sm text-sand/60">{parada.nota}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="font-body text-sm text-sand/50">
          306 km · saída todos os dias
        </p>
      </div>
    </div>
  )
}

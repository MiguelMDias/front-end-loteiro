export default function FormularioEndereco({
  titulo,
  descricao,
  endereco,
  referencia,
  onEndereco,
  onReferencia,
  erro,
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-medium text-ink">{titulo}</h2>
      <p className="mt-1 max-w-md text-sm text-ink/60">{descricao}</p>

      <div className="mt-6 flex flex-col gap-5">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs uppercase tracking-wide text-ink/50">
            Endereço
          </span>
          <input
            type="text"
            value={endereco}
            onChange={(e) => onEndereco(e.target.value)}
            placeholder="Rua, número, bairro"
            className="border-b-2 border-ink/15 bg-transparent py-2 font-body text-lg text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-clay"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs uppercase tracking-wide text-ink/50">
            Ponto de referência (opcional)
          </span>
          <input
            type="text"
            value={referencia}
            onChange={(e) => onReferencia(e.target.value)}
            placeholder="Ex: em frente à padaria"
            className="border-b-2 border-ink/15 bg-transparent py-2 font-body text-lg text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-clay"
          />
        </label>

        {erro && <p className="font-body text-sm text-clay-dark">{erro}</p>}
      </div>
    </div>
  )
}

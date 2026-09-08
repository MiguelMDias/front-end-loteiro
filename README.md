# Loteiro — Frontend

Frontend do Loteiro em React + Vite + Tailwind. Este pacote traz a primeira tela: **acesso do passageiro** (login e cadastro por telefone/SMS).

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## O que já está pronto

- `src/pages/AcessoPage.jsx` — tela de login/cadastro, com alternância de aba e fluxo telefone → código SMS.
- `src/components/RotaHero.jsx` — painel visual da rota Cavalcante → Brasília, usado como identidade visual da tela de acesso.
- Paleta e tipografia customizadas em `tailwind.config.js` (cores `clay`, `dusk`, `sand`, `gold`, `ink`; fontes Fraunces + Work Sans).

## Onde conectar com o backend (Django REST Framework)

Os dois pontos de integração estão marcados com `TODO` em `AcessoPage.jsx`:

1. `enviarCodigo` → deve chamar o endpoint que dispara o SMS (ex: `POST /auth/codigo/`).
2. `confirmarCodigo` → deve chamar o endpoint que valida o código e retorna o token/sessão (ex: `POST /auth/confirmar/`).

## Próximos passos sugeridos

- Tela de reserva de viagem (escolha de assento, necessidades especiais)
- Painel do gerente
- Componente de mapa com localização em tempo real

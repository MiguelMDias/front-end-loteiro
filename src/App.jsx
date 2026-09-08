import { Routes, Route } from 'react-router-dom'
import AcessoPage from './pages/AcessoPage.jsx'
import ViagensPage from './pages/ViagensPage.jsx'
import FluxoReservaLayout from './pages/FluxoReservaLayout.jsx'
import DetalhesViagemPage from './pages/DetalhesViagemPage.jsx'
import EmbarquePage from './pages/EmbarquePage.jsx'
import DestinoPage from './pages/DestinoPage.jsx'
import AssentoPage from './pages/AssentoPage.jsx'
import ConfirmacaoPage from './pages/ConfirmacaoPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AcessoPage />} />
      <Route path="/viagens" element={<ViagensPage />} />

      {/* rotas aninhadas: um único ReservaProvider cobre todas as etapas
          de uma mesma viagem, então os dados sobrevivem entre embarque,
          destino, assento e confirmação */}
      <Route path="/viagens/:viagemId" element={<FluxoReservaLayout />}>
        <Route index element={<DetalhesViagemPage />} />
        <Route path="embarque" element={<EmbarquePage />} />
        <Route path="destino" element={<DestinoPage />} />
        <Route path="assento" element={<AssentoPage />} />
        <Route path="confirmar" element={<ConfirmacaoPage />} />
      </Route>
    </Routes>
  )
}

import { Outlet } from 'react-router-dom'
import { ReservaProvider } from '../context/ReservaContext.jsx'

export default function FluxoReservaLayout() {
  return (
    <ReservaProvider>
      <Outlet />
    </ReservaProvider>
  )
}

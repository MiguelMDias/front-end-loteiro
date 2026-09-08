import { createContext, useContext, useState, useCallback } from 'react'

const ReservaContext = createContext(null)

export function ReservaProvider({ children }) {
  const [dados, setDados] = useState({
    embarque: '',
    embarqueReferencia: '',
    destino: '',
    destinoReferencia: '',
    assento: null,
    precisaCadeirinha: false,
  })

  const atualizar = useCallback((campos) => {
    setDados((atual) => ({ ...atual, ...campos }))
  }, [])

  const limpar = useCallback(() => {
    setDados({
      embarque: '',
      embarqueReferencia: '',
      destino: '',
      destinoReferencia: '',
      assento: null,
      precisaCadeirinha: false,
    })
  }, [])

  return (
    <ReservaContext.Provider value={{ dados, atualizar, limpar }}>
      {children}
    </ReservaContext.Provider>
  )
}

export function useReserva() {
  const contexto = useContext(ReservaContext)
  if (!contexto) {
    throw new Error('useReserva precisa estar dentro de um ReservaProvider')
  }
  return contexto
}

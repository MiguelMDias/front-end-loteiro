// Dados temporários para desenvolvimento do front.
// TODO: substituir por chamada à API — GET /viagens/?data=YYYY-MM-DD

export const VIAGENS = [
  {
    id: 'v1',
    origem: 'Cavalcante',
    destino: 'Brasília',
    saida: '05:30',
    chegada: '09:45',
    motorista: 'Seu Raimundo',
    veiculo: 'Van — placa NRA-4B21',
    preco: 65,
    vagasTotais: 15,
    assentosOcupados: ['A2', 'A3', 'B1', 'C2', 'C3', 'D1', 'E2'],
  },
  {
    id: 'v2',
    origem: 'Cavalcante',
    destino: 'Brasília',
    saida: '13:00',
    chegada: '17:15',
    motorista: 'Dona Célia',
    veiculo: 'Van — placa QSD-9912',
    preco: 65,
    vagasTotais: 15,
    assentosOcupados: ['A1', 'A2', 'A3', 'B2', 'B3', 'C1', 'C2', 'C3', 'D3', 'E1', 'E2'],
  },
  {
    id: 'v3',
    origem: 'Brasília',
    destino: 'Cavalcante',
    saida: '18:30',
    chegada: '22:45',
    motorista: 'Seu Raimundo',
    veiculo: 'Van — placa NRA-4B21',
    preco: 65,
    vagasTotais: 15,
    assentosOcupados: ['A2', 'B1', 'B2', 'B3'],
  },
]

// Layout físico da van: 5 fileiras, configuração 1 + 2 (corredor no meio),
// última fileira é banco corrido de 3.
export const FILEIRAS = [
  { id: 'A', assentos: ['A1', null, 'A2', 'A3'] },
  { id: 'B', assentos: ['B1', null, 'B2', 'B3'] },
  { id: 'C', assentos: ['C1', null, 'C2', 'C3'] },
  { id: 'D', assentos: ['D1', null, 'D2', 'D3'] },
  { id: 'E', assentos: ['E1', 'E2', 'E3', null] },
]

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
    veiculo: 'Carro — placa NRA-4B21',
    preco: 65,
    vagasTotais: 4,
    assentosOcupados: ['B1'],
  },
  {
    id: 'v2',
    origem: 'Cavalcante',
    destino: 'Brasília',
    saida: '13:00',
    chegada: '17:15',
    motorista: 'Dona Célia',
    veiculo: 'Carro — placa QSD-9912',
    preco: 65,
    vagasTotais: 4,
    assentosOcupados: ['F', 'B1', 'B3'],
  },
  {
    id: 'v3',
    origem: 'Brasília',
    destino: 'Cavalcante',
    saida: '18:30',
    chegada: '22:45',
    motorista: 'Seu Raimundo',
    veiculo: 'Carro — placa NRA-4B21',
    preco: 65,
    vagasTotais: 4,
    assentosOcupados: [],
  },
]

// Layout físico do carro: motorista + banco da frente (1 passageiro) +
// banco de trás (3 passageiros).
export const ASSENTOS_CARRO = [
  { codigo: 'F', label: 'Frente' },
  { codigo: 'B1', label: 'Trás · janela esq.' },
  { codigo: 'B2', label: 'Trás · meio' },
  { codigo: 'B3', label: 'Trás · janela dir.' },
]

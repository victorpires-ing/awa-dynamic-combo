export const evento = {
  titulo: 'Bahia x EC Vitória - Campeonato Baiano',
  subtitulo: 'Esquadrão na Fonte Norte',
  imagemUrl: 'http://localhost:3845/assets/ef077e46dc9b81f067586bc8b0c804bcfbcde887.png',
  brasaoUrl: 'http://localhost:3845/assets/daab079e0c3c64cac099473361a0f275f9d9ae1f.png',
}

export const combosDisponiveis = [
  {
    id: 'pass3m',
    nome: 'SPECIAL PASS 3 MASCULINO',
    descricao: 'Acesso VIP nos 3 dias do evento com open bar incluso',
    desconto: 10,
    datas: [
      { id: 'd1', data: '26/12/2026', diaSemana: 'sáb', hora: '10h30', obrigatoria: true },
      { id: 'd2', data: '27/12/2026', diaSemana: 'dom', hora: '10h30', obrigatoria: false },
      { id: 'd3', data: '28/12/2026', diaSemana: 'seg', hora: '10h30', obrigatoria: false },
      { id: 'd4', data: '29/12/2026', diaSemana: 'ter', hora: '10h30', obrigatoria: false },
    ],
    minDatas: 2,
    maxDatas: 3,
    ingressosPorData: [
      { id: 'i1', nome: 'Vip - open bar', subtitulo: 'Consumação inclusa', preco: 269.90, obrigatorio: true },
      { id: 'i2', nome: 'Pista premium', subtitulo: null, preco: 189.90, obrigatorio: false },
    ],
    minTotal: 3,
    maxTotal: 8,
  },
  {
    id: 'pass3f',
    nome: 'SPECIAL PASS 3 FEMININO',
    descricao: null,
    datas: [
      { id: 'd1', data: '26/12/2026', diaSemana: 'sáb', hora: '10h30', obrigatoria: true },
      { id: 'd2', data: '27/12/2026', diaSemana: 'dom', hora: '10h30', obrigatoria: false },
      { id: 'd3', data: '28/12/2026', diaSemana: 'seg', hora: '10h30', obrigatoria: false },
      { id: 'd4', data: '29/12/2026', diaSemana: 'ter', hora: '10h30', obrigatoria: false },
    ],
    minDatas: 2,
    maxDatas: 3,
    ingressosPorData: [
      { id: 'i1', nome: 'Vip - open bar', subtitulo: 'Consumação inclusa', preco: 249.90, obrigatorio: true },
      { id: 'i2', nome: 'Pista premium', subtitulo: null, preco: 149.90, obrigatorio: false },
    ],
    minTotal: 3,
    maxTotal: 8,
  },
]

export const datasAvulsas = [
  {
    id: 'seg',
    diaSemana: 'Segunda',
    dia: '01',
    mes: 'MAR',
    ano: '2026',
    horarios: ['18h00', '20h00', '22h00', '00h00'],
    grupos: [
      {
        id: 'g1',
        nome: 'Grupo padrão',
        ingressos: [
          {
            id: 'ti1',
            nome: 'Nome primeiro',
            lote: 'nome lote 1',
            descricao:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vulputate est velit nec lacinia velit dapibus sed.',
            preco: 269.90,
          },
          {
            id: 'ti2',
            nome: 'Nome segundo',
            lote: 'nome lote 2',
            descricao: 'Acesso ao setor premium com vista privilegiada para o campo.',
            preco: 189.90,
          },
        ],
      },
    ],
  },
  {
    id: 'ter',
    diaSemana: 'Terça',
    dia: '02',
    mes: 'MAR',
    ano: '2026',
    horarios: ['18h00', '20h00'],
    grupos: [
      {
        id: 'g1',
        nome: 'Grupo padrão',
        ingressos: [
          {
            id: 'ti1',
            nome: 'Pista',
            lote: 'lote 1',
            descricao: 'Acesso à área de pista do evento.',
            preco: 149.90,
          },
        ],
      },
    ],
  },
]

export const resumoCompra = {
  precoOriginal: 320.0,
  precoFinal: 269.9,
  desconto: 10,
}

export function formatarPreco(valor) {
  if (valor == null || isNaN(valor)) return ''
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

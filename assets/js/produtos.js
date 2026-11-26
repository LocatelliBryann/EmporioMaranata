/*
  Catálogo do Empório Maranata
  ---------------------------------------------------------------
  Para editar: mude os nomes, acrescente ou remova itens.
  - nome:     como aparece no pote
  - tipo:     o desenho do conteúdo do pote:
              'grao' | 'po' | 'semente' | 'castanha' | 'folha' | 'capsula' | 'liquido' | 'pedaco'
  - cor:      a cor do conteúdo (qualquer cor CSS)
  - selos:    opcional — 'sem glúten', 'sem lactose', 'sem açúcar', 'integral', 'vegano'
  Não há preços no site: o pedido vai para o WhatsApp e a loja responde
  com disponibilidade e valores.
*/
export const CATEGORIAS = [
  {
    id: 'granel',
    nome: 'Granel e farinhas',
    texto: 'Leve a quantidade que você precisa.',
    itens: [
      { nome: 'Aveia em flocos', tipo: 'grao', cor: '#d9c39a', selos: ['integral'] },
      { nome: 'Farelo de aveia', tipo: 'po', cor: '#cdb486', selos: ['integral'] },
      { nome: 'Farinha integral', tipo: 'po', cor: '#b89568', selos: ['integral'] },
      { nome: 'Farinha de amêndoas', tipo: 'po', cor: '#e8d9bd', selos: ['sem glúten'] },
      { nome: 'Farinha de coco', tipo: 'po', cor: '#f3ecdc', selos: ['sem glúten'] },
      { nome: 'Granola', tipo: 'pedaco', cor: '#b98a4e' },
      { nome: 'Quinoa', tipo: 'semente', cor: '#e6d6b0', selos: ['sem glúten'] },
      { nome: 'Arroz integral', tipo: 'grao', cor: '#c9a87a', selos: ['integral', 'sem glúten'] },
    ],
  },
  {
    id: 'castanhas',
    nome: 'Castanhas e sementes',
    texto: 'Para o lanche, o iogurte e as receitas.',
    itens: [
      { nome: 'Castanha-do-pará', tipo: 'castanha', cor: '#cfae7c', selos: ['vegano'] },
      { nome: 'Castanha de caju', tipo: 'castanha', cor: '#e5c993', selos: ['vegano'] },
      { nome: 'Amêndoas', tipo: 'castanha', cor: '#a8714a', selos: ['vegano'] },
      { nome: 'Nozes', tipo: 'castanha', cor: '#9b6b3e', selos: ['vegano'] },
      { nome: 'Mix de castanhas', tipo: 'castanha', cor: '#b98a5a', selos: ['vegano'] },
      { nome: 'Chia', tipo: 'semente', cor: '#5b5650', selos: ['vegano'] },
      { nome: 'Linhaça dourada', tipo: 'semente', cor: '#c39a5b', selos: ['vegano'] },
      { nome: 'Semente de abóbora', tipo: 'semente', cor: '#7d8c4a', selos: ['vegano'] },
      { nome: 'Uva-passa', tipo: 'pedaco', cor: '#5a3426' },
      { nome: 'Damasco seco', tipo: 'pedaco', cor: '#e09a45' },
    ],
  },
  {
    id: 'temperos',
    nome: 'Temperos e chás',
    texto: 'Comida saudável não precisa ser sem graça.',
    itens: [
      { nome: 'Chimichurri', tipo: 'folha', cor: '#7a6a3a' },
      { nome: 'Ervas finas', tipo: 'folha', cor: '#6f7f3c' },
      { nome: 'Lemon pepper', tipo: 'po', cor: '#e3d37a' },
      { nome: 'Orégano', tipo: 'folha', cor: '#6b7a3a' },
      { nome: 'Cúrcuma', tipo: 'po', cor: '#e0a02a' },
      { nome: 'Páprica defumada', tipo: 'po', cor: '#b2432a' },
      { nome: 'Canela em pau', tipo: 'pedaco', cor: '#8a4b22' },
      { nome: 'Chás a granel', tipo: 'folha', cor: '#5f6b36' },
    ],
  },
  {
    id: 'especiais',
    nome: 'Sem glúten, sem lactose e sem açúcar',
    texto: 'Para quem tem restrição e para quem só quer variar.',
    itens: [
      { nome: 'Pão de mel integral', tipo: 'pedaco', cor: '#7a4421', selos: ['integral'] },
      { nome: 'Geleias sem açúcar', tipo: 'liquido', cor: '#b0303a', selos: ['sem açúcar'] },
      { nome: 'Snacks sem glúten', tipo: 'pedaco', cor: '#d8b26a', selos: ['sem glúten'] },
      { nome: 'Bebidas vegetais', tipo: 'liquido', cor: '#efe6d2', selos: ['sem lactose', 'vegano'] },
      { nome: 'Chocolates especiais', tipo: 'pedaco', cor: '#4a2a1a', selos: ['sem lactose'] },
      { nome: 'Doces sem açúcar', tipo: 'pedaco', cor: '#c98b6a', selos: ['sem açúcar'] },
    ],
  },
  {
    id: 'suplementos',
    nome: 'Suplementos e naturais',
    texto: 'Proteínas, vitaminas, fitoterápicos e mais.',
    itens: [
      { nome: 'Whey protein', tipo: 'po', cor: '#ece3cf' },
      { nome: 'Creatina', tipo: 'po', cor: '#f6f4ee' },
      { nome: 'Vitaminas', tipo: 'capsula', cor: '#e2a63b' },
      { nome: 'Colágeno', tipo: 'po', cor: '#f0e7da' },
      { nome: 'Extrato de própolis', tipo: 'liquido', cor: '#8a4f12' },
      { nome: 'Vinagre de maçã orgânico', tipo: 'liquido', cor: '#c7862e' },
      { nome: 'Cápsulas de cúrcuma', tipo: 'capsula', cor: '#d89a2a' },
      { nome: 'Óleo de coco', tipo: 'liquido', cor: '#f5efdc', selos: ['vegano'] },
    ],
  },
];

export const LOJA = {
  nome: 'Empório Maranata',
  whatsapp: '5547996126163',
  whatsappTexto: '(47) 99612-6163',
  instagram: 'emporiomaranatajoinville',
  endereco: 'Rua Adolfo da Veiga, 281',
  bairro: 'Boehmerwald, Joinville/SC',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Adolfo+da+Veiga+281+Boehmerwald+Joinville+SC',
  mapaEmbed: 'https://www.google.com/maps?q=Rua+Adolfo+da+Veiga,+281+-+Boehmerwald,+Joinville+-+SC&output=embed',
  // 0 = domingo ... 6 = sábado. Horários em minutos desde 00:00, fuso de Joinville.
  horario: {
    0: [],
    1: [[510, 720], [840, 1110]],
    2: [[510, 720], [840, 1110]],
    3: [[510, 720], [840, 1110]],
    4: [[510, 720], [840, 1110]],
    5: [[510, 720], [840, 1110]],
    6: [[540, 720]],
  },
};

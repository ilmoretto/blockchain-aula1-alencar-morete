const Blockchain = require('./blockchain');

function imprimirCadeia(cadeia) {
  console.log('\n--- Registro de Entregas ---');
  for (const bloco of cadeia) {
    console.log(
      `[#${bloco.indice}] ${bloco.dados} | Hash: ${bloco.hash.slice(0, 10)}...`
    );
  }
  console.log('----------------------------\n');
}

// 1. Criar a cadeia e cadastrar pelo menos 3 entregas
const registro = new Blockchain();

registro.adicionar('Entrega E-001 para Ji-Paraná: em rota');
registro.adicionar('Entrega E-002 para Porto Velho: entregue');
registro.adicionar('Entrega E-003 para Cacoal: aguardando coleta');

imprimirCadeia(registro.cadeia);
console.log('Cadeia válida?', registro.ehValida());

// 2. Tentar cadastrar dados inválidos sem derrubar o programa
console.log('\n--- Testando validações ---');
const entradasInvalidas = [
  '',
  'AB',
  'A'.repeat(81),
  12345,
];

for (const entrada of entradasInvalidas) {
  try {
    registro.adicionar(entrada);
  } catch (erro) {
    console.log(`Erro capturado: ${erro.message}`);
  }
}

console.log('Total de blocos após tentativas inválidas:', registro.cadeia.length);

// 3. Adulterar os dados de uma entrega antiga e verificar a validade
console.log('\n--- Simulando adulteração ---');
registro.cadeia[1].dados = 'Entrega E-001 para Ji-Paraná: cancelada';

imprimirCadeia(registro.cadeia);
console.log('Cadeia válida após adulteração?', registro.ehValida());

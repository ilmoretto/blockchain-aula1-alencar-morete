const Bloco = require('./bloco');

class Blockchain {
  constructor() {
    const blocoGenese = new Bloco(0, 'Bloco Gênese', '0');
    this.cadeia = [blocoGenese];
  }

  adicionar(dados) {
    const ultimoBloco = this.cadeia[this.cadeia.length - 1];
    const novoIndice = this.cadeia.length;
    const novoBloco = new Bloco(novoIndice, dados, ultimoBloco.hash);

    this.cadeia.push(novoBloco);
    return novoBloco;
  }

  ehValida() {
    const genese = this.cadeia[0];
    if (!genese || genese.hashAnterior !== '0' || genese.hash !== genese.calcularHash()) {
      return false;
    }

    for (let i = 1; i < this.cadeia.length; i++) {
      const blocoAtual = this.cadeia[i];
      const blocoAnterior = this.cadeia[i - 1];

      if (blocoAtual.hash !== blocoAtual.calcularHash()) {
        return false;
      }

      if (blocoAtual.hashAnterior !== blocoAnterior.hash) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;

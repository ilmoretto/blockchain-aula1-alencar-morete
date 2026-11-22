const crypto = require('crypto');

class Bloco {
  constructor(indice, dados, hashAnterior = '0') {
    if (typeof indice !== 'number' || !Number.isInteger(indice) || indice < 0) {
      throw new Error('O índice do bloco deve ser um número inteiro maior ou igual a zero.');
    }

    if (dados === undefined || dados === null || typeof dados !== 'string') {
      throw new Error('Os dados do bloco são obrigatórios e devem ser um texto (string).');
    }

    if (dados.trim().length === 0) {
      throw new Error('Os dados do bloco não podem estar em branco.');
    }

    if (dados.length < 3) {
      throw new Error('Os dados do bloco devem ter no mínimo 3 caracteres.');
    }

    if (dados.length > 80) {
      throw new Error('Os dados do bloco devem ter no máximo 80 caracteres.');
    }

    if (typeof hashAnterior !== 'string' || hashAnterior.trim().length === 0) {
      throw new Error('O hash anterior do bloco é obrigatório e deve ser um texto válido.');
    }

    this.indice = indice;
    this.dados = dados;
    this.hashAnterior = hashAnterior;
    this.hash = this.calcularHash();
  }

  calcularHash() {
    const texto = `${this.indice}|${this.dados}|${this.hashAnterior}`;
    return crypto.createHash('sha256').update(texto).digest('hex');
  }
}

module.exports = Bloco;

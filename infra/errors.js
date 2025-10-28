export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno não esperado aconteceu.", {
      cause,
    });
    this.name = InternalServerError.name;
    this.action = "Entre em contato com o suporte";
    this.statusCode = 500;
  }

  // Este método é uma sobrecarga feita quando estamos expondo os dados de um objeto do tipo InternalServerErro
  // Pois o método original acaba não expondo as variáveis que queremos, pois as mesmas são marcadas como não enumerable
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

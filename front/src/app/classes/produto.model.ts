export class Produto{

    constructor(public nome: String,
                public produtoId?: String,
                public descricao?: String,
                public preco?: number,
                public imagens?: String[],
                public dimensoes?: any,
                public linkExterno?: String){

    }
}
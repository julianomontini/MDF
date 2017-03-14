import {Produto} from "./produto.model";
export class Categoria{

    constructor(public nome: String, public categoriaId?: String, public produtos?: Produto[]){

    }

}
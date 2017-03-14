import {Compra} from "../classes/compra.model";
export class CarrinhoService {

  compra: Compra[] = [];

  addCompra(compra: Compra){
    this.compra.push(compra)
  }

  removeCompra(compra: Compra){
    this.compra.splice(this.compra.indexOf(compra),1);
  }

}

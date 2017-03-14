import {Component} from "@angular/core";
import {CarrinhoService} from "./carrinho.service";
import {Compra} from "../classes/compra.model";

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styles: [`

  .image-size{
    max-height: 125px;
    max-width: 125px;
  }

`]
})
export class CarrinhoComponent{

  listaCompras: Compra[];

  constructor(private carrinhoService: CarrinhoService){
    this.listaCompras = carrinhoService.compra;
  }

}

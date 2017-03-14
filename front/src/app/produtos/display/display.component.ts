import {Component, OnInit} from "@angular/core";
import {Categoria} from "../../classes/categoria.model";
import {ProdutosService} from "../produtos.service";
import {CarrinhoService} from "../../carrinho/carrinho.service";
import {Produto} from "../../classes/produto.model";
import {Compra} from "../../classes/compra.model";

@Component({
    selector: 'app-produtos-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit{
    categoria: Categoria;
    quantidadeCarrinho: number[];

    constructor(private prodServ: ProdutosService, private carrinhoServ: CarrinhoService){
    }

    ngOnInit(){
        this.prodServ.categoriaSelecionada.subscribe(
            (categoria: Categoria) => {
              this.categoria = categoria;
              this.quantidadeCarrinho = [];

              for(let i = 0; i < categoria.produtos.length-1; i++){
                this.quantidadeCarrinho.push(0);
              }
            }
        );
    }

    onItemAddCart(indice: number){
      let item: Produto = this.categoria.produtos[indice];
      let quantidade: number  = this.quantidadeCarrinho[indice];

      this.carrinhoServ.addCompra(new Compra(item,quantidade));
      console.log(this.carrinhoServ.compra);
    }
}

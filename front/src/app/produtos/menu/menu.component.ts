import {Component} from '@angular/core';
import {ProdutosService} from "../produtos.service";
import {Categoria} from "../../classes/categoria.model";


@Component({
    selector: 'app-side-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent{

    categorias: Categoria[];

    constructor(private prodServ: ProdutosService){
        this.categorias = prodServ.categorias;
    }

    onCategoriaSelected(categoria: Categoria){
        this.prodServ.onCategoriaSelecionada(categoria);
    }
}
import {Component} from '@angular/core';
import {Categoria} from "../../classes/categoria.model";
import {ProdutosService} from "../../produtos/produtos.service";


@Component({
    selector: 'app-edit-side-menu',
    templateUrl: './menu.component.html'
})
export class MenuEditComponent{

    categorias: Categoria[];

    constructor(private prodServ: ProdutosService){
        this.categorias = prodServ.categorias;
    }

    onCategoriaSelected(categoria: Categoria){
        this.prodServ.onCategoriaSelecionada(categoria);
    }

    editCategoria(categoria: Categoria){
      console.log("categoria sendo editada");
      this.prodServ.startCategoriaEdit(categoria);
    }

    removeCategoria(categoria: Categoria){
      this.prodServ.removeCategoria(categoria);
    }
}

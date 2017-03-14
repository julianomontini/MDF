import {Component} from "@angular/core";
import {ProdutosService} from "../../produtos/produtos.service";
import {Categoria} from "../../classes/categoria.model";
@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.html',
  styleUrls: ['./categoria-edit.css']
})
export class CategoriaEditComponent{

  titulo: String = "";
  display = 'none';
  isNew: boolean = false;
  categoria: Categoria;

  constructor(private prodServ: ProdutosService){
    prodServ.editandoCategoria.subscribe(
      (categoria: Categoria)=>{
        console.log("evento recebido");
        this.display = 'block';
        if(categoria != null){
          this.isNew = false;
          this.titulo = categoria.nome;
          this.categoria = categoria;
        }else{
          this.isNew = true;
        }
      }
    )
  }

  onSave(titulo){
    console.log("O nome é: " + titulo);
    this.display = 'none';
    if(this.isNew){
      this.prodServ.addCategoria(new Categoria(titulo, '', [])).subscribe(res =>{
        console.log(res)
      }, err =>{
        console.log(err);
      });
    }else{
      this.prodServ.editCategoria(this.categoria, titulo).subscribe(res =>{
        console.log(res)
      }, err =>{
        console.log(err);
      });
    }
  }

  onCancel(){
    this.display = 'none';
  }
}

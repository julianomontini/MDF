import {Http, Headers, Response} from "@angular/http";
import {Produto} from "../classes/produto.model";
import {Categoria} from "../classes/categoria.model";
import {EventEmitter, Output, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "../Auth/auth.service";

@Injectable()
export class ProdutosService{

    categoriaSelecionada = new EventEmitter<Categoria>();
    editandoItem = new EventEmitter<any>();
    editandoCategoria = new EventEmitter<Categoria>();

    constructor(private http: Http, private authService: AuthService){

    }

    categorias: Categoria[] = [];

    getCategorias(){

      this.categorias = [];

      return this.http.get('http://localhost:3000/auth/produtos').map( data => {
        return data.json();
      }).subscribe(data => {


        for(let i of data.data){

          let temp = i.produtos;
          console.log(i);

          this.categorias.push(new Categoria(
            i.nome,
            i._id,
            i.produtos
          ));

        }

        console.log(this.categorias);

      });

    }

    addCategoria(categoria: Categoria){
      this.categorias.push(categoria);

      const headers = new Headers({'Content-Type': 'application/json'});
      let cat = this.categorias[this.categorias.indexOf(categoria)];

      let token = this.authService.getToken();

      let body = {nome: cat.nome, token: token};

      return this.http.post('http://localhost:3000/auth/update', body, {headers: headers}).map(
        (response: Response) =>{
          return response.json();
        }
      ).catch((error: Response) => {
        return Observable.throw(error.json());
      })

    }

    onCategoriaSelecionada(categoria: Categoria){
        this.categoriaSelecionada.emit(categoria);
    }

    startEdit(categoria: Categoria, produto: Produto){
      const itemEditando = {
        categoria: categoria,
        produto: produto
      }
      this.editandoItem.emit(itemEditando);
    }

    startCategoriaEdit(categoria: Categoria){
      console.log("servico");
      this.editandoCategoria.emit(categoria);
    }

    addProduto(categoria: Categoria, produto: Produto){
      let indiceCat = this.categorias.indexOf(categoria);
      this.categorias[indiceCat].produtos.push(produto);

      const headers = new Headers({'Content-Type': 'application/json'});

      let cat = this.categorias[this.categorias.indexOf(categoria)];

      let token = this.authService.getToken();

      let body = {nome: cat.nome, token: token};

      return this.http.post('http://localhost:3000/auth/update', body, {headers: headers}).map(
        (response: Response) =>{
          return response.json();
        }
      ).catch((error: Response) => {
        return Observable.throw(error.json());
      })
    }

    editProduto(categoria: Categoria, produtoAntigo: Produto, produtoNovo: Produto){
      let indiceCat = this.categorias.indexOf(categoria);
      this.categorias[indiceCat].produtos.splice(this.categorias[indiceCat].produtos.indexOf(produtoAntigo), 1, produtoNovo);

      const headers = new Headers({'Content-Type': 'application/json'});

      let cat = this.categorias[this.categorias.indexOf(categoria)];

      let token = this.authService.getToken();

      let body = {nome: cat.nome, token: token};

      return this.http.post('http://localhost:3000/auth/update', body, {headers: headers}).map(
        (response: Response) =>{
          return response.json();
        }
      ).catch((error: Response) => {
        return Observable.throw(error.json());
      })
    }

    removeCategoria(categoria: Categoria){
      this.categorias.splice(this.categorias.indexOf(categoria),1);
    }

    editCategoria(categoria: Categoria, nomeNovo: String){
      this.categorias[this.categorias.indexOf(categoria)].nome = nomeNovo;

      const headers = new Headers({'Content-Type': 'application/json'});

      let cat = this.categorias[this.categorias.indexOf(categoria)];

      let token = this.authService.getToken();

      let body = {nome: cat.nome, token: token};

      return this.http.post('http://localhost:3000/auth/update', body, {headers: headers}).map(
        (response: Response) =>{
          return response.json();
        }
      ).catch((error: Response) => {
        return Observable.throw(error.json());
      })

    }
}

import {Component} from "@angular/core";
import {ProdutosService} from "../../produtos/produtos.service";
import {Produto} from "../../classes/produto.model";
import {FormGroup, FormBuilder, FormArray, FormControl} from "@angular/forms";
import {Categoria} from "../../classes/categoria.model";

@Component({
  selector: 'app-editor-frame',
  templateUrl: 'editor-frame.html',
  styleUrls: ['./modal-frame.css']
})
export class EditorFrameComponent{
  display = 'none';
  produto: Produto;
  categoria: Categoria;
  formProduto: FormGroup;
  isNew: boolean = true;

  constructor(private prodServ: ProdutosService, private formBuilder: FormBuilder) {
    this.onInit();
  }

  onEditEnd() {
    this.display = 'none';
  }

  onInit() {
    this.initForm();
    this.prodServ.editandoItem.subscribe(
      (item) => {
        this.categoria = item.categoria;
        if (item.produto != null) {
          this.isNew = false;
          console.log("item not null");
          console.log(item.produto);
          this.produto = item.produto;
          this.initForm();
        }else{
          this.isNew = true;
        }
        this.display = 'block';
      }
    )
  }

  initForm(){
    console.log("form init");
    let produtoNome: String = '';
    let produtoDescricao: String = '';
    let produtoAltura = 0;
    let produtoLargura = 0;
    let produtoComprimento = 0;
    let produtoPeso = 0;
    let produtoLink: String = '';
    let produtoFotos: FormArray = new FormArray([]);
    let produtoPreco = 0;

    if(this.produto != null){
      console.log("produto not null");
      produtoNome = this.produto.nome;
      produtoDescricao = this.produto.descricao;
      produtoAltura = this.produto.dimensoes.altura;
      produtoLargura = this.produto.dimensoes.largura;
      produtoComprimento = this.produto.dimensoes.comprimento;
      produtoPeso = this.produto.dimensoes.peso;
      produtoLink = this.produto.linkExterno;
      produtoPreco = this.produto.preco;

      for(let i = 0; i < this.produto.imagens.length; i++){
        produtoFotos.push(new FormGroup({
          imagem: new FormControl(this.produto.imagens[i])
        }));
      }
    }


    this.formProduto =  this.formBuilder.group({
      nome: [produtoNome],
      descricao: [produtoDescricao],
      altura: [produtoAltura],
      largura: [produtoLargura],
      comprimento: [produtoComprimento],
      peso: [produtoPeso],
      link: [produtoLink],
      fotos: produtoFotos,
      preco: [produtoPreco]
    })
  }

  onAddFoto(url: string) {
    (<FormArray>this.formProduto.controls['fotos']).push(new FormGroup({
      imagem: new FormControl(url)
    }));
  }

  onSubmit(){

    let nome = this.formProduto.value['nome'];
    let descricao = this.formProduto.value['descricao'];
    let fotos: String[] = [];
    let dimensoes = {
      altura: this.formProduto.value['altura'],
      largura: this.formProduto.value['largura'],
      comprimento: this.formProduto.value['comprimento'],
      peso: this.formProduto.value['peso']
    };
    let linkExterno = this.formProduto.value['link'];
    let preco = this.formProduto.value['preco'];

    let produtoNovo = new Produto(nome,'',descricao,preco,fotos,dimensoes,linkExterno);

    for(let i of this.formProduto.value['fotos']){
      fotos.push(i.imagem);
    }

    console.log(produtoNovo);

    if(this.isNew){
      this.prodServ.addProduto(this.categoria, produtoNovo).subscribe(res =>{
        console.log(res)
      }, err =>{
        console.log(err)
      });
    }else{
      this.prodServ.editProduto(this.categoria, this.produto, produtoNovo).subscribe(res =>{
        console.log(res)
      }, err =>{
        console.log(err)
      });
    }
    this.isNew = true;
    this.onEditEnd();
  }

  removeFoto(indice){
    (<FormArray>this.formProduto.controls['fotos']).removeAt(indice);
  }
}

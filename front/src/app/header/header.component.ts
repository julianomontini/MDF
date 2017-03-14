import {Component} from "@angular/core";
import {CarrinhoService} from "../carrinho/carrinho.service";
import {Compra} from "../classes/compra.model";
import {AuthService} from "../Auth/auth.service";
import {Router} from "@angular/router";
import {ProdutosService} from "../produtos/produtos.service";
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

  itensCarrinho: Compra[];

  constructor(private carrinhoServ: CarrinhoService, private auth: AuthService, private router: Router, private prdSrv: ProdutosService){
    this.itensCarrinho = carrinhoServ.compra;
  }

  onLogin(email, senha){
    this.auth.doLogin(email, senha).subscribe(res =>{
      console.log(res);
      localStorage.setItem('token',res.token);
      localStorage.setItem('role',res.role);
      this.router.navigateByUrl("/produtos");
    }, err => {
      console.log(err);
    });
  }

  doLogout(){
    localStorage.clear();
  }

  isAuth(){
    return this.auth.isLogedIn();
  }

  isAdmin(){
    return this.auth.isAdmin();
  }

  onCadastrar(){
    alert("Atualmente o cadastro só é disponibilizado para administradores do site");
  }

  doUpdate(){
    this.prdSrv.getCategorias();
  }

}

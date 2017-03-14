import {Routes, RouterModule} from "@angular/router";
import {CarrinhoComponent} from "./carrinho/carrinho.component";
import {ProdutosComponent} from "./produtos/produtos.component";
import {CadastroComponent} from "./Cadastro/cadastro.component";
import {EditorComponent} from "./editor/editor.component";
const APP_ROUTES: Routes = [
  {path: 'produtos', component: ProdutosComponent},
  {path: 'carrinho', component: CarrinhoComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'editor', component: EditorComponent},
  {path: '', redirectTo: '/produtos', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);

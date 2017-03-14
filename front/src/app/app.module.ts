import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import {ProdutosService} from "./produtos/produtos.service";
import {HeaderComponent} from "./header/header.component";
import {ProdutosComponent} from "./produtos/produtos.component";
import {DisplayComponent} from "./produtos/display/display.component";
import {MenuComponent} from "./produtos/menu/menu.component";
import {CarrinhoService} from "./carrinho/carrinho.service";
import {DropdownDirective} from "./dropdown.directive";
import {routing} from "./app.routing";
import {CarrinhoComponent} from "./carrinho/carrinho.component";
import {AuthService} from "./Auth/auth.service";
import {CadastroComponent} from "./Cadastro/cadastro.component";
import {EditorComponent} from "./editor/editor.component";
import {MenuEditComponent} from "./editor/menu/menu.component";
import {DisplayEditComponent} from "./editor/display/display.component";
import {EditorFrameComponent} from "./editor/editor-frame/editor-frame.component";
import {CategoriaEditComponent} from "./editor/categoria-edit/categoria-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProdutosComponent,
    DisplayComponent,
    MenuComponent,
    DropdownDirective,
    CarrinhoComponent,
    CadastroComponent,
    EditorComponent,
    MenuEditComponent,
    DisplayEditComponent,
    EditorFrameComponent,
    CategoriaEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [ProdutosService, CarrinhoService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

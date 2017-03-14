import {Component, OnInit} from "@angular/core";
import {AuthService} from "../Auth/auth.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../classes/user.model";
@Component({
  selector: 'app-component',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit{
  myForm: FormGroup;

  constructor(private auth: AuthService){

  }

  onSubmit(){
    const user = new User(
      this.myForm.value.email,
      this.myForm.value.password,
      this.myForm.value.firstName,
      this.myForm.value.lastName
    );

    this.auth.doRegister(user).subscribe(
      data => console.log(data), err => console.log(err)
    )

  }

  ngOnInit(){
    this.myForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
      password: new FormControl('',[Validators.required])
    });
  }
}

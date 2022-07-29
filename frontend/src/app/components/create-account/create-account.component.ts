import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  signUpForm = this.formB.group({
    username: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9]{1,40}$")])],
    password: ['', Validators.compose([Validators.required, Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9])[\\S]{3,40}$")])], //min length of 3 with at least one lowercase letter, one uppercase letter, and a digit
    name: this.formB.group({
      firstName: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z]{1,20}$")])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z]{1,20}$")])]
     }),
    email:['', Validators.compose([Validators.required, Validators.email])],
    address: this.formB.group({
      address1: ['', Validators.pattern("^[a-zA-Z0-9 ]{0,40}$")],
      address2: ['', Validators.pattern("^[a-zA-Z0-9 ]{0,40}$")],
      city: ['', Validators.pattern("^[a-zA-Z ]{0,20}$")],
      state: ['Choose...'],
      zip: ['', Validators.pattern("^[0-9]{5}$")]
    })
  });

  constructor(private formB: FormBuilder, private service: AccountService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.length > 0) {
      alert("Log out first to create a new account.");
      this.router.navigate(["/my-account"]);
    }
  }

  onSubmit() {
   const account = {
    id: 0, 
    username: this.username.value, 
    password:  this.password.value,
    name: ("" + this.name.value.firstName + this.name.value.lastName), 
    email: this.email.value, 
    address: ("" + this.address.value.address1 + " " + this.address.value.address2 + " " + 
    this.address.value.city + ", " + this.address.value.state + " " + this.address.value.zip)
   }

    this.service.createAccount(account);
    this.router.navigate(["/login"]);
  }

  get username() {
    return this.signUpForm.get('username')!;
  }

  get password() {
    return this.signUpForm.get('password')!;
  }

  get firstName() {
    return this.signUpForm.get('firstName')!;
  }

  get lastName() {
    return this.signUpForm.get('lastName')!;
  }

  get name() {
    return this.signUpForm.get('name')! as FormGroup;
  }

  get email() {
    return this.signUpForm.get('email')!;
  }

  get address() {
    return this.signUpForm.get('address')!;
  }

  get address1() {
    return this.signUpForm.get('address1')!;
  }

  get address2() {
    return this.signUpForm.get('address2')!;
  }

  get city() {
    return this.signUpForm.get('city')!;
  }

  get state() {
    return this.signUpForm.get('state')!;
  }

  get zip() {
    return this.signUpForm.get('zip')!;
  }


}


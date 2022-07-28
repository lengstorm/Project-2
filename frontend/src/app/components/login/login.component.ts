import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  disabled: boolean = false;

  //regex validators for username and password
  signInForm = this.formB.group({
    username: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9]{1,40}$")])],
    password: ['', Validators.compose([Validators.required, Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9])[\\S]{3,40}$")])]
  });


  constructor(private service: AccountService, private formB: FormBuilder, private router: Router) { }

  //upon loading component, if user credentials are still stored then redirect them to their account page. No need to log in if you're logged in.
  ngOnInit(): void {
    if (sessionStorage.length > 0) {
      this.router.navigate(["/my-account"]);
    }
  }

  //log in function
  login() {
    if (this.username.value?.length! > 0 && this.password.value?.length! > 0) {

      //sends the login info to the backend
      this.service.login(this.username.value!, this.password.value!).subscribe(data => {

        //attempts to grab the account with credentials
        const res: any = data;
        this.service.currentAccount = new Account(res.id, res.username, res.name, res.email, res.address, res.users, res.activePhonePlans);
      })

      //checks to see if it's valid. if so, navigate to accounts page
      if (this.service.currentAccount.username.length > 0) {
        this.service.loginAttempts = 0;
        this.service.isLoggedIn = true;
        location.reload();
      }
      else {
        this.service.isLoggedIn = false;
        sessionStorage.clear();
      }
      
      //if unsuccessful, let them try again but only 2 more attempts
      if (this.service.loginAttempts < 3) {
        this.service.loginAttempts++;
      }
      //after 3 consecutive attempts, disable logging in for 5 seconds.
      //FIX-ME, get it to persist upon refresh.
      else {
        this.disabled = true;
        sessionStorage.clear();
        setTimeout(() => {
          this.disabled = false;
        }, 1000 * 5);
      }
    }

  }

  //navigates users to the create account form when button is clicked
  createAccount() {
    this.router.navigate(["/sign-up"]);
  }

  get username() {
    return this.signInForm.get('username')!;
  }

  get password() {
    return this.signInForm.get('password')!;
  }

}

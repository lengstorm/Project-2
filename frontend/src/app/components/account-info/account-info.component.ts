import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { ActivePhonePlans } from '../../models/active-phone-plans.model';
import { User } from '../../models/user.model';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  users: User[] = new Array<User>(); //to store list of users
  phonePlans: ActivePhonePlans[] = new Array<ActivePhonePlans>();
  account: any = this.service.currentAccount;
  deviceLimit = 0;
  isBeingEdited = false;

  editForm = this.formB.group({
    username: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9]{1,40}$")])],
    password: ['', Validators.compose([Validators.required, Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9])[\\S]{3,40}$")])], //min length of 3 with at least one lowercase letter, one uppercase letter, and a digit
    name: this.formB.group({
      firstName: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z]{1,20}$")])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z]{1,20}$")])]
     }),
    email:['', Validators.compose([Validators.required, Validators.email])],
  });

  constructor(private service: AccountService, private router: Router, private formB: FormBuilder) { }

  ngOnInit(): void {

    //if we refreshed the page, grab data of currently logged in user
    if (this.account.username.length < 1 && sessionStorage.length > 0) { 
      this.service.getAccountInfo().subscribe(data => {
        const res: any = data;
        this.service.currentAccount = new Account(res.id, res.username, res.name, res.email, res.address, res.users, res.activePhonePlans);

        for (let i = 0; i < res.users.length; i++) {
          this.users.push(new User(res.users[i].id, res.users[i].name, res.users[i].phoneNumber));
        }

        for (let i = 0; i < res.activePhonePlans.length; i++) {
          this.phonePlans.push(new ActivePhonePlans(res.activePhonePlans[i].id, res.activePhonePlans[i].phonePlanType))
        }
        for (let i = 0; i < this.phonePlans.length; i++) {
          if (this.deviceLimit < this.phonePlans[i].deviceLimit) this.deviceLimit = this.phonePlans[i].deviceLimit;
        }
        
        this.service.currentAccount.users = this.users;
        this.service.currentAccount.phonePlans = this.phonePlans;
        this.account = this.service.currentAccount;
      });
    }
    //if we haven't refreshed the page, check if we already have the data and if so fetch it
    else if (this.account.username.length > 0) { 
      for (let i = 0; i < this.service.currentAccount.users.length; i++) {
        this.users.push(new User(this.service.currentAccount.users[i].id, this.service.currentAccount.users[i].name, this.service.currentAccount.users[i].phoneNumber));
      }

      for (let i = 0; i < this.service.currentAccount.phonePlans.length; i++) {
        this.phonePlans.push(new ActivePhonePlans(this.service.currentAccount.phonePlans[i].id, this.service.currentAccount.phonePlans[i].phonePlanType));
      }
      for (let i = 0; i < this.phonePlans.length; i++) {
        if (this.deviceLimit < this.phonePlans[i].deviceLimit) this.deviceLimit = this.phonePlans[i].deviceLimit;
      }
      this.service.currentAccount.users = this.users;
      this.service.currentAccount.phonePlans = this.phonePlans;
    }
    //we're not logged in or someone tampered with session storage
    else { 
      sessionStorage.clear();
      this.router.navigate(["/login"]);
    }
  }

  //makes the edit account form show
  toggleEdit() {
    this.editForm.setValue({username: this.account.username, password: "", 
    name: {firstName: this.account.name.substring(0, this.account.name.indexOf(" ")), lastName: this.account.name.substring(this.account.name.indexOf(" ") + 1)}, 
    email: this.account.email});
    
    this.isBeingEdited = true;
  }

  //hides the edit account form
  cancel() {
    this.isBeingEdited = false;
  }

  //sends the edit account form info to the db
  sendEditRequest() {

    const editedAccount = {
      id: this.account.id, 
      username: this.username.value, 
      password:  this.password.value,
      name: ("" + this.name.value.firstName + " " + this.name.value.lastName), 
      email: this.email.value, 
      address: this.account.address
     }

    this.service.editAccountInfo(editedAccount);
  }

  deleteAccount(){
    this.router.navigate(["/delete"]);
  }

//getters for form
  get username() {
    return this.editForm.get('username')!;
  }

  get password() {
    return this.editForm.get('password')!;
  }

  get firstName() {
    return this.editForm.get('firstName')!;
  }

  get lastName() {
    return this.editForm.get('lastName')!;
  }

  get name() {
    return this.editForm.get('name')! as FormGroup;
  }

  get email() {
    return this.editForm.get('email')!;
  }




}

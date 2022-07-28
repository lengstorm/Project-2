import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { ActivePhonePlans } from '../../models/active-phone-plans.model';
import { User } from '../../models/user.model';
import { AccountService } from '../../services/account-service';


@Component({
  selector: 'app-add-phones-and-users',
  templateUrl: './add-phones-and-users.component.html',
  styleUrls: ['./add-phones-and-users.component.css']
})
export class AddPhonesAndUsersComponent implements OnInit {

  users: User[] = new Array<User>(); //to store list of users
  phonePlans: ActivePhonePlans[] = new Array<ActivePhonePlans>();
  account = this.service.currentAccount; // to store current account
  toggleEditField = false; //toggle whether or not to hide editing info field
  editFieldInfo: any = Object; //stores the specific row of the user we're going to edit 
  toggleAddField = false; // toggle whether or not to hide the add user form
  deviceLimit = 0;

  //get client input on the edit user form
  editForm = this.formB.group({
    editName: ['', Validators.required],
    editNumber: ['', Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12)])]
  });

  //get client input on the add user form
  addForm = this.formB.group({
    newName: ['', Validators.required],
    newNumber: ['', Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12)])]
  });

  constructor(private service: AccountService, private router: Router, private formB: FormBuilder) { }

  //upon loading, fetch current account info if we're still logged in, otherwise redirect to login page
  ngOnInit(): void {

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
      });

    }
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
    else {
      this.router.navigate(["/login"]);
    }

  }

  //shows the edit form and stores that specific user's info to send to db 
  editUserToggle(user: User) {
    this.toggleEditField = true;
    this.editFieldInfo = user;
    this.editForm.setValue({editName: user.name, editNumber: user.phoneNumber});
  }

  //cancel editing a user and hides form again. resets the form
  cancel() {
    this.toggleAddField = false;
    this.toggleEditField = false;
    this.editForm.setValue({editName: '', editNumber: ''});
    this.addForm.setValue({newName: '', newNumber: ''});
  }

  //sends the new information to backend to edit specified user
  editUser() {
    const updatedUser = new User(this.editFieldInfo.id, this.editName.value!, this.editNumber.value!);
    this.service.editUser(updatedUser);
    location.reload();
  }

  //delete sppecified user
  deleteUser(id: number) {
    this.service.deleteUser(id);
    location.reload();
  }

  //adds the usser to db
  addUser() {
    const newUser = new User(0, this.newName.value!, this.newNumber.value!);
    this.service.addUser(newUser);
    location.reload();
  }

  //toggle the add user form if not at device limit for their current phone plan
  addUserToggle() {
    if (this.deviceLimit < this.users.length + 1) {
      alert("Device limit reached, upgrade plan to add more devices/users");
    }
    else {
      this.toggleAddField = true;
    }
  }

  //getters
  get editName() {
    return this.editForm.get('editName')!;
  }

  get editNumber() {
    return this.editForm.get('editNumber')!;
  }

  get newName() {
    return this.addForm.get('newName')!;
  }

  get newNumber() {
    return this.addForm.get('newNumber')!;
  }


}

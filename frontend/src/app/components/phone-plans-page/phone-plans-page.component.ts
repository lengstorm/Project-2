import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { ActivePhonePlans } from '../../models/active-phone-plans.model';
import { User } from '../../models/user.model';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'app-phone-plans-page',
  templateUrl: './phone-plans-page.component.html',
  styleUrls: ['./phone-plans-page.component.css']
})
export class PhonePlansPageComponent implements OnInit {

  //to store info upon loading in for ngIfs and ngFors and what not
  users: User[] = new Array<User>();
  phonePlans: ActivePhonePlans[] = new Array<ActivePhonePlans>();
  account = this.service.currentAccount;
  numOfPlans = 5; //this is just to change if I ever wanna add more plans to the site
  listOfPlans: ActivePhonePlans[] = new Array<ActivePhonePlans>();//to store all plans

  constructor(private service: AccountService, private router: Router) { }

  //grabs account info per usual
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

      this.service.currentAccount.users = this.users;
      this.service.currentAccount.phonePlans = this.phonePlans;

    }
    else {
      sessionStorage.clear();
      this.router.navigate(["/login"]);
    }
    //gets list of all available phone plans to display to client
    for (let i = 1; i < this.numOfPlans + 1; i++) {
      this.listOfPlans.push(new ActivePhonePlans(0, i))
    }
  }

//hides already owned plans
  hideOwnedPlans(planType: number) {
    for (let i = 0; i < this.phonePlans.length; i++) {
      if (planType == this.phonePlans[i].phonePlanType) {
        return true;
      }
    }
    return false;
  }

  //adds plan to account
  addPlan(phonePlanType: number) {
    this.service.addPhonePlan({id: 0, phonePlanType});
    location.reload();
  }

  //delete plan from account
  deletePlan(phonePlanType: number) {
    this.service.deletePhonePlan(phonePlanType);
    location.reload();
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { ActivePhonePlans } from '../../models/active-phone-plans.model';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'app-billing-page',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.css']
})
export class BillingPageComponent implements OnInit {

  account: any = this.service.currentAccount;
  phonePlans: ActivePhonePlans[] = new Array<ActivePhonePlans>();
  amountDue: number = 0;
  

  constructor(private service: AccountService, private router: Router) { }

  //upon being loaded, component will grab account info if session is still active (this is mainly just so data persists through page refresh)
  ngOnInit(): void {

        if (this.account.username.length > 0) {

          for (let i = 0; i < this.service.currentAccount.phonePlans.length; i++) {
            this.phonePlans.push(new ActivePhonePlans(this.service.currentAccount.phonePlans[i].id, this.service.currentAccount.phonePlans[i].phonePlanType))
            this.amountDue += this.phonePlans[i].price;
          }

          this.service.currentAccount.phonePlans = this.phonePlans;

        }
        //if data is already loaded, then grab values from our current account and display what we need to the user.
        else if (sessionStorage.length > 0) {

          this.service.getAccountInfo().subscribe(data => {

            const res: any = data;
            this.service.currentAccount = new Account(res.id, res.username, res.name, res.email, res.address, res.users, res.activePhonePlans);
    
            for (let i = 0; i < res.activePhonePlans.length; i++) {
              this.phonePlans.push(new ActivePhonePlans(res.activePhonePlans[i].id, res.activePhonePlans[i].phonePlanType))
              this.amountDue += this.phonePlans[i].price;
            }
            
            this.service.currentAccount.phonePlans = this.phonePlans;
            this.account = this.service.currentAccount;
          });

        }
        else {
          this.router.navigate(["/login"]);
        }
    
  }






}

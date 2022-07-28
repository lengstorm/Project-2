import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'app-delete-page',
  templateUrl: './delete-page.component.html',
  styleUrls: ['./delete-page.component.css']
})
export class DeletePageComponent implements OnInit {

  account: any = this.service.currentAccount;

  constructor(private service: AccountService, private router: Router) { }

  ngOnInit(): void {
    //if page was refreshed but we're still logged in, grab account info
    if (this.account.username.length < 1 && sessionStorage.length > 0) { 
      this.service.getAccountInfo().subscribe(data => {
        const res: any = data;
        this.service.currentAccount = new Account(res.id, res.username, res.name, res.email, res.address, res.users, res.activePhonePlans);
        this.account = this.service.currentAccount;
      });
    }
    //if we haven't refreshed the page, check if we already have the data and if so fetch it
    else if (this.account.username.length > 0) { 
      this.account = this.service.currentAccount;
    }
    //we're not logged in
    else { 
      this.router.navigate(["/login"]);
    }

  }

  //delete the account and go back to login page
  delete() {
    this.service.deleteAccount(this.account.id);
    location.reload();
  }

  //take them back to account view page
  cancel() {
    this.router.navigate(["/my-account"]);
  }

}

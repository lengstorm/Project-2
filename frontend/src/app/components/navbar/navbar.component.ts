import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  toggleLoginText = this.service.isLoggedIn;

  constructor(private service: AccountService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.length > 0) {
      this.toggleLoginText = true;
    }
    else {
      this.toggleLoginText = false;
      this.service.isLoggedIn = false;
    }
  }

  login() {
    this.router.navigate(["/login"]);
  }

  logout() {
    this.service.logout();
    if (sessionStorage.length == 0) {
      this.service.isLoggedIn = false;
      this.toggleLoginText = false;
    }
    this.router.navigate(["/login"])
  }

}

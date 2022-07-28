import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { AddPhonesAndUsersComponent } from './components/add-phones-and-users/add-phones-and-users.component';
import { BillingPageComponent } from './components/billing-page/billing-page.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { DeletePageComponent } from './components/delete-page/delete-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PhonePlansPageComponent } from './components/phone-plans-page/phone-plans-page.component';

const routes: Routes = [
  {
    path: 'sign-up', component: CreateAccountComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'billing', component: BillingPageComponent
  },
  {
    path: 'manage-devices', component: AddPhonesAndUsersComponent
  },
  {
    path: "my-account", component: AccountInfoComponent
  },
  {
    path: "delete", component: DeletePageComponent
  },
  {
    path: "my-plans", component: PhonePlansPageComponent
  },
  {
    path: "home", component: HomeComponent
  },
  {
    path: "**", component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

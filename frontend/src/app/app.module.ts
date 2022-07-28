import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginComponent } from './components/login/login.component';
import { BillingPageComponent } from './components/billing-page/billing-page.component';
import { AddPhonesAndUsersComponent } from './components/add-phones-and-users/add-phones-and-users.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DeletePageComponent } from './components/delete-page/delete-page.component';
import { PhonePlansPageComponent } from './components/phone-plans-page/phone-plans-page.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    LoginComponent,
    BillingPageComponent,
    AddPhonesAndUsersComponent,
    AccountInfoComponent,
    NavbarComponent,
    DeletePageComponent,
    PhonePlansPageComponent,
    HomeComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

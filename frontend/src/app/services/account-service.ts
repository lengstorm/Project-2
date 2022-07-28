import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../models/account.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url: string = "http://localhost:8080/project2/v1";

  //data I plan on storing to persist through components
  currentAccount: Account = new Account(0, "", "", "", "", [], []);
  loginAttempts: number = 0;
  isLoggedIn: boolean = true;
  /*
  isLockedOut: put this in session storage. have the value be the time remaining and every second have it go down by one. when it's 0, you can sign in again
  eventually put something so that if session key or value change, log them out and make them login
  */

  constructor(private http: HttpClient) {  }


  //Sends a post request with the account info
  createAccount(account: any): void {

    try {
      if (account == null) throw 'Empty account object handed';
      this.http.post(this.url + `/my-account`, account).subscribe();
    } 
    catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  }

  //login function to store/hide user credentials 
  login(username: string, password: string) {
    try {
      sessionStorage.clear();
      const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ":" + password)});
      const temp = this.generateValues();
      const temp2 = this.generateValues();
      sessionStorage.setItem( "" + btoa(username + ":" + password).length + "$" + temp2[0] + temp[1] , temp[0] + btoa(username + ":" + password) + temp[1])
      return this.http.get(this.url + `/my-account`, {headers});
    } 
    catch (error) {
      console.log(error);
      throw "Invalid credentials";
    }
  }

  //gets the account information from a logged in user
  getAccountInfo() {
    try {
      const headers = this.authHeader();
      return this.http.get(this.url + `/my-account`, {headers});
    } 
    catch (error) {
      console.log(error);
      throw "Invalid credentials";
    }
  }

  //edits account info with client input
  editAccountInfo(account: any) {
    try {
      if (account == null) throw 'Empty account object handed';
      const headers = this.authHeader();
      this.http.put(this.url + `/my-account`, account, {headers}).subscribe();

      //have to update session credentials or else client will be forced to log out and log back in with new credentials (if any)
      const temp = this.generateValues();
      const temp2 = this.generateValues();
      sessionStorage.clear();
      sessionStorage.setItem( "" + btoa(account.username + ":" + account.password).length + "$" + temp2[0] + temp[1] , temp[0] + btoa(account.username + ":" + account.password) + temp[1]);
      location.reload();
    } 
    catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  }

  //deletes account
  deleteAccount(id : number) {
    try {
      if (id == null) throw "Can't seem to find the account.";
      const headers = this.authHeader();
      this.http.delete(this.url + "/my-account", {headers}).subscribe();
      sessionStorage.clear();
    }
    catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  }

  //generate random values to hide our btoa value
  generateValues(): string[] {
    const vals: string[] = ["", ""];
    let v1 = "";
    let v2 = "";

    while (v1.length < 5) {
      v1 += String.fromCharCode(Math.floor( (Math.random() * (122 - 33) + 33)))
    } 
    while (v2.length < 10) {
      v2 += String.fromCharCode(Math.floor( (Math.random() * (122 - 33) + 33)))
    }

    vals[0] = v1;
    vals[1] = v2;
    return vals;
  }

  //logout function to clear curr account credentials
  logout() {
    sessionStorage.clear();
    this.currentAccount = new Account(0, "", "", "", "", [], []);
  }

  //edits the user that the client specified
  editUser(user: User): void {
    try {
      if (user == null || user.name.length < 1) throw "Invalid user information.";
    
      const headers = this.authHeader();
      this.http.put(this.url + "/my-users/" + user.id, user, {headers}).subscribe();
    }
    catch (error) {
      console.log(error);
      alert("Couldn't update user. Check phone number");
    }
  }

  //deletes the user that the client specified
  deleteUser(id: number): void {
    try {
      if (id == null) throw "Can't seem to find this user.";

      const headers = this.authHeader();
      this.http.delete(this.url + "/my-users/" + id, {headers}).subscribe();
    }
    catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  }

  //adds user from client input
  addUser(user: User) {
    try {
      if (user == null || user.name.length < 1) throw "Invalid user information";
      const headers = this.authHeader();
      this.http.post(this.url + "/my-users", user, {headers}).subscribe();
    }
    catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  }

  //add phone plan to account
  addPhonePlan(plan: any) {
    try {
      if (plan == null) throw "Couldn't access plan.";
      const headers = this.authHeader();
      this.http.post(this.url + "/my-phone-plans", plan, {headers}).subscribe();
    }
    catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  }

  //delete phone plan from acount
  deletePhonePlan(phonePlanType: number) {
    try {
      if (phonePlanType == null) throw "Couldn't retrieve plan to remove."
      const headers = this.authHeader();
      this.http.delete(this.url + "/my-phone-plans/" + phonePlanType, {headers}).subscribe();
    }
    catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  }

  //i had the length of the btoa value as my key with some filler, and put random values both before and after the actual btoa value to hide it.
  //now when I want to grab it to decode it with atob, i substring the session value since I know where it starts and ends.
  //this allows me to "safely" hide user credentials and get it when/if page is refreshed. 
  private authHeader() {
    if (sessionStorage.length > 0) {
      const index = sessionStorage.key(0)?.indexOf("$");
      const key = sessionStorage.key(0);
      const actualKey = sessionStorage.key(0)?.substring(0, index);
      const headers = new HttpHeaders({Authorization: 'Basic ' + sessionStorage.getItem(key!)?.substring(5, parseInt(actualKey!) + 5)});
      return headers;
    }
    return new HttpHeaders();
  }

}

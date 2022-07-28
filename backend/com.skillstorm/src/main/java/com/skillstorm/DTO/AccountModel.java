package com.skillstorm.DTO;

import com.skillstorm.model.Account;
import com.skillstorm.model.User;
import com.skillstorm.model.ActivePhonePlan;

import java.util.List;

//to return account info without including password
public class AccountModel {

    private int id;
    private String username;
    private String name;
    private String email;
    private String address;
    private List<User> users;
    private List<ActivePhonePlan> activePhonePlans;

    public AccountModel() {  }

    public AccountModel(Account account) {
        this.id = account.getId();
        this.username = account.getUsername();
        this.name = account.getName();
        this.email = account.getEmail();
        this.address = account.getAddress();
        this.users = account.getUsers();
        this.activePhonePlans = account.getActivePhonePlans();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<ActivePhonePlan> getActivePhonePlans() {
        return activePhonePlans;
    }

    public void setActivePhonePlans(List<ActivePhonePlan> activePhonePlans) {
        this.activePhonePlans = activePhonePlans;
    }
}

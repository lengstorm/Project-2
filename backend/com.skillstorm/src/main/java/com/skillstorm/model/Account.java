package com.skillstorm.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;


@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    @NotBlank
    private String username;
    @Column
    @NotBlank
    private String password;
    @Column
    @NotBlank
    private String name;
    @Column
    @Email
    @NotBlank
    private String email;
    @Column
    private String address;

    @OneToMany(mappedBy = "account")
    private List<User> users;

    @OneToMany(mappedBy = "account")
    private  List<ActivePhonePlan> activePhonePlans;

    public Account () {  }

    public Account(@JsonProperty("id") int id,
                   @JsonProperty("username") String username,
                   @JsonProperty("password") String password,
                   @JsonProperty("name") String name,
                   @JsonProperty("email") String email,
                   @JsonProperty("address") String address) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.address = address;
    }

    //for when I wanna return user to front-end, that way they don't see the password, even though it's already hashed.
    public Account(String username,
                   String name,
                   String email,
                   String address) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.address = address;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    @Override
    public String toString() {
        return "Account {" +
                "id = " + id +
                ", username = '" + username + '\'' +
                ", password = '" + password + '\'' +
                ", name = '" + name + '\'' +
                ", email = '" + email + '\'' +
                ", address = '" + address + '\'' +
                ", \n\t" + users + '\'' +
                ", \n\t" + activePhonePlans + '\'' +
                "'}\n";
    }
}

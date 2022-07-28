package com.skillstorm.config;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.skillstorm.model.Account;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private Account account;

    public CustomUserDetails (Account account) {
        super();
        this.account = account;
    }
    //allows me to grab the currently logged in and authenticated account's username and encrypted password to match with db.
    //also granting it the role of user for now since I'm not using roles in db, but if I wanted to do admins then
    //I'd have a roles prop on my account/user classes and would implement some logic here to handle that
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public String getPassword() {
        return account.getPassword();
    }

    @Override
    public String getUsername() {
        return account.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

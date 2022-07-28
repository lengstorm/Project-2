package com.skillstorm.controller;

import com.skillstorm.model.Account;
import com.skillstorm.service.AccountService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.skillstorm.DTO.AccountModel;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@CrossOrigin
@RequestMapping(path = "/project2/v1")
@RestController
@Tag(description = "Basic CRUD operations for the account primary user. All require auth except creating an account", name = "account-controller")
public class AccountController {

    private final AccountService accountService;

    private static final Logger logger = Logger.getLogger(AccountService.class);

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    //gets the account of whoever is logged in and authenticated
    @GetMapping(path = "/my-account")
    public ResponseEntity<AccountModel> getAccountByUsername() {
        return new ResponseEntity<AccountModel>(accountService.findByAccountUsername(), HttpStatus.OK);
    }

    //creates an account. don't need to be authenticated to do this
    @PostMapping(path = "/my-account")
    public ResponseEntity insertAccount(@Valid @RequestBody Account account) { //@Vaild annotation doesnt work
        accountService.insertAccount(account);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    //update account method
    @PutMapping(path = "/my-account")
    public ResponseEntity updateAccount(@Valid @RequestBody Account account) {
        accountService.updateAccount(account);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    //deletes current account
    @DeleteMapping(path = "/my-account")
    public ResponseEntity deleteAccount(HttpServletRequest req, HttpServletResponse res) {
        accountService.deleteAccount();
        return new ResponseEntity(HttpStatus.OK);
    }



}

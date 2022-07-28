package com.skillstorm.service;

import com.skillstorm.data.AccountRepository;
import com.skillstorm.model.Account;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.skillstorm.DTO.AccountModel;

import javax.transaction.Transactional;

@Service
@Transactional
public class AccountService {
    private final AccountRepository accountRepository;

    //need this to encode password upon creating account or
    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Logger logger = Logger.getLogger(AccountService.class);

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    //gets specific user from db using user ID from cookie
    public AccountModel findByAccountUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        logger.info("===================================");
        logger.info("RETURNING ACCOUNT WITH USERNAME: " + auth.getName());
        //use DTO so account info doesn't show the password
        AccountModel model = new AccountModel(accountRepository.findByUsername(auth.getName()));

        return model;
    }

    //inserts new user into db
    public void insertAccount(Account account) {
        logger.info("===================================");
        logger.info("INSERTING ACCOUNT: " + account);
        account.setPassword( passwordEncoder.encode(account.getPassword()) );
        //do this to let the db assign the ID. Otherwise, if user enters an existing id it would overwrite that account
        Account newAccount = new Account(0, account.getUsername(), account.getPassword(), account.getName(), account.getEmail(), account.getAddress());
        accountRepository.save(newAccount);
    }

    //updates account
    public void updateAccount(Account newAccount) {
        Account account = getAuthAccount();
        logger.info("===================================");
        logger.info("UPDATING ACCOUNT WITH USERNAME: " + account.getUsername() + " TO BE = " + newAccount);
        accountRepository.updateById(account.getId(),
                newAccount.getUsername(),
                passwordEncoder.encode(newAccount.getPassword()), //encodes password
                newAccount.getName(),
                newAccount.getEmail(),
                newAccount.getAddress());
    }

    //delete current account
    public void deleteAccount() {
        Account account = getAuthAccount();
        logger.info("===================================");
        logger.info("DELETING ACCOUNT WITH USERNAME " + account.getUsername());
        accountRepository.deleteById(account.getId());
    }

    //gets the currently authenticated account
    private Account getAuthAccount() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return accountRepository.findByUsername(auth.getName());
    }

}

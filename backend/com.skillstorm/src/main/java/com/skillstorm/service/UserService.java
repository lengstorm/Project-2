package com.skillstorm.service;

import com.skillstorm.data.AccountRepository;
import com.skillstorm.data.UserRepository;
import com.skillstorm.model.Account;
import com.skillstorm.model.User;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    private static final Logger logger = Logger.getLogger(AccountService.class);

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //gets all users from current account
    public List<User> getAllUsersForAccount() {
        Account account = getAuthenticatedAccount();
        logger.info("===================================");
        logger.info("RETURNING ALL USERS FOR ACCOUNT WITH USERNAME: " + account.getUsername());
        return userRepository.findByAccountId(account.getId());
    }

    //inserts a user into current account
    public void insertUser(User user) {
        Account account = getAuthenticatedAccount();
        logger.info("===================================");
        logger.info("INSERTING USER " + user + " INTO ACCOUNT WITH USERNAME: " + account.getUsername());
        userRepository.insertUser(0, account.getId(), user.getName(), user.getPhoneNumber());
    }

    //deletes a specific user from current account
    public void deleteUser(int userId) {
        Account account = getAuthenticatedAccount();
        logger.info("===================================");
        logger.info("REMOVING USER WITH ID " + userId + " FROM ACCOUNT WITH ID: " + account.getId());
        userRepository.deleteById(userId);
    }

    //gets a specific user from current account
    public User getUserById(int userId) {
        Account account = getAuthenticatedAccount();
        logger.info("===================================");
        logger.info("RETURNING USER WITH ID: " + userId);
        return userRepository.findById(account.getId(), userId);
    }
    //updates a specific user from current account
    public void updateUser(User user, int userId) {
        Account account = getAuthenticatedAccount();
        logger.info("===================================");
        logger.info("UPDATING USER WITH ID: " + user.getId() + " FROM ACCOUNT " + account.getUsername() + " TO " + user);
        userRepository.updateUserById(userId, user.getName(), user.getPhoneNumber(), account.getId());
    }

    //gets the currently authenticated account
    private Account getAuthenticatedAccount() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return accountRepository.findByUsername(auth.getName());
    }

}

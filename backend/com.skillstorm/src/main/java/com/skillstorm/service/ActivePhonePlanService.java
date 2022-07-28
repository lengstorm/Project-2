package com.skillstorm.service;

import com.skillstorm.data.AccountRepository;
import com.skillstorm.model.Account;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.skillstorm.data.ActivePhonePlanRepository;
import com.skillstorm.model.ActivePhonePlan;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ActivePhonePlanService {

    private ActivePhonePlanRepository activePhonePlanRepository;

    @Autowired
    private AccountRepository accountRepository;

    private static final Logger logger = Logger.getLogger(AccountService.class);

    @Autowired
    public ActivePhonePlanService(ActivePhonePlanRepository activePhonePlanRepository) {
        this.activePhonePlanRepository = activePhonePlanRepository;
    }

    //gets all phone plans from current account
    public List<ActivePhonePlan> getAllActivePhonePlansForAccount() {
        Account account = getAuthenticatedAccount();
        logger.info("===================================");
        logger.info("RETURNING ALL PHONE PLANS FOR ACCOUNT WITH USERNAME: " + account.getUsername());
        return activePhonePlanRepository.findPlansByAccount(account.getId());
    }

    //removes a specific phone plan from current account
    public void removePhonePlan(int phonePlan) {
        Account account = getAuthenticatedAccount();
        logger.info("===================================");
        logger.info("DELETING PHONE PLAN " + phonePlan + " FROM ACCOUNT WITH USERNAME " + account.getUsername());
        activePhonePlanRepository.deletePlan(phonePlan, account.getId());
    }

    //adds phone plan to current account
    public void addPhonePlanToAccount(ActivePhonePlan phonePlan) {
        Account account = getAuthenticatedAccount();
        logger.info("===================================");
        logger.info("ADDING PHONE PLAN " + phonePlan + " TO ACCOUNT WITH USERNAME " + account.getUsername());
        activePhonePlanRepository.addPhonePlan(0, phonePlan.getPhonePlanType(), account.getId());
    }

    //gets the currently authenticated account
    private Account getAuthenticatedAccount() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return accountRepository.findByUsername(auth.getName());
    }

}

package com.skillstorm.controller;


import com.skillstorm.service.ActivePhonePlanService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.skillstorm.model.ActivePhonePlan;

import java.util.List;

@CrossOrigin
@RequestMapping(path = "/project2/v1")
@RestController
@Tag(description = "Add, Get, Delete, operations for phone plans in the account. All require account to be authenticated", name = "active-phone-plans-controller")
public class ActivePhonePlanController {

    private ActivePhonePlanService activePhonePlanService;

    @Autowired
    public ActivePhonePlanController(ActivePhonePlanService activePhonePlanService) {
        this.activePhonePlanService = activePhonePlanService;
    }

    //gets all phone plans from current account
    @GetMapping(path = "/my-phone-plans")
    public ResponseEntity<List<ActivePhonePlan>> getAllActivePhonePlansForAccount() {
        return new ResponseEntity<List<ActivePhonePlan>>(activePhonePlanService.getAllActivePhonePlansForAccount(), HttpStatus.OK);
    }

    //adds a phone plan into current account
    @PostMapping(path = "/my-phone-plans")
    public ResponseEntity addPhonePlan( @RequestBody ActivePhonePlan phonePlan) {
        activePhonePlanService.addPhonePlanToAccount(phonePlan);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //removes a specific phone plan from current account
    @DeleteMapping(path = "/my-phone-plans/{phonePlan}")
    public ResponseEntity removePhonePlan(@PathVariable int phonePlan) {
        activePhonePlanService.removePhonePlan(phonePlan);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

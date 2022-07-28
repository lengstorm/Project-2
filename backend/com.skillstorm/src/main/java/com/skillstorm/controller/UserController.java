package com.skillstorm.controller;

import com.skillstorm.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.skillstorm.service.UserService;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RequestMapping(path = "/project2/v1")
@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //gets all user from current account
    @GetMapping(path = "/my-users")
    public List<User> getAllUsersOnAccount() {
        return userService.getAllUsersForAccount();
    }

    //inserts a new user into current account
    @PostMapping(path = "/my-users")
    public ResponseEntity insertUser(@Valid @RequestBody User user) {
        userService.insertUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //deletes a specific user from current account
    @DeleteMapping(path = "/my-users/{id}")
    public ResponseEntity deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //gets a specific user from current account
    @GetMapping(path = "/my-users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        return new ResponseEntity<User>(userService.getUserById(id), HttpStatus.OK);
    }

    //updates a specific user from current account
    @PutMapping(path = "/my-users/{id}")
    public ResponseEntity updateUser(@Valid @RequestBody User user, @PathVariable int id) {
        userService.updateUser(user, id);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


}

package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.exceptions.NoSuchUserException;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class RestAdminController {

    private final UserService userService;

    @Autowired
    public RestAdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<User> showUserInfo(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<User>> allUsers() {
        List<User> allUser = userService.allUsers();
        return new ResponseEntity<>(allUser, HttpStatus.OK);
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<User> showById(@PathVariable int id) {

        User user = userService.showUserById(id);
        if (user == null) {
            throw new NoSuchUserException("There is no user with ID " + id + "in Database");
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/admin")
    public ResponseEntity<User> newUser(@RequestBody User user) {
        userService.add(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PatchMapping("/admin/{id}")
    public ResponseEntity<User> update(@RequestBody User user) {
        userService.update(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/admin/{id}")
    public void delete(@PathVariable("id") int id) {
        User user = userService.showUserById(id);
        if (user == null) {
            throw new NoSuchUserException("There is no user with ID " + id + "in Database");
        }
        userService.deleteUser(id);
    }


}

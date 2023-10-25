package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping()
public class UserController {

    @GetMapping("/user")
    public String showUserInfo() {
        return "userPage";
    }

    @GetMapping("/admin")
    public String getAdmin() {
        return "all3";
    }

}

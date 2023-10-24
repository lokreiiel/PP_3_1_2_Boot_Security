package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;

@Controller
@RequestMapping()
public class UserController {
    private final UserService userService;
    private final RoleService roleService;

    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/user")
    public String showUserInfo(Principal principal, Model model) {
        model.addAttribute("users", userService.findByEmail(principal.getName()));
        return "userPage";
    }

    @GetMapping("/admin")
    public String getAdmin(Model model, Principal principal) {
        User user = new User();
        User user1 = userService.findByEmail(principal.getName());
        model.addAttribute("userPrincipal", user1);
        model.addAttribute("newUser", user);
        model.addAttribute("roles", roleService.allRoles());
        model.addAttribute("users", userService.allUsers());
        return "all3";
    }

}

package ru.kata.spring.boot_security.demo.util;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class Init {
    private final RoleService roleService;
    private final UserService userService;

    public Init(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @PostConstruct
    public void initDataBase() {
        Role admin = new Role("ROLE_ADMIN");
        Role user = new Role("ROLE_USER");
        Set<Role> adminSet = Set.of(admin);
        roleService.addRole(admin);
        roleService.addRole(user);

        User adminUser = new User();
        adminUser.setId(1);
        adminUser.setRoles(adminSet);
        adminUser.setFirstName("admin");
        adminUser.setLastName("admin");
        adminUser.setEmail("email");  //логин
        adminUser.setAge(20);
        adminUser.setPassword("password"); //пароль
        userService.add(adminUser);
    }

}

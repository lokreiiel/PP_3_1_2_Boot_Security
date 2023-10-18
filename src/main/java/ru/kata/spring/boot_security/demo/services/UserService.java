package ru.kata.spring.boot_security.demo.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    User findByEmail(String email);

    boolean add(User user);

    List<User> allUsers();

    User update(User user);

    void deleteUser(int id);

    User showUserById(int id);

    UserDetails loadUserByUsername(String username);
}

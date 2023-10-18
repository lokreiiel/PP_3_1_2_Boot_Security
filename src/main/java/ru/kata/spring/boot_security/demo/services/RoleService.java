package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;

import java.util.List;

public interface RoleService {
    List<Role> allRoles();
    void addRole(Role role);
}

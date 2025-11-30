package fr.ubo.hello.Service;

import fr.ubo.hello.Model.User;

import java.util.List;

public interface UserService {

    List<User> findAll();

    User getById(int id);
    void create(User u);
    void update(User u);
    void delete(int id);
}

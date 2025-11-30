package fr.ubo.hello.Dao;

import fr.ubo.hello.Model.User;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface UserDao {
    List<User> findAll();
    User findById(int id);

    boolean save(User user);

    boolean update(User user);
    boolean delete(int id);
}

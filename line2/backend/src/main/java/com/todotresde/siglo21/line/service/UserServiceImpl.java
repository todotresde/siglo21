package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.UserDao;
import com.todotresde.siglo21.line.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

    public List<User> all() {
        ArrayList<User> users = new ArrayList<User>();

        for (User user : userDao.findAll()) {
            users.add(user);
        }

        return users;
    }

    public User byId(Integer id) {
        return userDao.findById(id);
    }

    public User delete(Integer id) {
        User user = userDao.findById(id);
        userDao.delete(id);
        return user;
    }

    public User save(User user) {
        userDao.save(user);
        return user;
    }
}

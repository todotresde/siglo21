package com.todotresde.siglo21.cloud.service;

import com.todotresde.siglo21.cloud.dao.UserDao;
import com.todotresde.siglo21.cloud.exception.BaseException;
import com.todotresde.siglo21.cloud.helper.UserHelper;
import com.todotresde.siglo21.cloud.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
@Transactional
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

    public List<User> all() {
        List<User> users = new ArrayList<User>();

        for (User user : userDao.findAll()) {
            users.add(user);
        }

        return users;
    }

    public User byId(Long id) {
        return userDao.findById(id);
    }

    public User byUsername(String username) {
        return userDao.findByUsername(username);
    }

    public User delete(Long id) {
        User user = userDao.findById(id);

        try {
            userDao.delete(id);
        }catch(Exception e){
            throw new BaseException("error-delete-database-problems");
        }
        return user;
    }

    public User save(User user) {
        User tempUser = userDao.findByUsername(user.getUsername());

        if(tempUser != null && !tempUser.getId().equals(user.getId())){
            throw new BaseException("error-username-already-exist");
        }

        if(!UserHelper.validEmail(user.getEmail())){
            throw new BaseException("error-email-format-invalid");
        }

        userDao.save(user);
        return user;
    }
}

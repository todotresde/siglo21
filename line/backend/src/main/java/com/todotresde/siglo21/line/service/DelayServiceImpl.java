package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.DelayDao;
import com.todotresde.siglo21.line.model.Delay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class DelayServiceImpl implements DelayService{
    @Autowired
    private DelayDao delayDao;

    public List<Delay> all() {
        ArrayList<Delay> delays = new ArrayList<Delay>();

        for (Delay delay : delayDao.findAll()) {
            delays.add(delay);
        }

        return delays;
    }

    public Delay byId(Long id) {
        return delayDao.findById(id);
    }

    public Delay delete(Long id) {
        Delay delay = delayDao.findById(id);
        delayDao.delete(id);
        return delay;
    }

    public Delay save(Delay delay) {
        delayDao.save(delay);
        return delay;
    }
}

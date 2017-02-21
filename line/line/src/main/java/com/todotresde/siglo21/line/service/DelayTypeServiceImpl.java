package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.DelayTypeDao;
import com.todotresde.siglo21.line.model.DelayType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class DelayTypeServiceImpl implements DelayTypeService{
    @Autowired
    private DelayTypeDao delayTypeDao;

    public List<DelayType> all() {
        ArrayList<DelayType> delayTypes = new ArrayList<DelayType>();

        for (DelayType delayType : delayTypeDao.findAll()) {
            delayTypes.add(delayType);
        }

        return delayTypes;
    }

    public DelayType byId(Long id) {
        return delayTypeDao.findById(id);
    }

    public DelayType delete(Long id) {
        DelayType delayType = delayTypeDao.findById(id);
        delayTypeDao.delete(id);
        return delayType;
    }

    public DelayType save(DelayType delayType) {
        delayTypeDao.save(delayType);
        return delayType;
    }
}

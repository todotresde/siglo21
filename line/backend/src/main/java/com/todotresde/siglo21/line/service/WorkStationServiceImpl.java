package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.WorkStationDao;
import com.todotresde.siglo21.line.model.WorkStation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class WorkStationServiceImpl implements WorkStationService{
    @Autowired
    private WorkStationDao workStationDao;

    public List<WorkStation> all() {
        ArrayList<WorkStation> workStations = new ArrayList<WorkStation>();

        for (WorkStation workStation : workStationDao.findAll()) {
            workStations.add(workStation);
        }

        return workStations;
    }

    public WorkStation byId(Long id) {
        return workStationDao.findById(id);
    }

    public WorkStation delete(Long id) {
        WorkStation workStation = workStationDao.findById(id);
        workStationDao.delete(id);
        return workStation;
    }

    public WorkStation save(WorkStation workStation) {
        workStationDao.save(workStation);
        return workStation;
    }
}

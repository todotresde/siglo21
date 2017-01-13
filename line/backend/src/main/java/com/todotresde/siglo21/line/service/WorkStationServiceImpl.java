package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.WorkStationDao;
import com.todotresde.siglo21.line.exception.BaseException;
import com.todotresde.siglo21.line.helper.WorkStationHelper;
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
        try {
            workStationDao.delete(id);
        }catch(Exception e){
            throw new BaseException("error-delete-database-problems");
        }
        return workStation;
    }

    public WorkStation save(WorkStation workStation) throws BaseException {
        WorkStation tempWorkStation = workStationDao.findByIp(workStation.getIp());

        if(tempWorkStation != null && !tempWorkStation.getId().equals(workStation.getId())){
            throw new BaseException("error-ip-already-exist");
        }

        if(!WorkStationHelper.validIP(workStation.getIp())){
            throw new BaseException("error-ip-format-invalid");
        }

        workStationDao.save(workStation);
        return workStation;
    }
}

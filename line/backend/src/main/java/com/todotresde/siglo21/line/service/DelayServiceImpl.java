package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.DelayDao;
import com.todotresde.siglo21.line.model.Delay;
import com.todotresde.siglo21.line.model.Line;
import com.todotresde.siglo21.line.model.WorkStation;
import com.todotresde.siglo21.line.model.WorkStationConfiguration;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class DelayServiceImpl implements DelayService{
    @Autowired
    private DelayDao delayDao;
    @Autowired
    private LineService lineService;

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

    public List<WorkStationConfiguration> search(Long lineId, Date fromDate, Date toDate){
        ArrayList<WorkStationConfiguration> workStationConfigurations = new ArrayList<WorkStationConfiguration>();
        Line line = lineService.byId(lineId);

        for(WorkStationConfiguration workStationConfiguration : line.getWorkStationConfigurations()){
            WorkStationConfiguration newWorkStationConfiguration = new WorkStationConfiguration();
            BeanUtils.copyProperties(workStationConfiguration, newWorkStationConfiguration);

            newWorkStationConfiguration.setDelays(new ArrayList<>());

            List<Delay> workStationConfigurationDelays = workStationConfiguration.getDelays();

            for(Delay workStationConfigurationDelay : workStationConfigurationDelays){
                if(workStationConfigurationDelay.getStartTime().after(fromDate) && workStationConfigurationDelay.getEndTime().before(toDate) ){
                    newWorkStationConfiguration.getDelays().add(workStationConfigurationDelay);
                }
            }

            if(newWorkStationConfiguration.getDelays().size()>0){
                workStationConfigurations.add(newWorkStationConfiguration);
            }

        }

        return workStationConfigurations;
    }
}

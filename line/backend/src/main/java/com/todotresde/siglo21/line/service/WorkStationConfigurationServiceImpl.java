package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.WorkStationConfigurationDao;
import com.todotresde.siglo21.line.model.ProductType;
import com.todotresde.siglo21.line.model.WorkStationConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class WorkStationConfigurationServiceImpl implements WorkStationConfigurationService{
    @Autowired
    private WorkStationConfigurationDao workStationConfigurationDao;

    public List<WorkStationConfiguration> all() {
        ArrayList<WorkStationConfiguration> workStationConfigurations = new ArrayList<WorkStationConfiguration>();

        for (WorkStationConfiguration workStationConfiguration : workStationConfigurationDao.findAll()) {
            workStationConfigurations.add(workStationConfiguration);
        }

        return workStationConfigurations;
    }

    public WorkStationConfiguration byId(Long id) {
        return workStationConfigurationDao.findById(id);
    }

    public WorkStationConfiguration byProductTypeId(Long productTypeId){
        for (WorkStationConfiguration workStationConfiguration : workStationConfigurationDao.findAll()) {
            for(ProductType productType : workStationConfiguration.getProductTypes()){
                if(productTypeId.equals(productType.getId())){
                    return workStationConfiguration;
                }
            }
        }

        return null;
    }

    public WorkStationConfiguration delete(Long id) {
        WorkStationConfiguration workStationConfiguration = workStationConfigurationDao.findById(id);
        workStationConfigurationDao.delete(id);
        return workStationConfiguration;
    }

    public WorkStationConfiguration save(WorkStationConfiguration workStationConfiguration) {
        workStationConfigurationDao.save(workStationConfiguration);
        return workStationConfiguration;
    }
}

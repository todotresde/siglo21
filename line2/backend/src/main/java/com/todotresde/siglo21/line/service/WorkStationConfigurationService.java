package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.WorkStationConfiguration;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface WorkStationConfigurationService {
    public List<WorkStationConfiguration> all();
    public WorkStationConfiguration byId(Integer id);
    public WorkStationConfiguration delete(Integer id);
    public WorkStationConfiguration save(WorkStationConfiguration workStationConfiguration);
}

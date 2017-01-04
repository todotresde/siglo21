package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.WorkStationConfiguration;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface WorkStationConfigurationDao extends CrudRepository<WorkStationConfiguration, Integer> {
    public WorkStationConfiguration findById(Integer id);
}

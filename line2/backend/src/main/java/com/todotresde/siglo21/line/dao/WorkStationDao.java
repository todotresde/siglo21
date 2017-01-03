package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.WorkStation;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface WorkStationDao extends CrudRepository<WorkStation, Integer> {
    public WorkStation findById(Integer id);
}

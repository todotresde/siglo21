package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.Line;
import com.todotresde.siglo21.line.model.WorkStationConfiguration;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public class LineDaoImpl implements LineDaoCustom {
    @Autowired
    private WorkStationConfigurationDao workStationConfigurationDao;
    @PersistenceContext
    private EntityManager entityManager;

    public Line save(Line line){
        for (WorkStationConfiguration workStationConfiguration : line.getWorkStationConfigurations()) {
            workStationConfigurationDao.save(workStationConfiguration);
        }

        entityManager.persist(line);

        return line;
    }
}

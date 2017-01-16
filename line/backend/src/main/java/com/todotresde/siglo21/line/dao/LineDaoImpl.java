package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.Line;
import com.todotresde.siglo21.line.model.WorkStationConfiguration;
import com.todotresde.siglo21.line.service.WorkStationConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

/**
 * Created by Leonardo on 27/12/2016.
 */
/*
@Transactional
public class LineDaoImpl implements LineDaoCustom {
    @Autowired
    private WorkStationConfigurationService workStationConfigurationService;
    @PersistenceContext
    private EntityManager entityManager;
    private JpaEntityInformation<Line, ?> entityInformation;

    @PostConstruct
    public void postConstruct() {
        this.entityInformation = JpaEntityInformationSupport.getEntityInformation(Line.class, entityManager);
    }

    public Line save(Line line){
        for (WorkStationConfiguration workStationConfiguration : line.getWorkStationConfigurations()) {
            workStationConfigurationService.save(workStationConfiguration);
        }

        if (entityInformation.isNew(line)) {
            entityManager.persist(line);
            return line;
        } else {
            return entityManager.merge(line);
        }
    }
}
*/
package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.LineDao;
import com.todotresde.siglo21.line.exception.BaseException;
import com.todotresde.siglo21.line.model.Line;
import com.todotresde.siglo21.line.model.ProductType;
import com.todotresde.siglo21.line.model.WorkStation;
import com.todotresde.siglo21.line.model.WorkStationConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class LineServiceImpl implements LineService{
    @Autowired
    private LineDao lineDao;

    public List<Line> all() {
        List<Line> lines = new ArrayList<Line>();

        for (Line line : lineDao.findAll()) {
            lines.add(line);
        }

        return lines;
    }

    public Line byId(Long id) {
        return lineDao.findById(id);
    }

    public List<Line> byProductTypeId(Long productTypeId) {
        List<Line> lines = new ArrayList<Line>();

        for (Line line : lineDao.findAll()) {
            for (WorkStationConfiguration workStationConfiguration : line.getWorkStationConfigurations()) {
                for (ProductType productType : workStationConfiguration.getProductTypes()) {
                    if(productType.getId().equals(productTypeId)){
                        lines.add(line);
                    }
                }
            }
        }

        return lines;
    }

    public Long delete(Long id) {
        try {
            lineDao.delete(id);
        }catch(Exception e){
            throw new BaseException("error-delete-database-problems");
        }

        return id;
    }

    public Line save(Line line) {
        List<WorkStationConfiguration> workStationConfigurations = line.getWorkStationConfigurations();
        if(workStationConfigurations.isEmpty()){
            throw new BaseException("error-missing-workstation-configurations");
        }

        //Set the first and the last workStation of the line
        //workStationConfigurations.get(0).setFirst(true);
        //workStationConfigurations.get(workStationConfigurations.size()-1).setLast(true);

        lineDao.save(line);
        return line;
    }

    public List<WorkStation> getWorkStations(Line line){
        List<WorkStation> workStations = new ArrayList<WorkStation>();

        for (WorkStationConfiguration workStationConfiguration : line.getWorkStationConfigurations()) {
            if(workStations.contains(workStationConfiguration.getWorkStation())){
                workStations.add(workStationConfiguration.getWorkStation());
            }
        }

        return workStations;
    }

    public Boolean hasWorkStationsForProductTypes(Line line, List<ProductType> productTypes){
        return true;
    }
}

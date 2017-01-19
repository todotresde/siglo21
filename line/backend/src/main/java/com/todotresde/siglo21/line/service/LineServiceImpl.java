package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.LineDao;
import com.todotresde.siglo21.line.dao.WorkStationConfigurationDao;
import com.todotresde.siglo21.line.exception.BaseException;
import com.todotresde.siglo21.line.model.Line;
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
public class LineServiceImpl implements LineService{
    @Autowired
    private LineDao lineDao;

    public List<Line> all() {
        ArrayList<Line> lines = new ArrayList<Line>();

        for (Line line : lineDao.findAll()) {
            lines.add(line);
        }

        return lines;
    }

    public Line byId(Long id) {
        return lineDao.findById(id);
    }

    public Line byProductTypeId(Long productTypeId) {
        Line selectedLine = null;

        for (Line line : lineDao.findAll()) {
            for (WorkStationConfiguration workStationConfiguration : line.getWorkStationConfigurations()) {
                for (ProductType productType : workStationConfiguration.getProductTypes()) {
                    if(productType.getId().equals(productTypeId)){
                        selectedLine = line;
                    }
                }
            }
        }

        return selectedLine;
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

        if(line.getWorkStationConfigurations().isEmpty()){
            throw new BaseException("error-missing-workstation-configurations");
        }

        lineDao.save(line);
        return line;
    }
}

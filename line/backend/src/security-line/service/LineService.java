package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.Line;
import com.todotresde.siglo21.line.model.ProductType;
import com.todotresde.siglo21.line.model.WorkStationConfiguration;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface LineService {
    public List<Line> all();
    public Line byId(Long id);
    public Line byProductTypeId(Long productTypeId);
    public Long delete(Long id);
    public Line save(Line line);
}

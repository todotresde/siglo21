package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.Line;
import com.todotresde.siglo21.line.model.WorkStation;
import com.todotresde.siglo21.product.model.ProductType;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface LineService {
    public List<Line> all();
    public Line byId(Long id);
    public List<Line> byProductTypeId(Long productTypeId);
    public Long delete(Long id);
    public Line save(Line line);
    public List<WorkStation> getWorkStations(Line line);
    public Boolean hasWorkStationsForProductTypes(Line line, List<ProductType> productTypes);
}

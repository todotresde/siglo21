package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.DelayType;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface DelayTypeService {
    public List<DelayType> all();
    public DelayType byId(Long id);
    public DelayType delete(Long id);
    public DelayType save(DelayType delayType);
}

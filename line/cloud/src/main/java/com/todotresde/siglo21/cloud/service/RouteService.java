package com.todotresde.siglo21.cloud.service;

import com.todotresde.siglo21.cloud.model.Route;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface RouteService {
    public List<Route> all();
    public Route byId(Long id);
    public Route delete(Long id);
    public Route save(Route route);
}

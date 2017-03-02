package com.todotresde.siglo21.cloud.dao;

import com.todotresde.siglo21.cloud.model.Route;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Leonardo on 27/12/2016.
 */
public interface RouteDao extends CrudRepository<Route, Long> {
    public Route findById(Long id);
    public Route findByRoute(String route);
    public void delete(Long id);
}

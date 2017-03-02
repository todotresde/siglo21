package com.todotresde.siglo21.cloud.service;

import com.todotresde.siglo21.cloud.dao.RouteDao;
import com.todotresde.siglo21.cloud.exception.BaseException;
import com.todotresde.siglo21.cloud.model.Route;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
@Transactional
public class RouteServiceImpl implements RouteService{
    @Autowired
    private RouteDao routeDao;

    public List<Route> all() {
        List<Route> routes = new ArrayList<Route>();

        for (Route route : routeDao.findAll()) {
            routes.add(route);
        }

        return routes;
    }

    public Route byId(Long id) {
        return routeDao.findById(id);
    }

    public Route delete(Long id) {
        Route route = routeDao.findById(id);

        try {
            routeDao.delete(id);
        }catch(Exception e){
            throw new BaseException("error-delete-database-problems");
        }
        return route;
    }

    public Route save(Route route) {
        Route tempRoute = routeDao.findByRoute(route.getRoute());

        if(tempRoute != null && !tempRoute.getId().equals(route.getId())) {
            throw new BaseException("error-routename-already-exist");
        }

        routeDao.save(route);
        return route;
    }
}

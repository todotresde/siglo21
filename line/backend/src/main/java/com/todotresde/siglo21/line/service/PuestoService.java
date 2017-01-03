package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.Puesto;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface PuestoService {
    public List<Puesto> all();
    public Puesto byId(Integer id);
    public Puesto delete(Integer id);
    public Puesto save(Puesto puesto);
}

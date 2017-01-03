package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.PuestoDao;
import com.todotresde.siglo21.line.model.Puesto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class PuestoServiceImpl implements PuestoService{
    @Autowired
    private PuestoDao puestoDao;

    public List<Puesto> all() {
        ArrayList<Puesto> puestos = new ArrayList<Puesto>();

        for (Puesto puesto : puestoDao.findAll()) {
            puestos.add(puesto);
        }

        return puestos;
    }

    public Puesto byId(Integer id) {
        return puestoDao.findById(id);
    }

    public Puesto delete(Integer id) {
        Puesto puesto = puestoDao.findById(id);
        puestoDao.delete(id);
        return puesto;
    }

    public Puesto save(Puesto puesto) {
        puestoDao.save(puesto);
        return puesto;
    }
}

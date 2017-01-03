package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.Puesto;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface PuestoDao extends CrudRepository<Puesto, Integer> {
    public Puesto findById(Integer id);
}

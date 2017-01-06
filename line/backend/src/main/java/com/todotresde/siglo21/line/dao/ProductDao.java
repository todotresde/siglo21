package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.Product;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface ProductDao extends CrudRepository<Product, Long> {
    public Product findById(Long id);
    public void delete(Long id);
}

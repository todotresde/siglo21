package com.todotresde.siglo21.product.dao;

import com.todotresde.siglo21.product.model.Product;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface ProductDao extends CrudRepository<Product, Long> {
    public Product findById(Long id);
    public Product findByCode(String code);
    public List<Product> findByDescriptionContaining(String description);
    public void delete(Long id);
}

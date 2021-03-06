package com.todotresde.siglo21.product.dao;

import com.todotresde.siglo21.product.model.ProductType;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface ProductTypeDao extends CrudRepository<ProductType, Long> {
    public ProductType findById(Long id);
    public ProductType findByCode(String code);
    public List<ProductType> findByNameContaining(String name);
    public void delete(Long id);
}

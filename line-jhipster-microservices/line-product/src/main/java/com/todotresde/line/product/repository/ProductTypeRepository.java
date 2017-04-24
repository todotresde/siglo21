package com.todotresde.line.product.repository;

import com.todotresde.line.product.domain.ProductType;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ProductType entity.
 */
@SuppressWarnings("unused")
public interface ProductTypeRepository extends JpaRepository<ProductType,Long> {

}

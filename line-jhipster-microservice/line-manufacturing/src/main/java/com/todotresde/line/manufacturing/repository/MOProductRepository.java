package com.todotresde.line.manufacturing.repository;

import com.todotresde.line.manufacturing.domain.MOProduct;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the MOProduct entity.
 */
@SuppressWarnings("unused")
public interface MOProductRepository extends JpaRepository<MOProduct,Long> {

}

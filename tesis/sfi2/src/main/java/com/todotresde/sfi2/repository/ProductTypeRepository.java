package com.todotresde.sfi2.repository;

import com.todotresde.sfi2.domain.ProductType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the ProductType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {
    @Query("select distinct product_type from ProductType product_type left join fetch product_type.ptAttributes")
    List<ProductType> findAllWithEagerRelationships();

    @Query("select product_type from ProductType product_type left join fetch product_type.ptAttributes where product_type.id =:id")
    ProductType findOneWithEagerRelationships(@Param("id") Long id);

}

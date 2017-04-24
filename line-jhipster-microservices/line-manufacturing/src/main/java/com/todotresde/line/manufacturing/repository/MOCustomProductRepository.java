package com.todotresde.line.manufacturing.repository;

import com.todotresde.line.manufacturing.domain.MOCustomProduct;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the MOCustomProduct entity.
 */
@SuppressWarnings("unused")
public interface MOCustomProductRepository extends JpaRepository<MOCustomProduct,Long> {

    @Query("select distinct mOCustomProduct from MOCustomProduct mOCustomProduct left join fetch mOCustomProduct.mOProducts")
    List<MOCustomProduct> findAllWithEagerRelationships();

    @Query("select mOCustomProduct from MOCustomProduct mOCustomProduct left join fetch mOCustomProduct.mOProducts where mOCustomProduct.id =:id")
    MOCustomProduct findOneWithEagerRelationships(@Param("id") Long id);

}

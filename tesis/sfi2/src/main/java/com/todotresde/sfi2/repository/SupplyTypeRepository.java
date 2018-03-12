package com.todotresde.sfi2.repository;

import com.todotresde.sfi2.domain.SupplyType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the SupplyType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplyTypeRepository extends JpaRepository<SupplyType, Long> {
    @Query("select distinct supply_type from SupplyType supply_type left join fetch supply_type.stAttributes")
    List<SupplyType> findAllWithEagerRelationships();

    @Query("select supply_type from SupplyType supply_type left join fetch supply_type.stAttributes where supply_type.id =:id")
    SupplyType findOneWithEagerRelationships(@Param("id") Long id);

}

package com.todotresde.sfi2.repository;

import com.todotresde.sfi2.domain.ManufacturingOrder;
import com.todotresde.sfi2.domain.STAttributeValue;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the STAttributeValue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface STAttributeValueRepository extends JpaRepository<STAttributeValue, Long> {
    List<STAttributeValue> findByManufacturingOrder(ManufacturingOrder manufacturingOrder);
}

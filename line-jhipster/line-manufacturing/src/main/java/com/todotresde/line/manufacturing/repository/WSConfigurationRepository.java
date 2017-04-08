package com.todotresde.line.manufacturing.repository;

import com.todotresde.line.manufacturing.domain.WSConfiguration;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the WSConfiguration entity.
 */
@SuppressWarnings("unused")
public interface WSConfigurationRepository extends JpaRepository<WSConfiguration,Long> {

    @Query("select distinct wSConfiguration from WSConfiguration wSConfiguration left join fetch wSConfiguration.delays")
    List<WSConfiguration> findAllWithEagerRelationships();

    @Query("select wSConfiguration from WSConfiguration wSConfiguration left join fetch wSConfiguration.delays where wSConfiguration.id =:id")
    WSConfiguration findOneWithEagerRelationships(@Param("id") Long id);

}

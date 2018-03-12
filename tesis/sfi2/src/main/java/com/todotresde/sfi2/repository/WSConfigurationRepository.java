package com.todotresde.sfi2.repository;

import com.todotresde.sfi2.domain.Line;
import com.todotresde.sfi2.domain.WSConfiguration;
import com.todotresde.sfi2.domain.WorkStation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the WSConfiguration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WSConfigurationRepository extends JpaRepository<WSConfiguration, Long> {
    @Query("select distinct ws_configuration from WSConfiguration ws_configuration left join fetch ws_configuration.supplyTypes left join fetch ws_configuration.employees left join fetch ws_configuration.prevWorkStations left join fetch ws_configuration.nextWorkStations")
    List<WSConfiguration> findAllWithEagerRelationships();

    @Query("select ws_configuration from WSConfiguration ws_configuration left join fetch ws_configuration.supplyTypes left join fetch ws_configuration.employees left join fetch ws_configuration.prevWorkStations left join fetch ws_configuration.nextWorkStations where ws_configuration.id =:id")
    WSConfiguration findOneWithEagerRelationships(@Param("id") Long id);

    List<WSConfiguration> findByLineAndFirst(Line line,Boolean first);
    List<WSConfiguration> findByLineAndPrevWorkStations(Line line, WorkStation workStation);
}

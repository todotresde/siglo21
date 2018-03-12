package com.todotresde.line.manufacturing.repository;

import com.todotresde.line.manufacturing.domain.Tracing;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Tracing entity.
 */
@SuppressWarnings("unused")
public interface TracingRepository extends JpaRepository<Tracing,Long> {

    @Query("select distinct tracing from Tracing tracing left join fetch tracing.delays")
    List<Tracing> findAllWithEagerRelationships();

    @Query("select tracing from Tracing tracing left join fetch tracing.delays where tracing.id =:id")
    Tracing findOneWithEagerRelationships(@Param("id") Long id);

}

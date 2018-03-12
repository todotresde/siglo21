package com.todotresde.sfi2.repository;

import com.todotresde.sfi2.domain.Tracer;
import com.todotresde.sfi2.domain.WorkStation;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Tracer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TracerRepository extends JpaRepository<Tracer, Long> {
    List<Tracer> findByWorkStation(WorkStation workstation);
    List<Tracer> findByWorkStationAndStatus(WorkStation workstation, Integer status);
    Tracer findByWorkStationAndCode(WorkStation workstation, String code);
}

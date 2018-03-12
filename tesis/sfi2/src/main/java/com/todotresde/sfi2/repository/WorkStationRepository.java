package com.todotresde.sfi2.repository;

import com.todotresde.sfi2.domain.WorkStation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the WorkStation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkStationRepository extends JpaRepository<WorkStation, Long> {
    WorkStation findByIp(String ip);
}

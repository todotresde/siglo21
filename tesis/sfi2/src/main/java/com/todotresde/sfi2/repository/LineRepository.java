package com.todotresde.sfi2.repository;

import com.todotresde.sfi2.domain.Line;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Line entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LineRepository extends JpaRepository<Line, Long> {

}

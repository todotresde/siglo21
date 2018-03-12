package com.todotresde.sfi2.repository;

import com.todotresde.sfi2.domain.Supply;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Supply entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplyRepository extends JpaRepository<Supply, Long> {

}

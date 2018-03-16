package com.todotresde.sfi2.repository;

import com.todotresde.sfi2.domain.Supply;
import com.todotresde.sfi2.domain.SupplyType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Supply entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplyRepository extends JpaRepository<Supply, Long> {

}

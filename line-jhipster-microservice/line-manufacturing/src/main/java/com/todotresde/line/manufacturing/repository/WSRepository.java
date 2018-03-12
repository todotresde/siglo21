package com.todotresde.line.manufacturing.repository;

import com.todotresde.line.manufacturing.domain.WS;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the WS entity.
 */
@SuppressWarnings("unused")
public interface WSRepository extends JpaRepository<WS,Long> {

}

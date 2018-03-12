package com.todotresde.line.manufacturing.repository;

import com.todotresde.line.manufacturing.domain.Delay;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Delay entity.
 */
@SuppressWarnings("unused")
public interface DelayRepository extends JpaRepository<Delay,Long> {

}

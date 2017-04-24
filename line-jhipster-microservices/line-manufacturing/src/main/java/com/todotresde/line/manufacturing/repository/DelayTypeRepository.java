package com.todotresde.line.manufacturing.repository;

import com.todotresde.line.manufacturing.domain.DelayType;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the DelayType entity.
 */
@SuppressWarnings("unused")
public interface DelayTypeRepository extends JpaRepository<DelayType,Long> {

}

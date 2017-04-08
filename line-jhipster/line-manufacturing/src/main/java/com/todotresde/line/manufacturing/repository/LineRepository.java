package com.todotresde.line.manufacturing.repository;

import com.todotresde.line.manufacturing.domain.Line;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Line entity.
 */
@SuppressWarnings("unused")
public interface LineRepository extends JpaRepository<Line,Long> {

    @Query("select distinct line from Line line left join fetch line.wSConfigurations")
    List<Line> findAllWithEagerRelationships();

    @Query("select line from Line line left join fetch line.wSConfigurations where line.id =:id")
    Line findOneWithEagerRelationships(@Param("id") Long id);

}

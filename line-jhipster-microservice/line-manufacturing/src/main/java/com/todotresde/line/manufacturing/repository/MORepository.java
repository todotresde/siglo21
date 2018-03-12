package com.todotresde.line.manufacturing.repository;

import com.todotresde.line.manufacturing.domain.MO;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the MO entity.
 */
@SuppressWarnings("unused")
public interface MORepository extends JpaRepository<MO,Long> {

    @Query("select distinct mO from MO mO left join fetch mO.mOCustomProducts")
    List<MO> findAllWithEagerRelationships();

    @Query("select mO from MO mO left join fetch mO.mOCustomProducts where mO.id =:id")
    MO findOneWithEagerRelationships(@Param("id") Long id);

}

package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.Delay;
import com.todotresde.siglo21.line.model.Line;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface DelayDao extends CrudRepository<Delay, Long> {
    public Delay findById(Long id);
    public void delete(Long id);
}

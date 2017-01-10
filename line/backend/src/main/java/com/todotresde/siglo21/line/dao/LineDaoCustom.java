package com.todotresde.siglo21.line.dao;

import com.todotresde.siglo21.line.model.Line;

import javax.transaction.Transactional;

/**
 * Created by Leonardo on 27/12/2016.
 */
@Transactional
public interface LineDaoCustom {
    public Line save(Line line);
}

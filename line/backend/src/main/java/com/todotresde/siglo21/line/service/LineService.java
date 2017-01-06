package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.Line;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface LineService {
    public List<Line> all();
    public Line byId(Long id);
    public Line delete(Long id);
    public Line save(Line line);
}

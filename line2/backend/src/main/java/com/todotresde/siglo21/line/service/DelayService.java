package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.Delay;

import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface DelayService {
    public List<Delay> all();
    public Delay byId(Long id);
    public Delay delete(Long id);
    public Delay save(Delay delay);
}

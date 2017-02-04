package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.model.Delay;
import com.todotresde.siglo21.line.model.WorkStationConfiguration;

import java.util.Date;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
public interface DelayService {
    public List<Delay> all();
    public Delay byId(Long id);
    public Delay delete(Long id);
    public Delay save(Delay delay);
    public List<WorkStationConfiguration> search(Long lineId, Date fromDate, Date toDate);
}

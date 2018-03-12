package com.todotresde.sfi2.service;

import com.todotresde.sfi2.domain.*;
import com.todotresde.sfi2.repository.WSConfigurationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class WSConfigurationService {

    private final Logger log = LoggerFactory.getLogger(WSConfigurationService.class);

    private final WSConfigurationRepository wSConfigurationRepository;
    private final TracerService tracerService;

    public WSConfigurationService(WSConfigurationRepository wSConfigurationRepository, TracerService tracerService) {
        this.wSConfigurationRepository = wSConfigurationRepository;
        this.tracerService = tracerService;
    }

    public WSConfiguration getFirstWSConfigurationForLine(Line line){
        List<WSConfiguration> wSConfigurations = this.wSConfigurationRepository.findByLineAndFirst(line, true);

        WSConfiguration bestWSConfiguration = null;
        Long time = new Long(999999999);

        for(WSConfiguration wSConfiguration: wSConfigurations){
            Long wSConfigurationTime = this.getTime(wSConfiguration);
            if(wSConfigurationTime < time){
                time = wSConfigurationTime;
                bestWSConfiguration = wSConfiguration;
            }
        }

        return bestWSConfiguration;
    }


    public Long getTime(WSConfiguration wSConfiguration) {
        return new Long(this.tracerService.getTracersForWorkStation(wSConfiguration.getWorkStation()).size());
    }

    public void create(WSConfiguration wSConfiguration, Line line, MOProduct mOProduct){
        WorkStation prevWorkStation = null;
        WorkStation nextWorkStation = this.getNextWorkStation(wSConfiguration);

        this.tracerService.create(line, mOProduct, wSConfiguration, prevWorkStation, nextWorkStation);
    }

    public WSConfiguration getNextWSConfiguration(WSConfiguration wSConfiguration) {
        List<WSConfiguration> wSConfigurations = this.wSConfigurationRepository.findByLineAndPrevWorkStations(wSConfiguration.getLine(), wSConfiguration.getWorkStation());
        WSConfiguration bestWSConfiguration = null;

        if (!wSConfigurations.isEmpty()){
            Long time = new Long(999999999);

            for (WSConfiguration wSConfiguration1 : wSConfigurations) {
                Long wSConfigurationTime = this.getTime(wSConfiguration1);
                if (wSConfigurationTime < time) {
                    time = wSConfigurationTime;
                    bestWSConfiguration = wSConfiguration1;
                }
            }
        }

        return bestWSConfiguration;
    }

    public WorkStation getNextWorkStation(WSConfiguration wSConfiguration){
        List<WorkStation> nextWorkStations = new ArrayList<WorkStation>(wSConfiguration.getNextWorkStations());
        WorkStation bestWorkStation = null;
        Integer maxTracers = new Integer(999999999);

        for(WorkStation workStation: nextWorkStations){
            Integer numberOfTracers = this.tracerService.getTracersForWorkStation(workStation).size();
            if(numberOfTracers < maxTracers){
                maxTracers = numberOfTracers;
                bestWorkStation = workStation;
            }
        }

        return bestWorkStation;
    }
}


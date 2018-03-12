package com.todotresde.sfi2.service;

import com.todotresde.sfi2.domain.*;
import com.todotresde.sfi2.repository.LineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class LineService {

    private final Logger log = LoggerFactory.getLogger(LineService.class);

    private final LineRepository lineRepository;
    private final WSConfigurationService wSConfigurationService;
    private final TracerService tracerService;
    private final ProductService productService;

    public LineService(LineRepository lineRepository, WSConfigurationService wSConfigurationService, TracerService tracerService, ProductService productService) {
        this.lineRepository = lineRepository;
        this.wSConfigurationService = wSConfigurationService;
        this.tracerService = tracerService;
        this.productService = productService;
    }

    public Line getBestLineForMOProduct(MOProduct mOProduct) {
        List<Line> lines = this.getLineForMOProduct(mOProduct);
        Line bestLine = null;
        Long time = new Long(999999999);

        //Get Lines that has necessary workstations to build thos MOProduct
        for(Line line: lines){
            Long lineTime = this.getTimeForLine(line);
            if(lineTime < time){
                time = lineTime;
                bestLine = line;
            }
        }

        return bestLine;
    }

    public List<Line> getLineForMOProduct(MOProduct mOProduct) {
        List<Line> lines = this.lineRepository.findAll();
        List<Line> linesForMOProduct = new ArrayList<Line>();

        List<SupplyType> mOProductSupplyTypes = this.productService.getSupplyTypes(mOProduct.getProduct());
        for(Line line: lines){
            List<SupplyType> lineSupplyTypes = this.getSupplyTypesForLine(line);

            /*Boolean hasSameSupplyTypes = mOProductSupplyTypes
                .stream().map(supplyType -> supplyType.getId())
                .collect(Collectors.toList())
                .containsAll(lineSupplyTypes);*/
            if(mOProductSupplyTypes.size() == lineSupplyTypes.size() && mOProductSupplyTypes.containsAll(lineSupplyTypes)){
                linesForMOProduct.add(line);
            }
        }

        return linesForMOProduct;
    }

    public Long getTimeForLine(Line line) {
        return new Long(ThreadLocalRandom.current().nextInt(20, 100 ));
    }

    public void sendMOProduct(Line line, MOProduct mOProduct){
        WSConfiguration wSConfiguration = this.wSConfigurationService.getFirstWSConfigurationForLine(line);
        this.wSConfigurationService.create(wSConfiguration, line, mOProduct);

    }

    public Tracer sendFromWorkStationIP(String ip, Tracer tracer){
        WorkStation nextWorkStation = null;
        WSConfiguration nextWSConfiguration = this.getNextWSConfiguration(tracer.getWsConfiguration());
        if(nextWSConfiguration != null) {
            WSConfiguration nextToNextWSConfiguration = this.getNextWSConfiguration(nextWSConfiguration);
            nextWorkStation = (nextToNextWSConfiguration != null) ? nextToNextWSConfiguration.getWorkStation() : null;
        }
        return this.tracerService.sendFromWorkStationIP(nextWSConfiguration, ip, tracer, nextWorkStation);
    }

    public Tracer send(Tracer tracer){
        WorkStation nextWorkStation = null;
        WSConfiguration nextWSConfiguration = this.getNextWSConfiguration(tracer.getWsConfiguration());
        if(nextWSConfiguration != null) {
            WSConfiguration nextToNextWSConfiguration = this.getNextWSConfiguration(nextWSConfiguration);
            nextWorkStation = (nextToNextWSConfiguration != null) ? nextToNextWSConfiguration.getWorkStation() : null;
        }
        return this.tracerService.send(nextWSConfiguration, tracer, nextWorkStation);
    }

    public WSConfiguration getNextWSConfiguration(WSConfiguration wSConfiguration){
        return this.wSConfigurationService.getNextWSConfiguration(wSConfiguration);
    }

    public List<SupplyType> getSupplyTypesForLine(Line line){
        Set<SupplyType> supplyTypes = new HashSet<SupplyType>();

        for(WSConfiguration wSConfiguration: line.getWsConfigurations()){
            for(SupplyType supplyType: wSConfiguration.getSupplyTypes()) {
                supplyTypes.add(supplyType);
            }
        }

        return new ArrayList<>(supplyTypes);
    }
}


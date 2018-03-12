package com.todotresde.sfi2.service;

import com.todotresde.sfi2.domain.Line;
import com.todotresde.sfi2.domain.MOProduct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class SchedulerService {

    private final Logger log = LoggerFactory.getLogger(SchedulerService.class);

    private final LineService lineService;

    public SchedulerService(LineService lineService) {
        this.lineService = lineService;
    }

    public void sendMOProduct(MOProduct mOProduct) {
        log.debug("Send manufacturingOrderProduct to build {}", mOProduct.getId());

        Line line = lineService.getBestLineForMOProduct(mOProduct);

        lineService.sendMOProduct(line, mOProduct);
    }
}


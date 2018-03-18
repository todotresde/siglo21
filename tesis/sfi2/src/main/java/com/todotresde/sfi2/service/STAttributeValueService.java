package com.todotresde.sfi2.service;

import com.todotresde.sfi2.domain.Product;
import com.todotresde.sfi2.domain.STAttributeValue;
import com.todotresde.sfi2.domain.Supply;
import com.todotresde.sfi2.domain.SupplyType;
import com.todotresde.sfi2.repository.ProductRepository;
import com.todotresde.sfi2.repository.STAttributeValueRepository;
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
public class STAttributeValueService {

    private final Logger log = LoggerFactory.getLogger(STAttributeValueService.class);

    private final STAttributeValueRepository stAttributeValueRepository;

    public STAttributeValueService(STAttributeValueRepository stAttributeValueRepository) {
        this.stAttributeValueRepository = stAttributeValueRepository;
    }

    public STAttributeValue save(STAttributeValue stAttributeValue) {
        return this.stAttributeValueRepository.save(stAttributeValue);
    }

}


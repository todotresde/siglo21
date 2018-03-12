package com.todotresde.line.manufacturing.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.line.manufacturing.domain.WSConfiguration;
import com.todotresde.line.manufacturing.service.WSConfigurationService;
import com.todotresde.line.manufacturing.web.rest.util.HeaderUtil;
import com.todotresde.line.manufacturing.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing WSConfiguration.
 */
@RestController
@RequestMapping("/api")
public class WSConfigurationResource {

    private final Logger log = LoggerFactory.getLogger(WSConfigurationResource.class);

    private static final String ENTITY_NAME = "wSConfiguration";
        
    private final WSConfigurationService wSConfigurationService;

    public WSConfigurationResource(WSConfigurationService wSConfigurationService) {
        this.wSConfigurationService = wSConfigurationService;
    }

    /**
     * POST  /w-s-configurations : Create a new wSConfiguration.
     *
     * @param wSConfiguration the wSConfiguration to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wSConfiguration, or with status 400 (Bad Request) if the wSConfiguration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/w-s-configurations")
    @Timed
    public ResponseEntity<WSConfiguration> createWSConfiguration(@RequestBody WSConfiguration wSConfiguration) throws URISyntaxException {
        log.debug("REST request to save WSConfiguration : {}", wSConfiguration);
        if (wSConfiguration.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new wSConfiguration cannot already have an ID")).body(null);
        }
        WSConfiguration result = wSConfigurationService.save(wSConfiguration);
        return ResponseEntity.created(new URI("/api/w-s-configurations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /w-s-configurations : Updates an existing wSConfiguration.
     *
     * @param wSConfiguration the wSConfiguration to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wSConfiguration,
     * or with status 400 (Bad Request) if the wSConfiguration is not valid,
     * or with status 500 (Internal Server Error) if the wSConfiguration couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/w-s-configurations")
    @Timed
    public ResponseEntity<WSConfiguration> updateWSConfiguration(@RequestBody WSConfiguration wSConfiguration) throws URISyntaxException {
        log.debug("REST request to update WSConfiguration : {}", wSConfiguration);
        if (wSConfiguration.getId() == null) {
            return createWSConfiguration(wSConfiguration);
        }
        WSConfiguration result = wSConfigurationService.save(wSConfiguration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, wSConfiguration.getId().toString()))
            .body(result);
    }

    /**
     * GET  /w-s-configurations : get all the wSConfigurations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of wSConfigurations in body
     */
    @GetMapping("/w-s-configurations")
    @Timed
    public ResponseEntity<List<WSConfiguration>> getAllWSConfigurations(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of WSConfigurations");
        Page<WSConfiguration> page = wSConfigurationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/w-s-configurations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /w-s-configurations/:id : get the "id" wSConfiguration.
     *
     * @param id the id of the wSConfiguration to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wSConfiguration, or with status 404 (Not Found)
     */
    @GetMapping("/w-s-configurations/{id}")
    @Timed
    public ResponseEntity<WSConfiguration> getWSConfiguration(@PathVariable Long id) {
        log.debug("REST request to get WSConfiguration : {}", id);
        WSConfiguration wSConfiguration = wSConfigurationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(wSConfiguration));
    }

    /**
     * DELETE  /w-s-configurations/:id : delete the "id" wSConfiguration.
     *
     * @param id the id of the wSConfiguration to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/w-s-configurations/{id}")
    @Timed
    public ResponseEntity<Void> deleteWSConfiguration(@PathVariable Long id) {
        log.debug("REST request to delete WSConfiguration : {}", id);
        wSConfigurationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}

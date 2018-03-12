package com.todotresde.sfi2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.sfi2.domain.WSConfiguration;

import com.todotresde.sfi2.repository.WSConfigurationRepository;
import com.todotresde.sfi2.web.rest.errors.BadRequestAlertException;
import com.todotresde.sfi2.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    private final WSConfigurationRepository wSConfigurationRepository;

    public WSConfigurationResource(WSConfigurationRepository wSConfigurationRepository) {
        this.wSConfigurationRepository = wSConfigurationRepository;
    }

    /**
     * POST  /ws-configurations : Create a new wSConfiguration.
     *
     * @param wSConfiguration the wSConfiguration to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wSConfiguration, or with status 400 (Bad Request) if the wSConfiguration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ws-configurations")
    @Timed
    public ResponseEntity<WSConfiguration> createWSConfiguration(@Valid @RequestBody WSConfiguration wSConfiguration) throws URISyntaxException {
        log.debug("REST request to save WSConfiguration : {}", wSConfiguration);
        if (wSConfiguration.getId() != null) {
            throw new BadRequestAlertException("A new wSConfiguration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WSConfiguration result = wSConfigurationRepository.save(wSConfiguration);
        return ResponseEntity.created(new URI("/api/ws-configurations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ws-configurations : Updates an existing wSConfiguration.
     *
     * @param wSConfiguration the wSConfiguration to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wSConfiguration,
     * or with status 400 (Bad Request) if the wSConfiguration is not valid,
     * or with status 500 (Internal Server Error) if the wSConfiguration couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ws-configurations")
    @Timed
    public ResponseEntity<WSConfiguration> updateWSConfiguration(@Valid @RequestBody WSConfiguration wSConfiguration) throws URISyntaxException {
        log.debug("REST request to update WSConfiguration : {}", wSConfiguration);
        if (wSConfiguration.getId() == null) {
            return createWSConfiguration(wSConfiguration);
        }
        WSConfiguration result = wSConfigurationRepository.save(wSConfiguration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, wSConfiguration.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ws-configurations : get all the wSConfigurations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of wSConfigurations in body
     */
    @GetMapping("/ws-configurations")
    @Timed
    public List<WSConfiguration> getAllWSConfigurations() {
        log.debug("REST request to get all WSConfigurations");
        return wSConfigurationRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /ws-configurations/:id : get the "id" wSConfiguration.
     *
     * @param id the id of the wSConfiguration to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wSConfiguration, or with status 404 (Not Found)
     */
    @GetMapping("/ws-configurations/{id}")
    @Timed
    public ResponseEntity<WSConfiguration> getWSConfiguration(@PathVariable Long id) {
        log.debug("REST request to get WSConfiguration : {}", id);
        WSConfiguration wSConfiguration = wSConfigurationRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(wSConfiguration));
    }

    /**
     * DELETE  /ws-configurations/:id : delete the "id" wSConfiguration.
     *
     * @param id the id of the wSConfiguration to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ws-configurations/{id}")
    @Timed
    public ResponseEntity<Void> deleteWSConfiguration(@PathVariable Long id) {
        log.debug("REST request to delete WSConfiguration : {}", id);
        wSConfigurationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

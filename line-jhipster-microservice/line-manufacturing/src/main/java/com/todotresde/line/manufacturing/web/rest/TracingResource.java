package com.todotresde.line.manufacturing.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.line.manufacturing.domain.Tracing;
import com.todotresde.line.manufacturing.service.TracingService;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Tracing.
 */
@RestController
@RequestMapping("/api")
public class TracingResource {

    private final Logger log = LoggerFactory.getLogger(TracingResource.class);

    private static final String ENTITY_NAME = "tracing";
        
    private final TracingService tracingService;

    public TracingResource(TracingService tracingService) {
        this.tracingService = tracingService;
    }

    /**
     * POST  /tracings : Create a new tracing.
     *
     * @param tracing the tracing to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tracing, or with status 400 (Bad Request) if the tracing has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tracings")
    @Timed
    public ResponseEntity<Tracing> createTracing(@Valid @RequestBody Tracing tracing) throws URISyntaxException {
        log.debug("REST request to save Tracing : {}", tracing);
        if (tracing.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new tracing cannot already have an ID")).body(null);
        }
        Tracing result = tracingService.save(tracing);
        return ResponseEntity.created(new URI("/api/tracings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tracings : Updates an existing tracing.
     *
     * @param tracing the tracing to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tracing,
     * or with status 400 (Bad Request) if the tracing is not valid,
     * or with status 500 (Internal Server Error) if the tracing couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tracings")
    @Timed
    public ResponseEntity<Tracing> updateTracing(@Valid @RequestBody Tracing tracing) throws URISyntaxException {
        log.debug("REST request to update Tracing : {}", tracing);
        if (tracing.getId() == null) {
            return createTracing(tracing);
        }
        Tracing result = tracingService.save(tracing);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tracing.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tracings : get all the tracings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tracings in body
     */
    @GetMapping("/tracings")
    @Timed
    public ResponseEntity<List<Tracing>> getAllTracings(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Tracings");
        Page<Tracing> page = tracingService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tracings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tracings/:id : get the "id" tracing.
     *
     * @param id the id of the tracing to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tracing, or with status 404 (Not Found)
     */
    @GetMapping("/tracings/{id}")
    @Timed
    public ResponseEntity<Tracing> getTracing(@PathVariable Long id) {
        log.debug("REST request to get Tracing : {}", id);
        Tracing tracing = tracingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tracing));
    }

    /**
     * DELETE  /tracings/:id : delete the "id" tracing.
     *
     * @param id the id of the tracing to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tracings/{id}")
    @Timed
    public ResponseEntity<Void> deleteTracing(@PathVariable Long id) {
        log.debug("REST request to delete Tracing : {}", id);
        tracingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}

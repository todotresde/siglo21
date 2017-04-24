package com.todotresde.line.manufacturing.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.line.manufacturing.domain.Delay;
import com.todotresde.line.manufacturing.service.DelayService;
import com.todotresde.line.manufacturing.web.rest.util.HeaderUtil;
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
 * REST controller for managing Delay.
 */
@RestController
@RequestMapping("/api")
public class DelayResource {

    private final Logger log = LoggerFactory.getLogger(DelayResource.class);

    private static final String ENTITY_NAME = "delay";
        
    private final DelayService delayService;

    public DelayResource(DelayService delayService) {
        this.delayService = delayService;
    }

    /**
     * POST  /delays : Create a new delay.
     *
     * @param delay the delay to create
     * @return the ResponseEntity with status 201 (Created) and with body the new delay, or with status 400 (Bad Request) if the delay has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/delays")
    @Timed
    public ResponseEntity<Delay> createDelay(@Valid @RequestBody Delay delay) throws URISyntaxException {
        log.debug("REST request to save Delay : {}", delay);
        if (delay.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new delay cannot already have an ID")).body(null);
        }
        Delay result = delayService.save(delay);
        return ResponseEntity.created(new URI("/api/delays/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /delays : Updates an existing delay.
     *
     * @param delay the delay to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated delay,
     * or with status 400 (Bad Request) if the delay is not valid,
     * or with status 500 (Internal Server Error) if the delay couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/delays")
    @Timed
    public ResponseEntity<Delay> updateDelay(@Valid @RequestBody Delay delay) throws URISyntaxException {
        log.debug("REST request to update Delay : {}", delay);
        if (delay.getId() == null) {
            return createDelay(delay);
        }
        Delay result = delayService.save(delay);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, delay.getId().toString()))
            .body(result);
    }

    /**
     * GET  /delays : get all the delays.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of delays in body
     */
    @GetMapping("/delays")
    @Timed
    public List<Delay> getAllDelays() {
        log.debug("REST request to get all Delays");
        return delayService.findAll();
    }

    /**
     * GET  /delays/:id : get the "id" delay.
     *
     * @param id the id of the delay to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the delay, or with status 404 (Not Found)
     */
    @GetMapping("/delays/{id}")
    @Timed
    public ResponseEntity<Delay> getDelay(@PathVariable Long id) {
        log.debug("REST request to get Delay : {}", id);
        Delay delay = delayService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(delay));
    }

    /**
     * DELETE  /delays/:id : delete the "id" delay.
     *
     * @param id the id of the delay to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/delays/{id}")
    @Timed
    public ResponseEntity<Void> deleteDelay(@PathVariable Long id) {
        log.debug("REST request to delete Delay : {}", id);
        delayService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}

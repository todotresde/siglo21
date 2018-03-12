package com.todotresde.line.manufacturing.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.line.manufacturing.domain.WS;
import com.todotresde.line.manufacturing.service.WSService;
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
 * REST controller for managing WS.
 */
@RestController
@RequestMapping("/api")
public class WSResource {

    private final Logger log = LoggerFactory.getLogger(WSResource.class);

    private static final String ENTITY_NAME = "wS";
        
    private final WSService wSService;

    public WSResource(WSService wSService) {
        this.wSService = wSService;
    }

    /**
     * POST  /w-s : Create a new wS.
     *
     * @param wS the wS to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wS, or with status 400 (Bad Request) if the wS has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/w-s")
    @Timed
    public ResponseEntity<WS> createWS(@Valid @RequestBody WS wS) throws URISyntaxException {
        log.debug("REST request to save WS : {}", wS);
        if (wS.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new wS cannot already have an ID")).body(null);
        }
        WS result = wSService.save(wS);
        return ResponseEntity.created(new URI("/api/w-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /w-s : Updates an existing wS.
     *
     * @param wS the wS to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wS,
     * or with status 400 (Bad Request) if the wS is not valid,
     * or with status 500 (Internal Server Error) if the wS couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/w-s")
    @Timed
    public ResponseEntity<WS> updateWS(@Valid @RequestBody WS wS) throws URISyntaxException {
        log.debug("REST request to update WS : {}", wS);
        if (wS.getId() == null) {
            return createWS(wS);
        }
        WS result = wSService.save(wS);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, wS.getId().toString()))
            .body(result);
    }

    /**
     * GET  /w-s : get all the wS.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of wS in body
     */
    @GetMapping("/w-s")
    @Timed
    public ResponseEntity<List<WS>> getAllWS(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of WS");
        Page<WS> page = wSService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/w-s");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /w-s/:id : get the "id" wS.
     *
     * @param id the id of the wS to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wS, or with status 404 (Not Found)
     */
    @GetMapping("/w-s/{id}")
    @Timed
    public ResponseEntity<WS> getWS(@PathVariable Long id) {
        log.debug("REST request to get WS : {}", id);
        WS wS = wSService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(wS));
    }

    /**
     * DELETE  /w-s/:id : delete the "id" wS.
     *
     * @param id the id of the wS to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/w-s/{id}")
    @Timed
    public ResponseEntity<Void> deleteWS(@PathVariable Long id) {
        log.debug("REST request to delete WS : {}", id);
        wSService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}

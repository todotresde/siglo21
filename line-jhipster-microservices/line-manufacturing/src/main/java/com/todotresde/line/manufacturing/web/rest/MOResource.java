package com.todotresde.line.manufacturing.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.line.manufacturing.domain.MO;
import com.todotresde.line.manufacturing.service.MOService;
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
 * REST controller for managing MO.
 */
@RestController
@RequestMapping("/api")
public class MOResource {

    private final Logger log = LoggerFactory.getLogger(MOResource.class);

    private static final String ENTITY_NAME = "mO";
        
    private final MOService mOService;

    public MOResource(MOService mOService) {
        this.mOService = mOService;
    }

    /**
     * POST  /m-os : Create a new mO.
     *
     * @param mO the mO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mO, or with status 400 (Bad Request) if the mO has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/m-os")
    @Timed
    public ResponseEntity<MO> createMO(@Valid @RequestBody MO mO) throws URISyntaxException {
        log.debug("REST request to save MO : {}", mO);
        if (mO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new mO cannot already have an ID")).body(null);
        }
        MO result = mOService.save(mO);
        return ResponseEntity.created(new URI("/api/m-os/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /m-os : Updates an existing mO.
     *
     * @param mO the mO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mO,
     * or with status 400 (Bad Request) if the mO is not valid,
     * or with status 500 (Internal Server Error) if the mO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/m-os")
    @Timed
    public ResponseEntity<MO> updateMO(@Valid @RequestBody MO mO) throws URISyntaxException {
        log.debug("REST request to update MO : {}", mO);
        if (mO.getId() == null) {
            return createMO(mO);
        }
        MO result = mOService.save(mO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /m-os : get all the mOS.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mOS in body
     */
    @GetMapping("/m-os")
    @Timed
    public List<MO> getAllMOS() {
        log.debug("REST request to get all MOS");
        return mOService.findAll();
    }

    /**
     * GET  /m-os/:id : get the "id" mO.
     *
     * @param id the id of the mO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mO, or with status 404 (Not Found)
     */
    @GetMapping("/m-os/{id}")
    @Timed
    public ResponseEntity<MO> getMO(@PathVariable Long id) {
        log.debug("REST request to get MO : {}", id);
        MO mO = mOService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mO));
    }

    /**
     * DELETE  /m-os/:id : delete the "id" mO.
     *
     * @param id the id of the mO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/m-os/{id}")
    @Timed
    public ResponseEntity<Void> deleteMO(@PathVariable Long id) {
        log.debug("REST request to delete MO : {}", id);
        mOService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}

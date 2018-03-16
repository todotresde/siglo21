package com.todotresde.sfi2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.sfi2.domain.STAttributeValue;

import com.todotresde.sfi2.repository.STAttributeValueRepository;
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
 * REST controller for managing STAttributeValue.
 */
@RestController
@RequestMapping("/api")
public class STAttributeValueResource {

    private final Logger log = LoggerFactory.getLogger(STAttributeValueResource.class);

    private static final String ENTITY_NAME = "sTAttributeValue";

    private final STAttributeValueRepository sTAttributeValueRepository;

    public STAttributeValueResource(STAttributeValueRepository sTAttributeValueRepository) {
        this.sTAttributeValueRepository = sTAttributeValueRepository;
    }

    /**
     * POST  /st-attribute-values : Create a new sTAttributeValue.
     *
     * @param sTAttributeValue the sTAttributeValue to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sTAttributeValue, or with status 400 (Bad Request) if the sTAttributeValue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/st-attribute-values")
    @Timed
    public ResponseEntity<STAttributeValue> createSTAttributeValue(@Valid @RequestBody STAttributeValue sTAttributeValue) throws URISyntaxException {
        log.debug("REST request to save STAttributeValue : {}", sTAttributeValue);
        if (sTAttributeValue.getId() != null) {
            throw new BadRequestAlertException("A new sTAttributeValue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        STAttributeValue result = sTAttributeValueRepository.save(sTAttributeValue);
        return ResponseEntity.created(new URI("/api/st-attribute-values/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /st-attribute-values : Updates an existing sTAttributeValue.
     *
     * @param sTAttributeValue the sTAttributeValue to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sTAttributeValue,
     * or with status 400 (Bad Request) if the sTAttributeValue is not valid,
     * or with status 500 (Internal Server Error) if the sTAttributeValue couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/st-attribute-values")
    @Timed
    public ResponseEntity<STAttributeValue> updateSTAttributeValue(@Valid @RequestBody STAttributeValue sTAttributeValue) throws URISyntaxException {
        log.debug("REST request to update STAttributeValue : {}", sTAttributeValue);
        if (sTAttributeValue.getId() == null) {
            return createSTAttributeValue(sTAttributeValue);
        }
        STAttributeValue result = sTAttributeValueRepository.save(sTAttributeValue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sTAttributeValue.getId().toString()))
            .body(result);
    }

    /**
     * GET  /st-attribute-values : get all the sTAttributeValues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sTAttributeValues in body
     */
    @GetMapping("/st-attribute-values")
    @Timed
    public List<STAttributeValue> getAllSTAttributeValues() {
        log.debug("REST request to get all STAttributeValues");
        return sTAttributeValueRepository.findAll();
        }

    /**
     * GET  /st-attribute-values/:id : get the "id" sTAttributeValue.
     *
     * @param id the id of the sTAttributeValue to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sTAttributeValue, or with status 404 (Not Found)
     */
    @GetMapping("/st-attribute-values/{id}")
    @Timed
    public ResponseEntity<STAttributeValue> getSTAttributeValue(@PathVariable Long id) {
        log.debug("REST request to get STAttributeValue : {}", id);
        STAttributeValue sTAttributeValue = sTAttributeValueRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sTAttributeValue));
    }

    /**
     * DELETE  /st-attribute-values/:id : delete the "id" sTAttributeValue.
     *
     * @param id the id of the sTAttributeValue to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/st-attribute-values/{id}")
    @Timed
    public ResponseEntity<Void> deleteSTAttributeValue(@PathVariable Long id) {
        log.debug("REST request to delete STAttributeValue : {}", id);
        sTAttributeValueRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

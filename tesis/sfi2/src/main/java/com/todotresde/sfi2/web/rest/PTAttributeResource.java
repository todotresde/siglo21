package com.todotresde.sfi2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.sfi2.domain.PTAttribute;

import com.todotresde.sfi2.repository.PTAttributeRepository;
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
 * REST controller for managing PTAttribute.
 */
@RestController
@RequestMapping("/api")
public class PTAttributeResource {

    private final Logger log = LoggerFactory.getLogger(PTAttributeResource.class);

    private static final String ENTITY_NAME = "pTAttribute";

    private final PTAttributeRepository pTAttributeRepository;

    public PTAttributeResource(PTAttributeRepository pTAttributeRepository) {
        this.pTAttributeRepository = pTAttributeRepository;
    }

    /**
     * POST  /pt-attributes : Create a new pTAttribute.
     *
     * @param pTAttribute the pTAttribute to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pTAttribute, or with status 400 (Bad Request) if the pTAttribute has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pt-attributes")
    @Timed
    public ResponseEntity<PTAttribute> createPTAttribute(@Valid @RequestBody PTAttribute pTAttribute) throws URISyntaxException {
        log.debug("REST request to save PTAttribute : {}", pTAttribute);
        if (pTAttribute.getId() != null) {
            throw new BadRequestAlertException("A new pTAttribute cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PTAttribute result = pTAttributeRepository.save(pTAttribute);
        return ResponseEntity.created(new URI("/api/pt-attributes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pt-attributes : Updates an existing pTAttribute.
     *
     * @param pTAttribute the pTAttribute to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pTAttribute,
     * or with status 400 (Bad Request) if the pTAttribute is not valid,
     * or with status 500 (Internal Server Error) if the pTAttribute couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pt-attributes")
    @Timed
    public ResponseEntity<PTAttribute> updatePTAttribute(@Valid @RequestBody PTAttribute pTAttribute) throws URISyntaxException {
        log.debug("REST request to update PTAttribute : {}", pTAttribute);
        if (pTAttribute.getId() == null) {
            return createPTAttribute(pTAttribute);
        }
        PTAttribute result = pTAttributeRepository.save(pTAttribute);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pTAttribute.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pt-attributes : get all the pTAttributes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pTAttributes in body
     */
    @GetMapping("/pt-attributes")
    @Timed
    public List<PTAttribute> getAllPTAttributes() {
        log.debug("REST request to get all PTAttributes");
        return pTAttributeRepository.findAll();
        }

    /**
     * GET  /pt-attributes/:id : get the "id" pTAttribute.
     *
     * @param id the id of the pTAttribute to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pTAttribute, or with status 404 (Not Found)
     */
    @GetMapping("/pt-attributes/{id}")
    @Timed
    public ResponseEntity<PTAttribute> getPTAttribute(@PathVariable Long id) {
        log.debug("REST request to get PTAttribute : {}", id);
        PTAttribute pTAttribute = pTAttributeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pTAttribute));
    }

    /**
     * DELETE  /pt-attributes/:id : delete the "id" pTAttribute.
     *
     * @param id the id of the pTAttribute to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pt-attributes/{id}")
    @Timed
    public ResponseEntity<Void> deletePTAttribute(@PathVariable Long id) {
        log.debug("REST request to delete PTAttribute : {}", id);
        pTAttributeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

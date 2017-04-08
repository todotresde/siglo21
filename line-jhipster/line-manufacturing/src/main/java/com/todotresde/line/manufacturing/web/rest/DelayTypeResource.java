package com.todotresde.line.manufacturing.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.line.manufacturing.domain.DelayType;
import com.todotresde.line.manufacturing.service.DelayTypeService;
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
 * REST controller for managing DelayType.
 */
@RestController
@RequestMapping("/api")
public class DelayTypeResource {

    private final Logger log = LoggerFactory.getLogger(DelayTypeResource.class);

    private static final String ENTITY_NAME = "delayType";
        
    private final DelayTypeService delayTypeService;

    public DelayTypeResource(DelayTypeService delayTypeService) {
        this.delayTypeService = delayTypeService;
    }

    /**
     * POST  /delay-types : Create a new delayType.
     *
     * @param delayType the delayType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new delayType, or with status 400 (Bad Request) if the delayType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/delay-types")
    @Timed
    public ResponseEntity<DelayType> createDelayType(@Valid @RequestBody DelayType delayType) throws URISyntaxException {
        log.debug("REST request to save DelayType : {}", delayType);
        if (delayType.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new delayType cannot already have an ID")).body(null);
        }
        DelayType result = delayTypeService.save(delayType);
        return ResponseEntity.created(new URI("/api/delay-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /delay-types : Updates an existing delayType.
     *
     * @param delayType the delayType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated delayType,
     * or with status 400 (Bad Request) if the delayType is not valid,
     * or with status 500 (Internal Server Error) if the delayType couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/delay-types")
    @Timed
    public ResponseEntity<DelayType> updateDelayType(@Valid @RequestBody DelayType delayType) throws URISyntaxException {
        log.debug("REST request to update DelayType : {}", delayType);
        if (delayType.getId() == null) {
            return createDelayType(delayType);
        }
        DelayType result = delayTypeService.save(delayType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, delayType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /delay-types : get all the delayTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of delayTypes in body
     */
    @GetMapping("/delay-types")
    @Timed
    public List<DelayType> getAllDelayTypes() {
        log.debug("REST request to get all DelayTypes");
        return delayTypeService.findAll();
    }

    /**
     * GET  /delay-types/:id : get the "id" delayType.
     *
     * @param id the id of the delayType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the delayType, or with status 404 (Not Found)
     */
    @GetMapping("/delay-types/{id}")
    @Timed
    public ResponseEntity<DelayType> getDelayType(@PathVariable Long id) {
        log.debug("REST request to get DelayType : {}", id);
        DelayType delayType = delayTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(delayType));
    }

    /**
     * DELETE  /delay-types/:id : delete the "id" delayType.
     *
     * @param id the id of the delayType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/delay-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteDelayType(@PathVariable Long id) {
        log.debug("REST request to delete DelayType : {}", id);
        delayTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}

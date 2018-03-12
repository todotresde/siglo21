package com.todotresde.line.manufacturing.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.line.manufacturing.domain.MOCustomProduct;
import com.todotresde.line.manufacturing.service.MOCustomProductService;
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
 * REST controller for managing MOCustomProduct.
 */
@RestController
@RequestMapping("/api")
public class MOCustomProductResource {

    private final Logger log = LoggerFactory.getLogger(MOCustomProductResource.class);

    private static final String ENTITY_NAME = "mOCustomProduct";
        
    private final MOCustomProductService mOCustomProductService;

    public MOCustomProductResource(MOCustomProductService mOCustomProductService) {
        this.mOCustomProductService = mOCustomProductService;
    }

    /**
     * POST  /m-o-custom-products : Create a new mOCustomProduct.
     *
     * @param mOCustomProduct the mOCustomProduct to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mOCustomProduct, or with status 400 (Bad Request) if the mOCustomProduct has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/m-o-custom-products")
    @Timed
    public ResponseEntity<MOCustomProduct> createMOCustomProduct(@Valid @RequestBody MOCustomProduct mOCustomProduct) throws URISyntaxException {
        log.debug("REST request to save MOCustomProduct : {}", mOCustomProduct);
        if (mOCustomProduct.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new mOCustomProduct cannot already have an ID")).body(null);
        }
        MOCustomProduct result = mOCustomProductService.save(mOCustomProduct);
        return ResponseEntity.created(new URI("/api/m-o-custom-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /m-o-custom-products : Updates an existing mOCustomProduct.
     *
     * @param mOCustomProduct the mOCustomProduct to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mOCustomProduct,
     * or with status 400 (Bad Request) if the mOCustomProduct is not valid,
     * or with status 500 (Internal Server Error) if the mOCustomProduct couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/m-o-custom-products")
    @Timed
    public ResponseEntity<MOCustomProduct> updateMOCustomProduct(@Valid @RequestBody MOCustomProduct mOCustomProduct) throws URISyntaxException {
        log.debug("REST request to update MOCustomProduct : {}", mOCustomProduct);
        if (mOCustomProduct.getId() == null) {
            return createMOCustomProduct(mOCustomProduct);
        }
        MOCustomProduct result = mOCustomProductService.save(mOCustomProduct);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mOCustomProduct.getId().toString()))
            .body(result);
    }

    /**
     * GET  /m-o-custom-products : get all the mOCustomProducts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of mOCustomProducts in body
     */
    @GetMapping("/m-o-custom-products")
    @Timed
    public ResponseEntity<List<MOCustomProduct>> getAllMOCustomProducts(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of MOCustomProducts");
        Page<MOCustomProduct> page = mOCustomProductService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/m-o-custom-products");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /m-o-custom-products/:id : get the "id" mOCustomProduct.
     *
     * @param id the id of the mOCustomProduct to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mOCustomProduct, or with status 404 (Not Found)
     */
    @GetMapping("/m-o-custom-products/{id}")
    @Timed
    public ResponseEntity<MOCustomProduct> getMOCustomProduct(@PathVariable Long id) {
        log.debug("REST request to get MOCustomProduct : {}", id);
        MOCustomProduct mOCustomProduct = mOCustomProductService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mOCustomProduct));
    }

    /**
     * DELETE  /m-o-custom-products/:id : delete the "id" mOCustomProduct.
     *
     * @param id the id of the mOCustomProduct to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/m-o-custom-products/{id}")
    @Timed
    public ResponseEntity<Void> deleteMOCustomProduct(@PathVariable Long id) {
        log.debug("REST request to delete MOCustomProduct : {}", id);
        mOCustomProductService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}

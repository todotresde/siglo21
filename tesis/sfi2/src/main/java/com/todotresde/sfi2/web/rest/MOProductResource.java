package com.todotresde.sfi2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.sfi2.domain.MOProduct;

import com.todotresde.sfi2.domain.ManufacturingOrder;
import com.todotresde.sfi2.repository.MOProductRepository;
import com.todotresde.sfi2.repository.ManufacturingOrderRepository;
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
 * REST controller for managing MOProduct.
 */
@RestController
@RequestMapping("/api")
public class MOProductResource {

    private final Logger log = LoggerFactory.getLogger(MOProductResource.class);

    private static final String ENTITY_NAME = "mOProduct";

    private final MOProductRepository mOProductRepository;
    private final ManufacturingOrderRepository manufacturingOrderRepository;

    public MOProductResource(MOProductRepository mOProductRepository, ManufacturingOrderRepository manufacturingOrderRepository) {
        this.mOProductRepository = mOProductRepository;
        this.manufacturingOrderRepository = manufacturingOrderRepository;
    }

    /**
     * POST  /mo-products : Create a new mOProduct.
     *
     * @param mOProduct the mOProduct to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mOProduct, or with status 400 (Bad Request) if the mOProduct has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mo-products")
    @Timed
    public ResponseEntity<MOProduct> createMOProduct(@Valid @RequestBody MOProduct mOProduct) throws URISyntaxException {
        log.debug("REST request to save MOProduct : {}", mOProduct);
        if (mOProduct.getId() != null) {
            throw new BadRequestAlertException("A new mOProduct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MOProduct result = mOProductRepository.save(mOProduct);
        return ResponseEntity.created(new URI("/api/mo-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mo-products : Updates an existing mOProduct.
     *
     * @param mOProduct the mOProduct to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mOProduct,
     * or with status 400 (Bad Request) if the mOProduct is not valid,
     * or with status 500 (Internal Server Error) if the mOProduct couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mo-products")
    @Timed
    public ResponseEntity<MOProduct> updateMOProduct(@Valid @RequestBody MOProduct mOProduct) throws URISyntaxException {
        log.debug("REST request to update MOProduct : {}", mOProduct);
        if (mOProduct.getId() == null) {
            return createMOProduct(mOProduct);
        }
        MOProduct result = mOProductRepository.save(mOProduct);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mOProduct.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mo-products : get all the mOProducts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mOProducts in body
     */
    @GetMapping("/mo-products")
    @Timed
    public List<MOProduct> getAllMOProducts() {
        log.debug("REST request to get all MOProducts");
        return mOProductRepository.findAll();
        }

    /**
     * GET  /mo-products : get all the mOProducts by manufacturingOrder.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mOProducts in body
     */
    @GetMapping("/mo-products/manufacturingOrder/{id}")
    @Timed
    public List<MOProduct> getAllMOProductsByMO(@PathVariable Long id) {
        log.debug("REST request to get all MOProducts by MO");
        ManufacturingOrder manufacturingOrder = manufacturingOrderRepository.findOne(id);
        return mOProductRepository.findByManufacturingOrder(manufacturingOrder);
    }

    /**
     * GET  /mo-products/:id : get the "id" mOProduct.
     *
     * @param id the id of the mOProduct to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mOProduct, or with status 404 (Not Found)
     */
    @GetMapping("/mo-products/{id}")
    @Timed
    public ResponseEntity<MOProduct> getMOProduct(@PathVariable Long id) {
        log.debug("REST request to get MOProduct : {}", id);
        MOProduct mOProduct = mOProductRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mOProduct));
    }

    /**
     * DELETE  /mo-products/:id : delete the "id" mOProduct.
     *
     * @param id the id of the mOProduct to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mo-products/{id}")
    @Timed
    public ResponseEntity<Void> deleteMOProduct(@PathVariable Long id) {
        log.debug("REST request to delete MOProduct : {}", id);
        mOProductRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

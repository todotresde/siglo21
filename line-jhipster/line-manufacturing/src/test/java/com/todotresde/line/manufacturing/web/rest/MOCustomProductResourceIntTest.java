package com.todotresde.line.manufacturing.web.rest;

import com.todotresde.line.manufacturing.LineManufacturingApp;

import com.todotresde.line.manufacturing.domain.MOCustomProduct;
import com.todotresde.line.manufacturing.repository.MOCustomProductRepository;
import com.todotresde.line.manufacturing.service.MOCustomProductService;
import com.todotresde.line.manufacturing.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MOCustomProductResource REST controller.
 *
 * @see MOCustomProductResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LineManufacturingApp.class)
public class MOCustomProductResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private MOCustomProductRepository mOCustomProductRepository;

    @Autowired
    private MOCustomProductService mOCustomProductService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMOCustomProductMockMvc;

    private MOCustomProduct mOCustomProduct;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        MOCustomProductResource mOCustomProductResource = new MOCustomProductResource(mOCustomProductService);
        this.restMOCustomProductMockMvc = MockMvcBuilders.standaloneSetup(mOCustomProductResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MOCustomProduct createEntity(EntityManager em) {
        MOCustomProduct mOCustomProduct = new MOCustomProduct()
            .description(DEFAULT_DESCRIPTION);
        return mOCustomProduct;
    }

    @Before
    public void initTest() {
        mOCustomProduct = createEntity(em);
    }

    @Test
    @Transactional
    public void createMOCustomProduct() throws Exception {
        int databaseSizeBeforeCreate = mOCustomProductRepository.findAll().size();

        // Create the MOCustomProduct
        restMOCustomProductMockMvc.perform(post("/api/m-o-custom-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mOCustomProduct)))
            .andExpect(status().isCreated());

        // Validate the MOCustomProduct in the database
        List<MOCustomProduct> mOCustomProductList = mOCustomProductRepository.findAll();
        assertThat(mOCustomProductList).hasSize(databaseSizeBeforeCreate + 1);
        MOCustomProduct testMOCustomProduct = mOCustomProductList.get(mOCustomProductList.size() - 1);
        assertThat(testMOCustomProduct.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createMOCustomProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mOCustomProductRepository.findAll().size();

        // Create the MOCustomProduct with an existing ID
        mOCustomProduct.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMOCustomProductMockMvc.perform(post("/api/m-o-custom-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mOCustomProduct)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<MOCustomProduct> mOCustomProductList = mOCustomProductRepository.findAll();
        assertThat(mOCustomProductList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = mOCustomProductRepository.findAll().size();
        // set the field null
        mOCustomProduct.setDescription(null);

        // Create the MOCustomProduct, which fails.

        restMOCustomProductMockMvc.perform(post("/api/m-o-custom-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mOCustomProduct)))
            .andExpect(status().isBadRequest());

        List<MOCustomProduct> mOCustomProductList = mOCustomProductRepository.findAll();
        assertThat(mOCustomProductList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMOCustomProducts() throws Exception {
        // Initialize the database
        mOCustomProductRepository.saveAndFlush(mOCustomProduct);

        // Get all the mOCustomProductList
        restMOCustomProductMockMvc.perform(get("/api/m-o-custom-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mOCustomProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getMOCustomProduct() throws Exception {
        // Initialize the database
        mOCustomProductRepository.saveAndFlush(mOCustomProduct);

        // Get the mOCustomProduct
        restMOCustomProductMockMvc.perform(get("/api/m-o-custom-products/{id}", mOCustomProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mOCustomProduct.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMOCustomProduct() throws Exception {
        // Get the mOCustomProduct
        restMOCustomProductMockMvc.perform(get("/api/m-o-custom-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMOCustomProduct() throws Exception {
        // Initialize the database
        mOCustomProductService.save(mOCustomProduct);

        int databaseSizeBeforeUpdate = mOCustomProductRepository.findAll().size();

        // Update the mOCustomProduct
        MOCustomProduct updatedMOCustomProduct = mOCustomProductRepository.findOne(mOCustomProduct.getId());
        updatedMOCustomProduct
            .description(UPDATED_DESCRIPTION);

        restMOCustomProductMockMvc.perform(put("/api/m-o-custom-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMOCustomProduct)))
            .andExpect(status().isOk());

        // Validate the MOCustomProduct in the database
        List<MOCustomProduct> mOCustomProductList = mOCustomProductRepository.findAll();
        assertThat(mOCustomProductList).hasSize(databaseSizeBeforeUpdate);
        MOCustomProduct testMOCustomProduct = mOCustomProductList.get(mOCustomProductList.size() - 1);
        assertThat(testMOCustomProduct.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingMOCustomProduct() throws Exception {
        int databaseSizeBeforeUpdate = mOCustomProductRepository.findAll().size();

        // Create the MOCustomProduct

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMOCustomProductMockMvc.perform(put("/api/m-o-custom-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mOCustomProduct)))
            .andExpect(status().isCreated());

        // Validate the MOCustomProduct in the database
        List<MOCustomProduct> mOCustomProductList = mOCustomProductRepository.findAll();
        assertThat(mOCustomProductList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMOCustomProduct() throws Exception {
        // Initialize the database
        mOCustomProductService.save(mOCustomProduct);

        int databaseSizeBeforeDelete = mOCustomProductRepository.findAll().size();

        // Get the mOCustomProduct
        restMOCustomProductMockMvc.perform(delete("/api/m-o-custom-products/{id}", mOCustomProduct.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MOCustomProduct> mOCustomProductList = mOCustomProductRepository.findAll();
        assertThat(mOCustomProductList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MOCustomProduct.class);
    }
}

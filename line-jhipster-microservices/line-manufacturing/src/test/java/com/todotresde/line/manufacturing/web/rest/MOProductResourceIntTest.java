package com.todotresde.line.manufacturing.web.rest;

import com.todotresde.line.manufacturing.LineManufacturingApp;

import com.todotresde.line.manufacturing.domain.MOProduct;
import com.todotresde.line.manufacturing.repository.MOProductRepository;
import com.todotresde.line.manufacturing.service.MOProductService;
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
 * Test class for the MOProductResource REST controller.
 *
 * @see MOProductResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LineManufacturingApp.class)
public class MOProductResourceIntTest {

    private static final Double DEFAULT_WIDTH = 1D;
    private static final Double UPDATED_WIDTH = 2D;

    private static final Double DEFAULT_HEIGHT = 1D;
    private static final Double UPDATED_HEIGHT = 2D;

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    @Autowired
    private MOProductRepository mOProductRepository;

    @Autowired
    private MOProductService mOProductService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMOProductMockMvc;

    private MOProduct mOProduct;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        MOProductResource mOProductResource = new MOProductResource(mOProductService);
        this.restMOProductMockMvc = MockMvcBuilders.standaloneSetup(mOProductResource)
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
    public static MOProduct createEntity(EntityManager em) {
        MOProduct mOProduct = new MOProduct()
            .width(DEFAULT_WIDTH)
            .height(DEFAULT_HEIGHT)
            .quantity(DEFAULT_QUANTITY);
        return mOProduct;
    }

    @Before
    public void initTest() {
        mOProduct = createEntity(em);
    }

    @Test
    @Transactional
    public void createMOProduct() throws Exception {
        int databaseSizeBeforeCreate = mOProductRepository.findAll().size();

        // Create the MOProduct
        restMOProductMockMvc.perform(post("/api/m-o-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mOProduct)))
            .andExpect(status().isCreated());

        // Validate the MOProduct in the database
        List<MOProduct> mOProductList = mOProductRepository.findAll();
        assertThat(mOProductList).hasSize(databaseSizeBeforeCreate + 1);
        MOProduct testMOProduct = mOProductList.get(mOProductList.size() - 1);
        assertThat(testMOProduct.getWidth()).isEqualTo(DEFAULT_WIDTH);
        assertThat(testMOProduct.getHeight()).isEqualTo(DEFAULT_HEIGHT);
        assertThat(testMOProduct.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createMOProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mOProductRepository.findAll().size();

        // Create the MOProduct with an existing ID
        mOProduct.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMOProductMockMvc.perform(post("/api/m-o-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mOProduct)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<MOProduct> mOProductList = mOProductRepository.findAll();
        assertThat(mOProductList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkWidthIsRequired() throws Exception {
        int databaseSizeBeforeTest = mOProductRepository.findAll().size();
        // set the field null
        mOProduct.setWidth(null);

        // Create the MOProduct, which fails.

        restMOProductMockMvc.perform(post("/api/m-o-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mOProduct)))
            .andExpect(status().isBadRequest());

        List<MOProduct> mOProductList = mOProductRepository.findAll();
        assertThat(mOProductList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHeightIsRequired() throws Exception {
        int databaseSizeBeforeTest = mOProductRepository.findAll().size();
        // set the field null
        mOProduct.setHeight(null);

        // Create the MOProduct, which fails.

        restMOProductMockMvc.perform(post("/api/m-o-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mOProduct)))
            .andExpect(status().isBadRequest());

        List<MOProduct> mOProductList = mOProductRepository.findAll();
        assertThat(mOProductList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = mOProductRepository.findAll().size();
        // set the field null
        mOProduct.setQuantity(null);

        // Create the MOProduct, which fails.

        restMOProductMockMvc.perform(post("/api/m-o-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mOProduct)))
            .andExpect(status().isBadRequest());

        List<MOProduct> mOProductList = mOProductRepository.findAll();
        assertThat(mOProductList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMOProducts() throws Exception {
        // Initialize the database
        mOProductRepository.saveAndFlush(mOProduct);

        // Get all the mOProductList
        restMOProductMockMvc.perform(get("/api/m-o-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mOProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].width").value(hasItem(DEFAULT_WIDTH.doubleValue())))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }

    @Test
    @Transactional
    public void getMOProduct() throws Exception {
        // Initialize the database
        mOProductRepository.saveAndFlush(mOProduct);

        // Get the mOProduct
        restMOProductMockMvc.perform(get("/api/m-o-products/{id}", mOProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mOProduct.getId().intValue()))
            .andExpect(jsonPath("$.width").value(DEFAULT_WIDTH.doubleValue()))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT.doubleValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }

    @Test
    @Transactional
    public void getNonExistingMOProduct() throws Exception {
        // Get the mOProduct
        restMOProductMockMvc.perform(get("/api/m-o-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMOProduct() throws Exception {
        // Initialize the database
        mOProductService.save(mOProduct);

        int databaseSizeBeforeUpdate = mOProductRepository.findAll().size();

        // Update the mOProduct
        MOProduct updatedMOProduct = mOProductRepository.findOne(mOProduct.getId());
        updatedMOProduct
            .width(UPDATED_WIDTH)
            .height(UPDATED_HEIGHT)
            .quantity(UPDATED_QUANTITY);

        restMOProductMockMvc.perform(put("/api/m-o-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMOProduct)))
            .andExpect(status().isOk());

        // Validate the MOProduct in the database
        List<MOProduct> mOProductList = mOProductRepository.findAll();
        assertThat(mOProductList).hasSize(databaseSizeBeforeUpdate);
        MOProduct testMOProduct = mOProductList.get(mOProductList.size() - 1);
        assertThat(testMOProduct.getWidth()).isEqualTo(UPDATED_WIDTH);
        assertThat(testMOProduct.getHeight()).isEqualTo(UPDATED_HEIGHT);
        assertThat(testMOProduct.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingMOProduct() throws Exception {
        int databaseSizeBeforeUpdate = mOProductRepository.findAll().size();

        // Create the MOProduct

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMOProductMockMvc.perform(put("/api/m-o-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mOProduct)))
            .andExpect(status().isCreated());

        // Validate the MOProduct in the database
        List<MOProduct> mOProductList = mOProductRepository.findAll();
        assertThat(mOProductList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMOProduct() throws Exception {
        // Initialize the database
        mOProductService.save(mOProduct);

        int databaseSizeBeforeDelete = mOProductRepository.findAll().size();

        // Get the mOProduct
        restMOProductMockMvc.perform(delete("/api/m-o-products/{id}", mOProduct.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MOProduct> mOProductList = mOProductRepository.findAll();
        assertThat(mOProductList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MOProduct.class);
    }
}

package com.todotresde.sfi2.web.rest;

import com.todotresde.sfi2.Sfi2App;

import com.todotresde.sfi2.domain.STAttributeValue;
import com.todotresde.sfi2.domain.Product;
import com.todotresde.sfi2.domain.Supply;
import com.todotresde.sfi2.domain.SupplyType;
import com.todotresde.sfi2.domain.STAttribute;
import com.todotresde.sfi2.repository.STAttributeValueRepository;
import com.todotresde.sfi2.web.rest.errors.ExceptionTranslator;

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

import static com.todotresde.sfi2.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the STAttributeValueResource REST controller.
 *
 * @see STAttributeValueResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Sfi2App.class)
public class STAttributeValueResourceIntTest {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private STAttributeValueRepository sTAttributeValueRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSTAttributeValueMockMvc;

    private STAttributeValue sTAttributeValue;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final STAttributeValueResource sTAttributeValueResource = new STAttributeValueResource(sTAttributeValueRepository);
        this.restSTAttributeValueMockMvc = MockMvcBuilders.standaloneSetup(sTAttributeValueResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static STAttributeValue createEntity(EntityManager em) {
        STAttributeValue sTAttributeValue = new STAttributeValue()
            .value(DEFAULT_VALUE);
        // Add required entity
        Product product = ProductResourceIntTest.createEntity(em);
        em.persist(product);
        em.flush();
        sTAttributeValue.setProduct(product);
        // Add required entity
        Supply supply = SupplyResourceIntTest.createEntity(em);
        em.persist(supply);
        em.flush();
        sTAttributeValue.setSupply(supply);
        // Add required entity
        SupplyType supplyType = SupplyTypeResourceIntTest.createEntity(em);
        em.persist(supplyType);
        em.flush();
        sTAttributeValue.setSupplyType(supplyType);
        // Add required entity
        STAttribute stAttribute = STAttributeResourceIntTest.createEntity(em);
        em.persist(stAttribute);
        em.flush();
        sTAttributeValue.setSTAttribute(stAttribute);
        return sTAttributeValue;
    }

    @Before
    public void initTest() {
        sTAttributeValue = createEntity(em);
    }

    @Test
    @Transactional
    public void createSTAttributeValue() throws Exception {
        int databaseSizeBeforeCreate = sTAttributeValueRepository.findAll().size();

        // Create the STAttributeValue
        restSTAttributeValueMockMvc.perform(post("/api/st-attribute-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sTAttributeValue)))
            .andExpect(status().isCreated());

        // Validate the STAttributeValue in the database
        List<STAttributeValue> sTAttributeValueList = sTAttributeValueRepository.findAll();
        assertThat(sTAttributeValueList).hasSize(databaseSizeBeforeCreate + 1);
        STAttributeValue testSTAttributeValue = sTAttributeValueList.get(sTAttributeValueList.size() - 1);
        assertThat(testSTAttributeValue.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createSTAttributeValueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sTAttributeValueRepository.findAll().size();

        // Create the STAttributeValue with an existing ID
        sTAttributeValue.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSTAttributeValueMockMvc.perform(post("/api/st-attribute-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sTAttributeValue)))
            .andExpect(status().isBadRequest());

        // Validate the STAttributeValue in the database
        List<STAttributeValue> sTAttributeValueList = sTAttributeValueRepository.findAll();
        assertThat(sTAttributeValueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = sTAttributeValueRepository.findAll().size();
        // set the field null
        sTAttributeValue.setValue(null);

        // Create the STAttributeValue, which fails.

        restSTAttributeValueMockMvc.perform(post("/api/st-attribute-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sTAttributeValue)))
            .andExpect(status().isBadRequest());

        List<STAttributeValue> sTAttributeValueList = sTAttributeValueRepository.findAll();
        assertThat(sTAttributeValueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSTAttributeValues() throws Exception {
        // Initialize the database
        sTAttributeValueRepository.saveAndFlush(sTAttributeValue);

        // Get all the sTAttributeValueList
        restSTAttributeValueMockMvc.perform(get("/api/st-attribute-values?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sTAttributeValue.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }

    @Test
    @Transactional
    public void getSTAttributeValue() throws Exception {
        // Initialize the database
        sTAttributeValueRepository.saveAndFlush(sTAttributeValue);

        // Get the sTAttributeValue
        restSTAttributeValueMockMvc.perform(get("/api/st-attribute-values/{id}", sTAttributeValue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sTAttributeValue.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSTAttributeValue() throws Exception {
        // Get the sTAttributeValue
        restSTAttributeValueMockMvc.perform(get("/api/st-attribute-values/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSTAttributeValue() throws Exception {
        // Initialize the database
        sTAttributeValueRepository.saveAndFlush(sTAttributeValue);
        int databaseSizeBeforeUpdate = sTAttributeValueRepository.findAll().size();

        // Update the sTAttributeValue
        STAttributeValue updatedSTAttributeValue = sTAttributeValueRepository.findOne(sTAttributeValue.getId());
        // Disconnect from session so that the updates on updatedSTAttributeValue are not directly saved in db
        em.detach(updatedSTAttributeValue);
        updatedSTAttributeValue
            .value(UPDATED_VALUE);

        restSTAttributeValueMockMvc.perform(put("/api/st-attribute-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSTAttributeValue)))
            .andExpect(status().isOk());

        // Validate the STAttributeValue in the database
        List<STAttributeValue> sTAttributeValueList = sTAttributeValueRepository.findAll();
        assertThat(sTAttributeValueList).hasSize(databaseSizeBeforeUpdate);
        STAttributeValue testSTAttributeValue = sTAttributeValueList.get(sTAttributeValueList.size() - 1);
        assertThat(testSTAttributeValue.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingSTAttributeValue() throws Exception {
        int databaseSizeBeforeUpdate = sTAttributeValueRepository.findAll().size();

        // Create the STAttributeValue

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSTAttributeValueMockMvc.perform(put("/api/st-attribute-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sTAttributeValue)))
            .andExpect(status().isCreated());

        // Validate the STAttributeValue in the database
        List<STAttributeValue> sTAttributeValueList = sTAttributeValueRepository.findAll();
        assertThat(sTAttributeValueList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSTAttributeValue() throws Exception {
        // Initialize the database
        sTAttributeValueRepository.saveAndFlush(sTAttributeValue);
        int databaseSizeBeforeDelete = sTAttributeValueRepository.findAll().size();

        // Get the sTAttributeValue
        restSTAttributeValueMockMvc.perform(delete("/api/st-attribute-values/{id}", sTAttributeValue.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<STAttributeValue> sTAttributeValueList = sTAttributeValueRepository.findAll();
        assertThat(sTAttributeValueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(STAttributeValue.class);
        STAttributeValue sTAttributeValue1 = new STAttributeValue();
        sTAttributeValue1.setId(1L);
        STAttributeValue sTAttributeValue2 = new STAttributeValue();
        sTAttributeValue2.setId(sTAttributeValue1.getId());
        assertThat(sTAttributeValue1).isEqualTo(sTAttributeValue2);
        sTAttributeValue2.setId(2L);
        assertThat(sTAttributeValue1).isNotEqualTo(sTAttributeValue2);
        sTAttributeValue1.setId(null);
        assertThat(sTAttributeValue1).isNotEqualTo(sTAttributeValue2);
    }
}

package com.todotresde.sfi2.web.rest;

import com.todotresde.sfi2.Sfi2App;

import com.todotresde.sfi2.domain.STAttribute;
import com.todotresde.sfi2.repository.STAttributeRepository;
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
 * Test class for the STAttributeResource REST controller.
 *
 * @see STAttributeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Sfi2App.class)
public class STAttributeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private STAttributeRepository sTAttributeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSTAttributeMockMvc;

    private STAttribute sTAttribute;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final STAttributeResource sTAttributeResource = new STAttributeResource(sTAttributeRepository);
        this.restSTAttributeMockMvc = MockMvcBuilders.standaloneSetup(sTAttributeResource)
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
    public static STAttribute createEntity(EntityManager em) {
        STAttribute sTAttribute = new STAttribute()
            .name(DEFAULT_NAME);
        return sTAttribute;
    }

    @Before
    public void initTest() {
        sTAttribute = createEntity(em);
    }

    @Test
    @Transactional
    public void createSTAttribute() throws Exception {
        int databaseSizeBeforeCreate = sTAttributeRepository.findAll().size();

        // Create the STAttribute
        restSTAttributeMockMvc.perform(post("/api/st-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sTAttribute)))
            .andExpect(status().isCreated());

        // Validate the STAttribute in the database
        List<STAttribute> sTAttributeList = sTAttributeRepository.findAll();
        assertThat(sTAttributeList).hasSize(databaseSizeBeforeCreate + 1);
        STAttribute testSTAttribute = sTAttributeList.get(sTAttributeList.size() - 1);
        assertThat(testSTAttribute.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSTAttributeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sTAttributeRepository.findAll().size();

        // Create the STAttribute with an existing ID
        sTAttribute.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSTAttributeMockMvc.perform(post("/api/st-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sTAttribute)))
            .andExpect(status().isBadRequest());

        // Validate the STAttribute in the database
        List<STAttribute> sTAttributeList = sTAttributeRepository.findAll();
        assertThat(sTAttributeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = sTAttributeRepository.findAll().size();
        // set the field null
        sTAttribute.setName(null);

        // Create the STAttribute, which fails.

        restSTAttributeMockMvc.perform(post("/api/st-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sTAttribute)))
            .andExpect(status().isBadRequest());

        List<STAttribute> sTAttributeList = sTAttributeRepository.findAll();
        assertThat(sTAttributeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSTAttributes() throws Exception {
        // Initialize the database
        sTAttributeRepository.saveAndFlush(sTAttribute);

        // Get all the sTAttributeList
        restSTAttributeMockMvc.perform(get("/api/st-attributes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sTAttribute.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getSTAttribute() throws Exception {
        // Initialize the database
        sTAttributeRepository.saveAndFlush(sTAttribute);

        // Get the sTAttribute
        restSTAttributeMockMvc.perform(get("/api/st-attributes/{id}", sTAttribute.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sTAttribute.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSTAttribute() throws Exception {
        // Get the sTAttribute
        restSTAttributeMockMvc.perform(get("/api/st-attributes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSTAttribute() throws Exception {
        // Initialize the database
        sTAttributeRepository.saveAndFlush(sTAttribute);
        int databaseSizeBeforeUpdate = sTAttributeRepository.findAll().size();

        // Update the sTAttribute
        STAttribute updatedSTAttribute = sTAttributeRepository.findOne(sTAttribute.getId());
        // Disconnect from session so that the updates on updatedSTAttribute are not directly saved in db
        em.detach(updatedSTAttribute);
        updatedSTAttribute
            .name(UPDATED_NAME);

        restSTAttributeMockMvc.perform(put("/api/st-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSTAttribute)))
            .andExpect(status().isOk());

        // Validate the STAttribute in the database
        List<STAttribute> sTAttributeList = sTAttributeRepository.findAll();
        assertThat(sTAttributeList).hasSize(databaseSizeBeforeUpdate);
        STAttribute testSTAttribute = sTAttributeList.get(sTAttributeList.size() - 1);
        assertThat(testSTAttribute.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSTAttribute() throws Exception {
        int databaseSizeBeforeUpdate = sTAttributeRepository.findAll().size();

        // Create the STAttribute

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSTAttributeMockMvc.perform(put("/api/st-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sTAttribute)))
            .andExpect(status().isCreated());

        // Validate the STAttribute in the database
        List<STAttribute> sTAttributeList = sTAttributeRepository.findAll();
        assertThat(sTAttributeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSTAttribute() throws Exception {
        // Initialize the database
        sTAttributeRepository.saveAndFlush(sTAttribute);
        int databaseSizeBeforeDelete = sTAttributeRepository.findAll().size();

        // Get the sTAttribute
        restSTAttributeMockMvc.perform(delete("/api/st-attributes/{id}", sTAttribute.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<STAttribute> sTAttributeList = sTAttributeRepository.findAll();
        assertThat(sTAttributeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(STAttribute.class);
        STAttribute sTAttribute1 = new STAttribute();
        sTAttribute1.setId(1L);
        STAttribute sTAttribute2 = new STAttribute();
        sTAttribute2.setId(sTAttribute1.getId());
        assertThat(sTAttribute1).isEqualTo(sTAttribute2);
        sTAttribute2.setId(2L);
        assertThat(sTAttribute1).isNotEqualTo(sTAttribute2);
        sTAttribute1.setId(null);
        assertThat(sTAttribute1).isNotEqualTo(sTAttribute2);
    }
}

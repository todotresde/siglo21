package com.todotresde.sfi2.web.rest;

import com.todotresde.sfi2.Sfi2App;

import com.todotresde.sfi2.domain.PTAttribute;
import com.todotresde.sfi2.repository.PTAttributeRepository;
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
 * Test class for the PTAttributeResource REST controller.
 *
 * @see PTAttributeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Sfi2App.class)
public class PTAttributeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PTAttributeRepository pTAttributeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPTAttributeMockMvc;

    private PTAttribute pTAttribute;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PTAttributeResource pTAttributeResource = new PTAttributeResource(pTAttributeRepository);
        this.restPTAttributeMockMvc = MockMvcBuilders.standaloneSetup(pTAttributeResource)
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
    public static PTAttribute createEntity(EntityManager em) {
        PTAttribute pTAttribute = new PTAttribute()
            .name(DEFAULT_NAME);
        return pTAttribute;
    }

    @Before
    public void initTest() {
        pTAttribute = createEntity(em);
    }

    @Test
    @Transactional
    public void createPTAttribute() throws Exception {
        int databaseSizeBeforeCreate = pTAttributeRepository.findAll().size();

        // Create the PTAttribute
        restPTAttributeMockMvc.perform(post("/api/pt-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pTAttribute)))
            .andExpect(status().isCreated());

        // Validate the PTAttribute in the database
        List<PTAttribute> pTAttributeList = pTAttributeRepository.findAll();
        assertThat(pTAttributeList).hasSize(databaseSizeBeforeCreate + 1);
        PTAttribute testPTAttribute = pTAttributeList.get(pTAttributeList.size() - 1);
        assertThat(testPTAttribute.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPTAttributeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pTAttributeRepository.findAll().size();

        // Create the PTAttribute with an existing ID
        pTAttribute.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPTAttributeMockMvc.perform(post("/api/pt-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pTAttribute)))
            .andExpect(status().isBadRequest());

        // Validate the PTAttribute in the database
        List<PTAttribute> pTAttributeList = pTAttributeRepository.findAll();
        assertThat(pTAttributeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = pTAttributeRepository.findAll().size();
        // set the field null
        pTAttribute.setName(null);

        // Create the PTAttribute, which fails.

        restPTAttributeMockMvc.perform(post("/api/pt-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pTAttribute)))
            .andExpect(status().isBadRequest());

        List<PTAttribute> pTAttributeList = pTAttributeRepository.findAll();
        assertThat(pTAttributeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPTAttributes() throws Exception {
        // Initialize the database
        pTAttributeRepository.saveAndFlush(pTAttribute);

        // Get all the pTAttributeList
        restPTAttributeMockMvc.perform(get("/api/pt-attributes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pTAttribute.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getPTAttribute() throws Exception {
        // Initialize the database
        pTAttributeRepository.saveAndFlush(pTAttribute);

        // Get the pTAttribute
        restPTAttributeMockMvc.perform(get("/api/pt-attributes/{id}", pTAttribute.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pTAttribute.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPTAttribute() throws Exception {
        // Get the pTAttribute
        restPTAttributeMockMvc.perform(get("/api/pt-attributes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePTAttribute() throws Exception {
        // Initialize the database
        pTAttributeRepository.saveAndFlush(pTAttribute);
        int databaseSizeBeforeUpdate = pTAttributeRepository.findAll().size();

        // Update the pTAttribute
        PTAttribute updatedPTAttribute = pTAttributeRepository.findOne(pTAttribute.getId());
        // Disconnect from session so that the updates on updatedPTAttribute are not directly saved in db
        em.detach(updatedPTAttribute);
        updatedPTAttribute
            .name(UPDATED_NAME);

        restPTAttributeMockMvc.perform(put("/api/pt-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPTAttribute)))
            .andExpect(status().isOk());

        // Validate the PTAttribute in the database
        List<PTAttribute> pTAttributeList = pTAttributeRepository.findAll();
        assertThat(pTAttributeList).hasSize(databaseSizeBeforeUpdate);
        PTAttribute testPTAttribute = pTAttributeList.get(pTAttributeList.size() - 1);
        assertThat(testPTAttribute.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPTAttribute() throws Exception {
        int databaseSizeBeforeUpdate = pTAttributeRepository.findAll().size();

        // Create the PTAttribute

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPTAttributeMockMvc.perform(put("/api/pt-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pTAttribute)))
            .andExpect(status().isCreated());

        // Validate the PTAttribute in the database
        List<PTAttribute> pTAttributeList = pTAttributeRepository.findAll();
        assertThat(pTAttributeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePTAttribute() throws Exception {
        // Initialize the database
        pTAttributeRepository.saveAndFlush(pTAttribute);
        int databaseSizeBeforeDelete = pTAttributeRepository.findAll().size();

        // Get the pTAttribute
        restPTAttributeMockMvc.perform(delete("/api/pt-attributes/{id}", pTAttribute.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PTAttribute> pTAttributeList = pTAttributeRepository.findAll();
        assertThat(pTAttributeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PTAttribute.class);
        PTAttribute pTAttribute1 = new PTAttribute();
        pTAttribute1.setId(1L);
        PTAttribute pTAttribute2 = new PTAttribute();
        pTAttribute2.setId(pTAttribute1.getId());
        assertThat(pTAttribute1).isEqualTo(pTAttribute2);
        pTAttribute2.setId(2L);
        assertThat(pTAttribute1).isNotEqualTo(pTAttribute2);
        pTAttribute1.setId(null);
        assertThat(pTAttribute1).isNotEqualTo(pTAttribute2);
    }
}

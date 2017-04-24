package com.todotresde.line.manufacturing.web.rest;

import com.todotresde.line.manufacturing.LineManufacturingApp;

import com.todotresde.line.manufacturing.domain.DelayType;
import com.todotresde.line.manufacturing.repository.DelayTypeRepository;
import com.todotresde.line.manufacturing.service.DelayTypeService;
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
 * Test class for the DelayTypeResource REST controller.
 *
 * @see DelayTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LineManufacturingApp.class)
public class DelayTypeResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private DelayTypeRepository delayTypeRepository;

    @Autowired
    private DelayTypeService delayTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDelayTypeMockMvc;

    private DelayType delayType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DelayTypeResource delayTypeResource = new DelayTypeResource(delayTypeService);
        this.restDelayTypeMockMvc = MockMvcBuilders.standaloneSetup(delayTypeResource)
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
    public static DelayType createEntity(EntityManager em) {
        DelayType delayType = new DelayType()
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION);
        return delayType;
    }

    @Before
    public void initTest() {
        delayType = createEntity(em);
    }

    @Test
    @Transactional
    public void createDelayType() throws Exception {
        int databaseSizeBeforeCreate = delayTypeRepository.findAll().size();

        // Create the DelayType
        restDelayTypeMockMvc.perform(post("/api/delay-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delayType)))
            .andExpect(status().isCreated());

        // Validate the DelayType in the database
        List<DelayType> delayTypeList = delayTypeRepository.findAll();
        assertThat(delayTypeList).hasSize(databaseSizeBeforeCreate + 1);
        DelayType testDelayType = delayTypeList.get(delayTypeList.size() - 1);
        assertThat(testDelayType.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testDelayType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createDelayTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = delayTypeRepository.findAll().size();

        // Create the DelayType with an existing ID
        delayType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDelayTypeMockMvc.perform(post("/api/delay-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delayType)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<DelayType> delayTypeList = delayTypeRepository.findAll();
        assertThat(delayTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = delayTypeRepository.findAll().size();
        // set the field null
        delayType.setCode(null);

        // Create the DelayType, which fails.

        restDelayTypeMockMvc.perform(post("/api/delay-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delayType)))
            .andExpect(status().isBadRequest());

        List<DelayType> delayTypeList = delayTypeRepository.findAll();
        assertThat(delayTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = delayTypeRepository.findAll().size();
        // set the field null
        delayType.setDescription(null);

        // Create the DelayType, which fails.

        restDelayTypeMockMvc.perform(post("/api/delay-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delayType)))
            .andExpect(status().isBadRequest());

        List<DelayType> delayTypeList = delayTypeRepository.findAll();
        assertThat(delayTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDelayTypes() throws Exception {
        // Initialize the database
        delayTypeRepository.saveAndFlush(delayType);

        // Get all the delayTypeList
        restDelayTypeMockMvc.perform(get("/api/delay-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(delayType.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getDelayType() throws Exception {
        // Initialize the database
        delayTypeRepository.saveAndFlush(delayType);

        // Get the delayType
        restDelayTypeMockMvc.perform(get("/api/delay-types/{id}", delayType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(delayType.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDelayType() throws Exception {
        // Get the delayType
        restDelayTypeMockMvc.perform(get("/api/delay-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDelayType() throws Exception {
        // Initialize the database
        delayTypeService.save(delayType);

        int databaseSizeBeforeUpdate = delayTypeRepository.findAll().size();

        // Update the delayType
        DelayType updatedDelayType = delayTypeRepository.findOne(delayType.getId());
        updatedDelayType
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);

        restDelayTypeMockMvc.perform(put("/api/delay-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDelayType)))
            .andExpect(status().isOk());

        // Validate the DelayType in the database
        List<DelayType> delayTypeList = delayTypeRepository.findAll();
        assertThat(delayTypeList).hasSize(databaseSizeBeforeUpdate);
        DelayType testDelayType = delayTypeList.get(delayTypeList.size() - 1);
        assertThat(testDelayType.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testDelayType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingDelayType() throws Exception {
        int databaseSizeBeforeUpdate = delayTypeRepository.findAll().size();

        // Create the DelayType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDelayTypeMockMvc.perform(put("/api/delay-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delayType)))
            .andExpect(status().isCreated());

        // Validate the DelayType in the database
        List<DelayType> delayTypeList = delayTypeRepository.findAll();
        assertThat(delayTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDelayType() throws Exception {
        // Initialize the database
        delayTypeService.save(delayType);

        int databaseSizeBeforeDelete = delayTypeRepository.findAll().size();

        // Get the delayType
        restDelayTypeMockMvc.perform(delete("/api/delay-types/{id}", delayType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DelayType> delayTypeList = delayTypeRepository.findAll();
        assertThat(delayTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DelayType.class);
    }
}

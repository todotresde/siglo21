package com.todotresde.line.manufacturing.web.rest;

import com.todotresde.line.manufacturing.LineManufacturingApp;

import com.todotresde.line.manufacturing.domain.MO;
import com.todotresde.line.manufacturing.repository.MORepository;
import com.todotresde.line.manufacturing.service.MOService;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MOResource REST controller.
 *
 * @see MOResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LineManufacturingApp.class)
public class MOResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private MORepository mORepository;

    @Autowired
    private MOService mOService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMOMockMvc;

    private MO mO;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        MOResource mOResource = new MOResource(mOService);
        this.restMOMockMvc = MockMvcBuilders.standaloneSetup(mOResource)
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
    public static MO createEntity(EntityManager em) {
        MO mO = new MO()
            .code(DEFAULT_CODE)
            .date(DEFAULT_DATE)
            .status(DEFAULT_STATUS)
            .description(DEFAULT_DESCRIPTION);
        return mO;
    }

    @Before
    public void initTest() {
        mO = createEntity(em);
    }

    @Test
    @Transactional
    public void createMO() throws Exception {
        int databaseSizeBeforeCreate = mORepository.findAll().size();

        // Create the MO
        restMOMockMvc.perform(post("/api/m-os")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mO)))
            .andExpect(status().isCreated());

        // Validate the MO in the database
        List<MO> mOList = mORepository.findAll();
        assertThat(mOList).hasSize(databaseSizeBeforeCreate + 1);
        MO testMO = mOList.get(mOList.size() - 1);
        assertThat(testMO.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testMO.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testMO.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testMO.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createMOWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mORepository.findAll().size();

        // Create the MO with an existing ID
        mO.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMOMockMvc.perform(post("/api/m-os")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<MO> mOList = mORepository.findAll();
        assertThat(mOList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = mORepository.findAll().size();
        // set the field null
        mO.setCode(null);

        // Create the MO, which fails.

        restMOMockMvc.perform(post("/api/m-os")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mO)))
            .andExpect(status().isBadRequest());

        List<MO> mOList = mORepository.findAll();
        assertThat(mOList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = mORepository.findAll().size();
        // set the field null
        mO.setDate(null);

        // Create the MO, which fails.

        restMOMockMvc.perform(post("/api/m-os")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mO)))
            .andExpect(status().isBadRequest());

        List<MO> mOList = mORepository.findAll();
        assertThat(mOList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = mORepository.findAll().size();
        // set the field null
        mO.setStatus(null);

        // Create the MO, which fails.

        restMOMockMvc.perform(post("/api/m-os")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mO)))
            .andExpect(status().isBadRequest());

        List<MO> mOList = mORepository.findAll();
        assertThat(mOList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = mORepository.findAll().size();
        // set the field null
        mO.setDescription(null);

        // Create the MO, which fails.

        restMOMockMvc.perform(post("/api/m-os")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mO)))
            .andExpect(status().isBadRequest());

        List<MO> mOList = mORepository.findAll();
        assertThat(mOList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMOS() throws Exception {
        // Initialize the database
        mORepository.saveAndFlush(mO);

        // Get all the mOList
        restMOMockMvc.perform(get("/api/m-os?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mO.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getMO() throws Exception {
        // Initialize the database
        mORepository.saveAndFlush(mO);

        // Get the mO
        restMOMockMvc.perform(get("/api/m-os/{id}", mO.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mO.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMO() throws Exception {
        // Get the mO
        restMOMockMvc.perform(get("/api/m-os/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMO() throws Exception {
        // Initialize the database
        mOService.save(mO);

        int databaseSizeBeforeUpdate = mORepository.findAll().size();

        // Update the mO
        MO updatedMO = mORepository.findOne(mO.getId());
        updatedMO
            .code(UPDATED_CODE)
            .date(UPDATED_DATE)
            .status(UPDATED_STATUS)
            .description(UPDATED_DESCRIPTION);

        restMOMockMvc.perform(put("/api/m-os")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMO)))
            .andExpect(status().isOk());

        // Validate the MO in the database
        List<MO> mOList = mORepository.findAll();
        assertThat(mOList).hasSize(databaseSizeBeforeUpdate);
        MO testMO = mOList.get(mOList.size() - 1);
        assertThat(testMO.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testMO.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testMO.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testMO.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingMO() throws Exception {
        int databaseSizeBeforeUpdate = mORepository.findAll().size();

        // Create the MO

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMOMockMvc.perform(put("/api/m-os")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mO)))
            .andExpect(status().isCreated());

        // Validate the MO in the database
        List<MO> mOList = mORepository.findAll();
        assertThat(mOList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMO() throws Exception {
        // Initialize the database
        mOService.save(mO);

        int databaseSizeBeforeDelete = mORepository.findAll().size();

        // Get the mO
        restMOMockMvc.perform(delete("/api/m-os/{id}", mO.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MO> mOList = mORepository.findAll();
        assertThat(mOList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MO.class);
    }
}

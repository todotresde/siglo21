package com.todotresde.line.manufacturing.web.rest;

import com.todotresde.line.manufacturing.LineManufacturingApp;

import com.todotresde.line.manufacturing.domain.Tracing;
import com.todotresde.line.manufacturing.repository.TracingRepository;
import com.todotresde.line.manufacturing.service.TracingService;
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
 * Test class for the TracingResource REST controller.
 *
 * @see TracingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LineManufacturingApp.class)
public class TracingResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_IN_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_IN_TIME = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_START_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_TIME = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_TIME = 1L;
    private static final Long UPDATED_TIME = 2L;

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    @Autowired
    private TracingRepository tracingRepository;

    @Autowired
    private TracingService tracingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTracingMockMvc;

    private Tracing tracing;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TracingResource tracingResource = new TracingResource(tracingService);
        this.restTracingMockMvc = MockMvcBuilders.standaloneSetup(tracingResource)
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
    public static Tracing createEntity(EntityManager em) {
        Tracing tracing = new Tracing()
            .code(DEFAULT_CODE)
            .inTime(DEFAULT_IN_TIME)
            .startTime(DEFAULT_START_TIME)
            .time(DEFAULT_TIME)
            .status(DEFAULT_STATUS);
        return tracing;
    }

    @Before
    public void initTest() {
        tracing = createEntity(em);
    }

    @Test
    @Transactional
    public void createTracing() throws Exception {
        int databaseSizeBeforeCreate = tracingRepository.findAll().size();

        // Create the Tracing
        restTracingMockMvc.perform(post("/api/tracings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tracing)))
            .andExpect(status().isCreated());

        // Validate the Tracing in the database
        List<Tracing> tracingList = tracingRepository.findAll();
        assertThat(tracingList).hasSize(databaseSizeBeforeCreate + 1);
        Tracing testTracing = tracingList.get(tracingList.size() - 1);
        assertThat(testTracing.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testTracing.getInTime()).isEqualTo(DEFAULT_IN_TIME);
        assertThat(testTracing.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testTracing.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testTracing.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createTracingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tracingRepository.findAll().size();

        // Create the Tracing with an existing ID
        tracing.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTracingMockMvc.perform(post("/api/tracings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tracing)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Tracing> tracingList = tracingRepository.findAll();
        assertThat(tracingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tracingRepository.findAll().size();
        // set the field null
        tracing.setCode(null);

        // Create the Tracing, which fails.

        restTracingMockMvc.perform(post("/api/tracings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tracing)))
            .andExpect(status().isBadRequest());

        List<Tracing> tracingList = tracingRepository.findAll();
        assertThat(tracingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTracings() throws Exception {
        // Initialize the database
        tracingRepository.saveAndFlush(tracing);

        // Get all the tracingList
        restTracingMockMvc.perform(get("/api/tracings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tracing.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].inTime").value(hasItem(DEFAULT_IN_TIME.toString())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }

    @Test
    @Transactional
    public void getTracing() throws Exception {
        // Initialize the database
        tracingRepository.saveAndFlush(tracing);

        // Get the tracing
        restTracingMockMvc.perform(get("/api/tracings/{id}", tracing.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tracing.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.inTime").value(DEFAULT_IN_TIME.toString()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    public void getNonExistingTracing() throws Exception {
        // Get the tracing
        restTracingMockMvc.perform(get("/api/tracings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTracing() throws Exception {
        // Initialize the database
        tracingService.save(tracing);

        int databaseSizeBeforeUpdate = tracingRepository.findAll().size();

        // Update the tracing
        Tracing updatedTracing = tracingRepository.findOne(tracing.getId());
        updatedTracing
            .code(UPDATED_CODE)
            .inTime(UPDATED_IN_TIME)
            .startTime(UPDATED_START_TIME)
            .time(UPDATED_TIME)
            .status(UPDATED_STATUS);

        restTracingMockMvc.perform(put("/api/tracings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTracing)))
            .andExpect(status().isOk());

        // Validate the Tracing in the database
        List<Tracing> tracingList = tracingRepository.findAll();
        assertThat(tracingList).hasSize(databaseSizeBeforeUpdate);
        Tracing testTracing = tracingList.get(tracingList.size() - 1);
        assertThat(testTracing.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testTracing.getInTime()).isEqualTo(UPDATED_IN_TIME);
        assertThat(testTracing.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testTracing.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testTracing.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingTracing() throws Exception {
        int databaseSizeBeforeUpdate = tracingRepository.findAll().size();

        // Create the Tracing

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTracingMockMvc.perform(put("/api/tracings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tracing)))
            .andExpect(status().isCreated());

        // Validate the Tracing in the database
        List<Tracing> tracingList = tracingRepository.findAll();
        assertThat(tracingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTracing() throws Exception {
        // Initialize the database
        tracingService.save(tracing);

        int databaseSizeBeforeDelete = tracingRepository.findAll().size();

        // Get the tracing
        restTracingMockMvc.perform(delete("/api/tracings/{id}", tracing.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Tracing> tracingList = tracingRepository.findAll();
        assertThat(tracingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tracing.class);
    }
}

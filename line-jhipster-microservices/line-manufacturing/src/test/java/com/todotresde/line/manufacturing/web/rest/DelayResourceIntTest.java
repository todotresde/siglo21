package com.todotresde.line.manufacturing.web.rest;

import com.todotresde.line.manufacturing.LineManufacturingApp;

import com.todotresde.line.manufacturing.domain.Delay;
import com.todotresde.line.manufacturing.repository.DelayRepository;
import com.todotresde.line.manufacturing.service.DelayService;
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
 * Test class for the DelayResource REST controller.
 *
 * @see DelayResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LineManufacturingApp.class)
public class DelayResourceIntTest {

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_TIME = 1;
    private static final Integer UPDATED_TIME = 2;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private DelayRepository delayRepository;

    @Autowired
    private DelayService delayService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDelayMockMvc;

    private Delay delay;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DelayResource delayResource = new DelayResource(delayService);
        this.restDelayMockMvc = MockMvcBuilders.standaloneSetup(delayResource)
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
    public static Delay createEntity(EntityManager em) {
        Delay delay = new Delay()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .time(DEFAULT_TIME)
            .description(DEFAULT_DESCRIPTION);
        return delay;
    }

    @Before
    public void initTest() {
        delay = createEntity(em);
    }

    @Test
    @Transactional
    public void createDelay() throws Exception {
        int databaseSizeBeforeCreate = delayRepository.findAll().size();

        // Create the Delay
        restDelayMockMvc.perform(post("/api/delays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delay)))
            .andExpect(status().isCreated());

        // Validate the Delay in the database
        List<Delay> delayList = delayRepository.findAll();
        assertThat(delayList).hasSize(databaseSizeBeforeCreate + 1);
        Delay testDelay = delayList.get(delayList.size() - 1);
        assertThat(testDelay.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testDelay.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testDelay.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testDelay.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createDelayWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = delayRepository.findAll().size();

        // Create the Delay with an existing ID
        delay.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDelayMockMvc.perform(post("/api/delays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delay)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Delay> delayList = delayRepository.findAll();
        assertThat(delayList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = delayRepository.findAll().size();
        // set the field null
        delay.setStartDate(null);

        // Create the Delay, which fails.

        restDelayMockMvc.perform(post("/api/delays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delay)))
            .andExpect(status().isBadRequest());

        List<Delay> delayList = delayRepository.findAll();
        assertThat(delayList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = delayRepository.findAll().size();
        // set the field null
        delay.setEndDate(null);

        // Create the Delay, which fails.

        restDelayMockMvc.perform(post("/api/delays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delay)))
            .andExpect(status().isBadRequest());

        List<Delay> delayList = delayRepository.findAll();
        assertThat(delayList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = delayRepository.findAll().size();
        // set the field null
        delay.setTime(null);

        // Create the Delay, which fails.

        restDelayMockMvc.perform(post("/api/delays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delay)))
            .andExpect(status().isBadRequest());

        List<Delay> delayList = delayRepository.findAll();
        assertThat(delayList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDelays() throws Exception {
        // Initialize the database
        delayRepository.saveAndFlush(delay);

        // Get all the delayList
        restDelayMockMvc.perform(get("/api/delays?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(delay.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getDelay() throws Exception {
        // Initialize the database
        delayRepository.saveAndFlush(delay);

        // Get the delay
        restDelayMockMvc.perform(get("/api/delays/{id}", delay.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(delay.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDelay() throws Exception {
        // Get the delay
        restDelayMockMvc.perform(get("/api/delays/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDelay() throws Exception {
        // Initialize the database
        delayService.save(delay);

        int databaseSizeBeforeUpdate = delayRepository.findAll().size();

        // Update the delay
        Delay updatedDelay = delayRepository.findOne(delay.getId());
        updatedDelay
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .time(UPDATED_TIME)
            .description(UPDATED_DESCRIPTION);

        restDelayMockMvc.perform(put("/api/delays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDelay)))
            .andExpect(status().isOk());

        // Validate the Delay in the database
        List<Delay> delayList = delayRepository.findAll();
        assertThat(delayList).hasSize(databaseSizeBeforeUpdate);
        Delay testDelay = delayList.get(delayList.size() - 1);
        assertThat(testDelay.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testDelay.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testDelay.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testDelay.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingDelay() throws Exception {
        int databaseSizeBeforeUpdate = delayRepository.findAll().size();

        // Create the Delay

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDelayMockMvc.perform(put("/api/delays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delay)))
            .andExpect(status().isCreated());

        // Validate the Delay in the database
        List<Delay> delayList = delayRepository.findAll();
        assertThat(delayList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDelay() throws Exception {
        // Initialize the database
        delayService.save(delay);

        int databaseSizeBeforeDelete = delayRepository.findAll().size();

        // Get the delay
        restDelayMockMvc.perform(delete("/api/delays/{id}", delay.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Delay> delayList = delayRepository.findAll();
        assertThat(delayList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Delay.class);
    }
}

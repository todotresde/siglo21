package com.todotresde.sfi2.web.rest;

import com.todotresde.sfi2.Sfi2App;

import com.todotresde.sfi2.domain.WSConfiguration;
import com.todotresde.sfi2.domain.WorkStation;
import com.todotresde.sfi2.domain.Line;
import com.todotresde.sfi2.repository.WSConfigurationRepository;
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
 * Test class for the WSConfigurationResource REST controller.
 *
 * @see WSConfigurationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Sfi2App.class)
public class WSConfigurationResourceIntTest {

    private static final Boolean DEFAULT_FIRST = false;
    private static final Boolean UPDATED_FIRST = true;

    private static final Boolean DEFAULT_LAST = false;
    private static final Boolean UPDATED_LAST = true;

    @Autowired
    private WSConfigurationRepository wSConfigurationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWSConfigurationMockMvc;

    private WSConfiguration wSConfiguration;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WSConfigurationResource wSConfigurationResource = new WSConfigurationResource(wSConfigurationRepository);
        this.restWSConfigurationMockMvc = MockMvcBuilders.standaloneSetup(wSConfigurationResource)
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
    public static WSConfiguration createEntity(EntityManager em) {
        WSConfiguration wSConfiguration = new WSConfiguration()
            .first(DEFAULT_FIRST)
            .last(DEFAULT_LAST);
        // Add required entity
        WorkStation workStation = WorkStationResourceIntTest.createEntity(em);
        em.persist(workStation);
        em.flush();
        wSConfiguration.setWorkStation(workStation);
        // Add required entity
        Line line = LineResourceIntTest.createEntity(em);
        em.persist(line);
        em.flush();
        wSConfiguration.setLine(line);
        return wSConfiguration;
    }

    @Before
    public void initTest() {
        wSConfiguration = createEntity(em);
    }

    @Test
    @Transactional
    public void createWSConfiguration() throws Exception {
        int databaseSizeBeforeCreate = wSConfigurationRepository.findAll().size();

        // Create the WSConfiguration
        restWSConfigurationMockMvc.perform(post("/api/ws-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wSConfiguration)))
            .andExpect(status().isCreated());

        // Validate the WSConfiguration in the database
        List<WSConfiguration> wSConfigurationList = wSConfigurationRepository.findAll();
        assertThat(wSConfigurationList).hasSize(databaseSizeBeforeCreate + 1);
        WSConfiguration testWSConfiguration = wSConfigurationList.get(wSConfigurationList.size() - 1);
        assertThat(testWSConfiguration.isFirst()).isEqualTo(DEFAULT_FIRST);
        assertThat(testWSConfiguration.isLast()).isEqualTo(DEFAULT_LAST);
    }

    @Test
    @Transactional
    public void createWSConfigurationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = wSConfigurationRepository.findAll().size();

        // Create the WSConfiguration with an existing ID
        wSConfiguration.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWSConfigurationMockMvc.perform(post("/api/ws-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wSConfiguration)))
            .andExpect(status().isBadRequest());

        // Validate the WSConfiguration in the database
        List<WSConfiguration> wSConfigurationList = wSConfigurationRepository.findAll();
        assertThat(wSConfigurationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWSConfigurations() throws Exception {
        // Initialize the database
        wSConfigurationRepository.saveAndFlush(wSConfiguration);

        // Get all the wSConfigurationList
        restWSConfigurationMockMvc.perform(get("/api/ws-configurations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(wSConfiguration.getId().intValue())))
            .andExpect(jsonPath("$.[*].first").value(hasItem(DEFAULT_FIRST.booleanValue())))
            .andExpect(jsonPath("$.[*].last").value(hasItem(DEFAULT_LAST.booleanValue())));
    }

    @Test
    @Transactional
    public void getWSConfiguration() throws Exception {
        // Initialize the database
        wSConfigurationRepository.saveAndFlush(wSConfiguration);

        // Get the wSConfiguration
        restWSConfigurationMockMvc.perform(get("/api/ws-configurations/{id}", wSConfiguration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(wSConfiguration.getId().intValue()))
            .andExpect(jsonPath("$.first").value(DEFAULT_FIRST.booleanValue()))
            .andExpect(jsonPath("$.last").value(DEFAULT_LAST.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingWSConfiguration() throws Exception {
        // Get the wSConfiguration
        restWSConfigurationMockMvc.perform(get("/api/ws-configurations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWSConfiguration() throws Exception {
        // Initialize the database
        wSConfigurationRepository.saveAndFlush(wSConfiguration);
        int databaseSizeBeforeUpdate = wSConfigurationRepository.findAll().size();

        // Update the wSConfiguration
        WSConfiguration updatedWSConfiguration = wSConfigurationRepository.findOne(wSConfiguration.getId());
        // Disconnect from session so that the updates on updatedWSConfiguration are not directly saved in db
        em.detach(updatedWSConfiguration);
        updatedWSConfiguration
            .first(UPDATED_FIRST)
            .last(UPDATED_LAST);

        restWSConfigurationMockMvc.perform(put("/api/ws-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWSConfiguration)))
            .andExpect(status().isOk());

        // Validate the WSConfiguration in the database
        List<WSConfiguration> wSConfigurationList = wSConfigurationRepository.findAll();
        assertThat(wSConfigurationList).hasSize(databaseSizeBeforeUpdate);
        WSConfiguration testWSConfiguration = wSConfigurationList.get(wSConfigurationList.size() - 1);
        assertThat(testWSConfiguration.isFirst()).isEqualTo(UPDATED_FIRST);
        assertThat(testWSConfiguration.isLast()).isEqualTo(UPDATED_LAST);
    }

    @Test
    @Transactional
    public void updateNonExistingWSConfiguration() throws Exception {
        int databaseSizeBeforeUpdate = wSConfigurationRepository.findAll().size();

        // Create the WSConfiguration

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWSConfigurationMockMvc.perform(put("/api/ws-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wSConfiguration)))
            .andExpect(status().isCreated());

        // Validate the WSConfiguration in the database
        List<WSConfiguration> wSConfigurationList = wSConfigurationRepository.findAll();
        assertThat(wSConfigurationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWSConfiguration() throws Exception {
        // Initialize the database
        wSConfigurationRepository.saveAndFlush(wSConfiguration);
        int databaseSizeBeforeDelete = wSConfigurationRepository.findAll().size();

        // Get the wSConfiguration
        restWSConfigurationMockMvc.perform(delete("/api/ws-configurations/{id}", wSConfiguration.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WSConfiguration> wSConfigurationList = wSConfigurationRepository.findAll();
        assertThat(wSConfigurationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WSConfiguration.class);
        WSConfiguration wSConfiguration1 = new WSConfiguration();
        wSConfiguration1.setId(1L);
        WSConfiguration wSConfiguration2 = new WSConfiguration();
        wSConfiguration2.setId(wSConfiguration1.getId());
        assertThat(wSConfiguration1).isEqualTo(wSConfiguration2);
        wSConfiguration2.setId(2L);
        assertThat(wSConfiguration1).isNotEqualTo(wSConfiguration2);
        wSConfiguration1.setId(null);
        assertThat(wSConfiguration1).isNotEqualTo(wSConfiguration2);
    }
}

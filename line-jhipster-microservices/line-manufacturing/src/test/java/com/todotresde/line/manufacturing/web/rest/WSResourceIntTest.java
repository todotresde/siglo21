package com.todotresde.line.manufacturing.web.rest;

import com.todotresde.line.manufacturing.LineManufacturingApp;

import com.todotresde.line.manufacturing.domain.WS;
import com.todotresde.line.manufacturing.repository.WSRepository;
import com.todotresde.line.manufacturing.service.WSService;
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
 * Test class for the WSResource REST controller.
 *
 * @see WSResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LineManufacturingApp.class)
public class WSResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SHORT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SHORT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_IP = "AAAAAAAAAA";
    private static final String UPDATED_IP = "BBBBBBBBBB";

    @Autowired
    private WSRepository wSRepository;

    @Autowired
    private WSService wSService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWSMockMvc;

    private WS wS;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        WSResource wSResource = new WSResource(wSService);
        this.restWSMockMvc = MockMvcBuilders.standaloneSetup(wSResource)
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
    public static WS createEntity(EntityManager em) {
        WS wS = new WS()
            .name(DEFAULT_NAME)
            .shortName(DEFAULT_SHORT_NAME)
            .ip(DEFAULT_IP);
        return wS;
    }

    @Before
    public void initTest() {
        wS = createEntity(em);
    }

    @Test
    @Transactional
    public void createWS() throws Exception {
        int databaseSizeBeforeCreate = wSRepository.findAll().size();

        // Create the WS
        restWSMockMvc.perform(post("/api/w-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wS)))
            .andExpect(status().isCreated());

        // Validate the WS in the database
        List<WS> wSList = wSRepository.findAll();
        assertThat(wSList).hasSize(databaseSizeBeforeCreate + 1);
        WS testWS = wSList.get(wSList.size() - 1);
        assertThat(testWS.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testWS.getShortName()).isEqualTo(DEFAULT_SHORT_NAME);
        assertThat(testWS.getIp()).isEqualTo(DEFAULT_IP);
    }

    @Test
    @Transactional
    public void createWSWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = wSRepository.findAll().size();

        // Create the WS with an existing ID
        wS.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWSMockMvc.perform(post("/api/w-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wS)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<WS> wSList = wSRepository.findAll();
        assertThat(wSList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = wSRepository.findAll().size();
        // set the field null
        wS.setName(null);

        // Create the WS, which fails.

        restWSMockMvc.perform(post("/api/w-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wS)))
            .andExpect(status().isBadRequest());

        List<WS> wSList = wSRepository.findAll();
        assertThat(wSList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkShortNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = wSRepository.findAll().size();
        // set the field null
        wS.setShortName(null);

        // Create the WS, which fails.

        restWSMockMvc.perform(post("/api/w-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wS)))
            .andExpect(status().isBadRequest());

        List<WS> wSList = wSRepository.findAll();
        assertThat(wSList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIpIsRequired() throws Exception {
        int databaseSizeBeforeTest = wSRepository.findAll().size();
        // set the field null
        wS.setIp(null);

        // Create the WS, which fails.

        restWSMockMvc.perform(post("/api/w-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wS)))
            .andExpect(status().isBadRequest());

        List<WS> wSList = wSRepository.findAll();
        assertThat(wSList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllWS() throws Exception {
        // Initialize the database
        wSRepository.saveAndFlush(wS);

        // Get all the wSList
        restWSMockMvc.perform(get("/api/w-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(wS.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].shortName").value(hasItem(DEFAULT_SHORT_NAME.toString())))
            .andExpect(jsonPath("$.[*].ip").value(hasItem(DEFAULT_IP.toString())));
    }

    @Test
    @Transactional
    public void getWS() throws Exception {
        // Initialize the database
        wSRepository.saveAndFlush(wS);

        // Get the wS
        restWSMockMvc.perform(get("/api/w-s/{id}", wS.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(wS.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.shortName").value(DEFAULT_SHORT_NAME.toString()))
            .andExpect(jsonPath("$.ip").value(DEFAULT_IP.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWS() throws Exception {
        // Get the wS
        restWSMockMvc.perform(get("/api/w-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWS() throws Exception {
        // Initialize the database
        wSService.save(wS);

        int databaseSizeBeforeUpdate = wSRepository.findAll().size();

        // Update the wS
        WS updatedWS = wSRepository.findOne(wS.getId());
        updatedWS
            .name(UPDATED_NAME)
            .shortName(UPDATED_SHORT_NAME)
            .ip(UPDATED_IP);

        restWSMockMvc.perform(put("/api/w-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWS)))
            .andExpect(status().isOk());

        // Validate the WS in the database
        List<WS> wSList = wSRepository.findAll();
        assertThat(wSList).hasSize(databaseSizeBeforeUpdate);
        WS testWS = wSList.get(wSList.size() - 1);
        assertThat(testWS.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testWS.getShortName()).isEqualTo(UPDATED_SHORT_NAME);
        assertThat(testWS.getIp()).isEqualTo(UPDATED_IP);
    }

    @Test
    @Transactional
    public void updateNonExistingWS() throws Exception {
        int databaseSizeBeforeUpdate = wSRepository.findAll().size();

        // Create the WS

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWSMockMvc.perform(put("/api/w-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wS)))
            .andExpect(status().isCreated());

        // Validate the WS in the database
        List<WS> wSList = wSRepository.findAll();
        assertThat(wSList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWS() throws Exception {
        // Initialize the database
        wSService.save(wS);

        int databaseSizeBeforeDelete = wSRepository.findAll().size();

        // Get the wS
        restWSMockMvc.perform(delete("/api/w-s/{id}", wS.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WS> wSList = wSRepository.findAll();
        assertThat(wSList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WS.class);
    }
}

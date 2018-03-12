package com.todotresde.sfi2.web.rest;

import com.todotresde.sfi2.Sfi2App;

import com.todotresde.sfi2.domain.Line;
import com.todotresde.sfi2.repository.LineRepository;
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
 * Test class for the LineResource REST controller.
 *
 * @see LineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Sfi2App.class)
public class LineResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private LineRepository lineRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLineMockMvc;

    private Line line;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LineResource lineResource = new LineResource(lineRepository);
        this.restLineMockMvc = MockMvcBuilders.standaloneSetup(lineResource)
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
    public static Line createEntity(EntityManager em) {
        Line line = new Line()
            .name(DEFAULT_NAME);
        return line;
    }

    @Before
    public void initTest() {
        line = createEntity(em);
    }

    @Test
    @Transactional
    public void createLine() throws Exception {
        int databaseSizeBeforeCreate = lineRepository.findAll().size();

        // Create the Line
        restLineMockMvc.perform(post("/api/lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(line)))
            .andExpect(status().isCreated());

        // Validate the Line in the database
        List<Line> lineList = lineRepository.findAll();
        assertThat(lineList).hasSize(databaseSizeBeforeCreate + 1);
        Line testLine = lineList.get(lineList.size() - 1);
        assertThat(testLine.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lineRepository.findAll().size();

        // Create the Line with an existing ID
        line.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLineMockMvc.perform(post("/api/lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(line)))
            .andExpect(status().isBadRequest());

        // Validate the Line in the database
        List<Line> lineList = lineRepository.findAll();
        assertThat(lineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = lineRepository.findAll().size();
        // set the field null
        line.setName(null);

        // Create the Line, which fails.

        restLineMockMvc.perform(post("/api/lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(line)))
            .andExpect(status().isBadRequest());

        List<Line> lineList = lineRepository.findAll();
        assertThat(lineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLines() throws Exception {
        // Initialize the database
        lineRepository.saveAndFlush(line);

        // Get all the lineList
        restLineMockMvc.perform(get("/api/lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(line.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getLine() throws Exception {
        // Initialize the database
        lineRepository.saveAndFlush(line);

        // Get the line
        restLineMockMvc.perform(get("/api/lines/{id}", line.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(line.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLine() throws Exception {
        // Get the line
        restLineMockMvc.perform(get("/api/lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLine() throws Exception {
        // Initialize the database
        lineRepository.saveAndFlush(line);
        int databaseSizeBeforeUpdate = lineRepository.findAll().size();

        // Update the line
        Line updatedLine = lineRepository.findOne(line.getId());
        // Disconnect from session so that the updates on updatedLine are not directly saved in db
        em.detach(updatedLine);
        updatedLine
            .name(UPDATED_NAME);

        restLineMockMvc.perform(put("/api/lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLine)))
            .andExpect(status().isOk());

        // Validate the Line in the database
        List<Line> lineList = lineRepository.findAll();
        assertThat(lineList).hasSize(databaseSizeBeforeUpdate);
        Line testLine = lineList.get(lineList.size() - 1);
        assertThat(testLine.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingLine() throws Exception {
        int databaseSizeBeforeUpdate = lineRepository.findAll().size();

        // Create the Line

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLineMockMvc.perform(put("/api/lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(line)))
            .andExpect(status().isCreated());

        // Validate the Line in the database
        List<Line> lineList = lineRepository.findAll();
        assertThat(lineList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLine() throws Exception {
        // Initialize the database
        lineRepository.saveAndFlush(line);
        int databaseSizeBeforeDelete = lineRepository.findAll().size();

        // Get the line
        restLineMockMvc.perform(delete("/api/lines/{id}", line.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Line> lineList = lineRepository.findAll();
        assertThat(lineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Line.class);
        Line line1 = new Line();
        line1.setId(1L);
        Line line2 = new Line();
        line2.setId(line1.getId());
        assertThat(line1).isEqualTo(line2);
        line2.setId(2L);
        assertThat(line1).isNotEqualTo(line2);
        line1.setId(null);
        assertThat(line1).isNotEqualTo(line2);
    }
}

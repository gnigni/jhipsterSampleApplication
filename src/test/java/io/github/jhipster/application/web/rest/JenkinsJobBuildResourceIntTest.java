package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.JenkinsJobBuild;
import io.github.jhipster.application.repository.JenkinsJobBuildRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

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

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.github.jhipster.application.domain.enumeration.JenkinsJobBuildState;
/**
 * Test class for the JenkinsJobBuildResource REST controller.
 *
 * @see JenkinsJobBuildResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class JenkinsJobBuildResourceIntTest {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final JenkinsJobBuildState DEFAULT_STATE = JenkinsJobBuildState.SUCCESS;
    private static final JenkinsJobBuildState UPDATED_STATE = JenkinsJobBuildState.FAIL;

    @Autowired
    private JenkinsJobBuildRepository jenkinsJobBuildRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJenkinsJobBuildMockMvc;

    private JenkinsJobBuild jenkinsJobBuild;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JenkinsJobBuildResource jenkinsJobBuildResource = new JenkinsJobBuildResource(jenkinsJobBuildRepository);
        this.restJenkinsJobBuildMockMvc = MockMvcBuilders.standaloneSetup(jenkinsJobBuildResource)
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
    public static JenkinsJobBuild createEntity(EntityManager em) {
        JenkinsJobBuild jenkinsJobBuild = new JenkinsJobBuild()
            .url(DEFAULT_URL)
            .state(DEFAULT_STATE);
        return jenkinsJobBuild;
    }

    @Before
    public void initTest() {
        jenkinsJobBuild = createEntity(em);
    }

    @Test
    @Transactional
    public void createJenkinsJobBuild() throws Exception {
        int databaseSizeBeforeCreate = jenkinsJobBuildRepository.findAll().size();

        // Create the JenkinsJobBuild
        restJenkinsJobBuildMockMvc.perform(post("/api/jenkins-job-builds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jenkinsJobBuild)))
            .andExpect(status().isCreated());

        // Validate the JenkinsJobBuild in the database
        List<JenkinsJobBuild> jenkinsJobBuildList = jenkinsJobBuildRepository.findAll();
        assertThat(jenkinsJobBuildList).hasSize(databaseSizeBeforeCreate + 1);
        JenkinsJobBuild testJenkinsJobBuild = jenkinsJobBuildList.get(jenkinsJobBuildList.size() - 1);
        assertThat(testJenkinsJobBuild.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testJenkinsJobBuild.getState()).isEqualTo(DEFAULT_STATE);
    }

    @Test
    @Transactional
    public void createJenkinsJobBuildWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jenkinsJobBuildRepository.findAll().size();

        // Create the JenkinsJobBuild with an existing ID
        jenkinsJobBuild.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJenkinsJobBuildMockMvc.perform(post("/api/jenkins-job-builds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jenkinsJobBuild)))
            .andExpect(status().isBadRequest());

        // Validate the JenkinsJobBuild in the database
        List<JenkinsJobBuild> jenkinsJobBuildList = jenkinsJobBuildRepository.findAll();
        assertThat(jenkinsJobBuildList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJenkinsJobBuilds() throws Exception {
        // Initialize the database
        jenkinsJobBuildRepository.saveAndFlush(jenkinsJobBuild);

        // Get all the jenkinsJobBuildList
        restJenkinsJobBuildMockMvc.perform(get("/api/jenkins-job-builds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jenkinsJobBuild.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())));
    }

    @Test
    @Transactional
    public void getJenkinsJobBuild() throws Exception {
        // Initialize the database
        jenkinsJobBuildRepository.saveAndFlush(jenkinsJobBuild);

        // Get the jenkinsJobBuild
        restJenkinsJobBuildMockMvc.perform(get("/api/jenkins-job-builds/{id}", jenkinsJobBuild.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jenkinsJobBuild.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJenkinsJobBuild() throws Exception {
        // Get the jenkinsJobBuild
        restJenkinsJobBuildMockMvc.perform(get("/api/jenkins-job-builds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJenkinsJobBuild() throws Exception {
        // Initialize the database
        jenkinsJobBuildRepository.saveAndFlush(jenkinsJobBuild);
        int databaseSizeBeforeUpdate = jenkinsJobBuildRepository.findAll().size();

        // Update the jenkinsJobBuild
        JenkinsJobBuild updatedJenkinsJobBuild = jenkinsJobBuildRepository.findOne(jenkinsJobBuild.getId());
        // Disconnect from session so that the updates on updatedJenkinsJobBuild are not directly saved in db
        em.detach(updatedJenkinsJobBuild);
        updatedJenkinsJobBuild
            .url(UPDATED_URL)
            .state(UPDATED_STATE);

        restJenkinsJobBuildMockMvc.perform(put("/api/jenkins-job-builds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJenkinsJobBuild)))
            .andExpect(status().isOk());

        // Validate the JenkinsJobBuild in the database
        List<JenkinsJobBuild> jenkinsJobBuildList = jenkinsJobBuildRepository.findAll();
        assertThat(jenkinsJobBuildList).hasSize(databaseSizeBeforeUpdate);
        JenkinsJobBuild testJenkinsJobBuild = jenkinsJobBuildList.get(jenkinsJobBuildList.size() - 1);
        assertThat(testJenkinsJobBuild.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testJenkinsJobBuild.getState()).isEqualTo(UPDATED_STATE);
    }

    @Test
    @Transactional
    public void updateNonExistingJenkinsJobBuild() throws Exception {
        int databaseSizeBeforeUpdate = jenkinsJobBuildRepository.findAll().size();

        // Create the JenkinsJobBuild

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJenkinsJobBuildMockMvc.perform(put("/api/jenkins-job-builds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jenkinsJobBuild)))
            .andExpect(status().isCreated());

        // Validate the JenkinsJobBuild in the database
        List<JenkinsJobBuild> jenkinsJobBuildList = jenkinsJobBuildRepository.findAll();
        assertThat(jenkinsJobBuildList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJenkinsJobBuild() throws Exception {
        // Initialize the database
        jenkinsJobBuildRepository.saveAndFlush(jenkinsJobBuild);
        int databaseSizeBeforeDelete = jenkinsJobBuildRepository.findAll().size();

        // Get the jenkinsJobBuild
        restJenkinsJobBuildMockMvc.perform(delete("/api/jenkins-job-builds/{id}", jenkinsJobBuild.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JenkinsJobBuild> jenkinsJobBuildList = jenkinsJobBuildRepository.findAll();
        assertThat(jenkinsJobBuildList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JenkinsJobBuild.class);
        JenkinsJobBuild jenkinsJobBuild1 = new JenkinsJobBuild();
        jenkinsJobBuild1.setId(1L);
        JenkinsJobBuild jenkinsJobBuild2 = new JenkinsJobBuild();
        jenkinsJobBuild2.setId(jenkinsJobBuild1.getId());
        assertThat(jenkinsJobBuild1).isEqualTo(jenkinsJobBuild2);
        jenkinsJobBuild2.setId(2L);
        assertThat(jenkinsJobBuild1).isNotEqualTo(jenkinsJobBuild2);
        jenkinsJobBuild1.setId(null);
        assertThat(jenkinsJobBuild1).isNotEqualTo(jenkinsJobBuild2);
    }
}

package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.MavenModule;
import io.github.jhipster.application.repository.MavenModuleRepository;
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

import io.github.jhipster.application.domain.enumeration.MavenPackaging;
/**
 * Test class for the MavenModuleResource REST controller.
 *
 * @see MavenModuleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class MavenModuleResourceIntTest {

    private static final MavenPackaging DEFAULT_PACKAGING = MavenPackaging.POM;
    private static final MavenPackaging UPDATED_PACKAGING = MavenPackaging.JAR;

    private static final String DEFAULT_ARTIFACT_ID = "AAAAAAAAAA";
    private static final String UPDATED_ARTIFACT_ID = "BBBBBBBBBB";

    @Autowired
    private MavenModuleRepository mavenModuleRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMavenModuleMockMvc;

    private MavenModule mavenModule;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MavenModuleResource mavenModuleResource = new MavenModuleResource(mavenModuleRepository);
        this.restMavenModuleMockMvc = MockMvcBuilders.standaloneSetup(mavenModuleResource)
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
    public static MavenModule createEntity(EntityManager em) {
        MavenModule mavenModule = new MavenModule()
            .packaging(DEFAULT_PACKAGING)
            .artifactId(DEFAULT_ARTIFACT_ID);
        return mavenModule;
    }

    @Before
    public void initTest() {
        mavenModule = createEntity(em);
    }

    @Test
    @Transactional
    public void createMavenModule() throws Exception {
        int databaseSizeBeforeCreate = mavenModuleRepository.findAll().size();

        // Create the MavenModule
        restMavenModuleMockMvc.perform(post("/api/maven-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mavenModule)))
            .andExpect(status().isCreated());

        // Validate the MavenModule in the database
        List<MavenModule> mavenModuleList = mavenModuleRepository.findAll();
        assertThat(mavenModuleList).hasSize(databaseSizeBeforeCreate + 1);
        MavenModule testMavenModule = mavenModuleList.get(mavenModuleList.size() - 1);
        assertThat(testMavenModule.getPackaging()).isEqualTo(DEFAULT_PACKAGING);
        assertThat(testMavenModule.getArtifactId()).isEqualTo(DEFAULT_ARTIFACT_ID);
    }

    @Test
    @Transactional
    public void createMavenModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mavenModuleRepository.findAll().size();

        // Create the MavenModule with an existing ID
        mavenModule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMavenModuleMockMvc.perform(post("/api/maven-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mavenModule)))
            .andExpect(status().isBadRequest());

        // Validate the MavenModule in the database
        List<MavenModule> mavenModuleList = mavenModuleRepository.findAll();
        assertThat(mavenModuleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMavenModules() throws Exception {
        // Initialize the database
        mavenModuleRepository.saveAndFlush(mavenModule);

        // Get all the mavenModuleList
        restMavenModuleMockMvc.perform(get("/api/maven-modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mavenModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].packaging").value(hasItem(DEFAULT_PACKAGING.toString())))
            .andExpect(jsonPath("$.[*].artifactId").value(hasItem(DEFAULT_ARTIFACT_ID.toString())));
    }

    @Test
    @Transactional
    public void getMavenModule() throws Exception {
        // Initialize the database
        mavenModuleRepository.saveAndFlush(mavenModule);

        // Get the mavenModule
        restMavenModuleMockMvc.perform(get("/api/maven-modules/{id}", mavenModule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mavenModule.getId().intValue()))
            .andExpect(jsonPath("$.packaging").value(DEFAULT_PACKAGING.toString()))
            .andExpect(jsonPath("$.artifactId").value(DEFAULT_ARTIFACT_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMavenModule() throws Exception {
        // Get the mavenModule
        restMavenModuleMockMvc.perform(get("/api/maven-modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMavenModule() throws Exception {
        // Initialize the database
        mavenModuleRepository.saveAndFlush(mavenModule);
        int databaseSizeBeforeUpdate = mavenModuleRepository.findAll().size();

        // Update the mavenModule
        MavenModule updatedMavenModule = mavenModuleRepository.findOne(mavenModule.getId());
        // Disconnect from session so that the updates on updatedMavenModule are not directly saved in db
        em.detach(updatedMavenModule);
        updatedMavenModule
            .packaging(UPDATED_PACKAGING)
            .artifactId(UPDATED_ARTIFACT_ID);

        restMavenModuleMockMvc.perform(put("/api/maven-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMavenModule)))
            .andExpect(status().isOk());

        // Validate the MavenModule in the database
        List<MavenModule> mavenModuleList = mavenModuleRepository.findAll();
        assertThat(mavenModuleList).hasSize(databaseSizeBeforeUpdate);
        MavenModule testMavenModule = mavenModuleList.get(mavenModuleList.size() - 1);
        assertThat(testMavenModule.getPackaging()).isEqualTo(UPDATED_PACKAGING);
        assertThat(testMavenModule.getArtifactId()).isEqualTo(UPDATED_ARTIFACT_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingMavenModule() throws Exception {
        int databaseSizeBeforeUpdate = mavenModuleRepository.findAll().size();

        // Create the MavenModule

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMavenModuleMockMvc.perform(put("/api/maven-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mavenModule)))
            .andExpect(status().isCreated());

        // Validate the MavenModule in the database
        List<MavenModule> mavenModuleList = mavenModuleRepository.findAll();
        assertThat(mavenModuleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMavenModule() throws Exception {
        // Initialize the database
        mavenModuleRepository.saveAndFlush(mavenModule);
        int databaseSizeBeforeDelete = mavenModuleRepository.findAll().size();

        // Get the mavenModule
        restMavenModuleMockMvc.perform(delete("/api/maven-modules/{id}", mavenModule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MavenModule> mavenModuleList = mavenModuleRepository.findAll();
        assertThat(mavenModuleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MavenModule.class);
        MavenModule mavenModule1 = new MavenModule();
        mavenModule1.setId(1L);
        MavenModule mavenModule2 = new MavenModule();
        mavenModule2.setId(mavenModule1.getId());
        assertThat(mavenModule1).isEqualTo(mavenModule2);
        mavenModule2.setId(2L);
        assertThat(mavenModule1).isNotEqualTo(mavenModule2);
        mavenModule1.setId(null);
        assertThat(mavenModule1).isNotEqualTo(mavenModule2);
    }
}

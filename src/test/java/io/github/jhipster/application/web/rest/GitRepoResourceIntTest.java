package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.GitRepo;
import io.github.jhipster.application.repository.GitRepoRepository;
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

/**
 * Test class for the GitRepoResource REST controller.
 *
 * @see GitRepoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class GitRepoResourceIntTest {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    @Autowired
    private GitRepoRepository gitRepoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGitRepoMockMvc;

    private GitRepo gitRepo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GitRepoResource gitRepoResource = new GitRepoResource(gitRepoRepository);
        this.restGitRepoMockMvc = MockMvcBuilders.standaloneSetup(gitRepoResource)
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
    public static GitRepo createEntity(EntityManager em) {
        GitRepo gitRepo = new GitRepo()
            .url(DEFAULT_URL);
        return gitRepo;
    }

    @Before
    public void initTest() {
        gitRepo = createEntity(em);
    }

    @Test
    @Transactional
    public void createGitRepo() throws Exception {
        int databaseSizeBeforeCreate = gitRepoRepository.findAll().size();

        // Create the GitRepo
        restGitRepoMockMvc.perform(post("/api/git-repos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gitRepo)))
            .andExpect(status().isCreated());

        // Validate the GitRepo in the database
        List<GitRepo> gitRepoList = gitRepoRepository.findAll();
        assertThat(gitRepoList).hasSize(databaseSizeBeforeCreate + 1);
        GitRepo testGitRepo = gitRepoList.get(gitRepoList.size() - 1);
        assertThat(testGitRepo.getUrl()).isEqualTo(DEFAULT_URL);
    }

    @Test
    @Transactional
    public void createGitRepoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gitRepoRepository.findAll().size();

        // Create the GitRepo with an existing ID
        gitRepo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGitRepoMockMvc.perform(post("/api/git-repos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gitRepo)))
            .andExpect(status().isBadRequest());

        // Validate the GitRepo in the database
        List<GitRepo> gitRepoList = gitRepoRepository.findAll();
        assertThat(gitRepoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGitRepos() throws Exception {
        // Initialize the database
        gitRepoRepository.saveAndFlush(gitRepo);

        // Get all the gitRepoList
        restGitRepoMockMvc.perform(get("/api/git-repos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gitRepo.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())));
    }

    @Test
    @Transactional
    public void getGitRepo() throws Exception {
        // Initialize the database
        gitRepoRepository.saveAndFlush(gitRepo);

        // Get the gitRepo
        restGitRepoMockMvc.perform(get("/api/git-repos/{id}", gitRepo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gitRepo.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGitRepo() throws Exception {
        // Get the gitRepo
        restGitRepoMockMvc.perform(get("/api/git-repos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGitRepo() throws Exception {
        // Initialize the database
        gitRepoRepository.saveAndFlush(gitRepo);
        int databaseSizeBeforeUpdate = gitRepoRepository.findAll().size();

        // Update the gitRepo
        GitRepo updatedGitRepo = gitRepoRepository.findOne(gitRepo.getId());
        // Disconnect from session so that the updates on updatedGitRepo are not directly saved in db
        em.detach(updatedGitRepo);
        updatedGitRepo
            .url(UPDATED_URL);

        restGitRepoMockMvc.perform(put("/api/git-repos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGitRepo)))
            .andExpect(status().isOk());

        // Validate the GitRepo in the database
        List<GitRepo> gitRepoList = gitRepoRepository.findAll();
        assertThat(gitRepoList).hasSize(databaseSizeBeforeUpdate);
        GitRepo testGitRepo = gitRepoList.get(gitRepoList.size() - 1);
        assertThat(testGitRepo.getUrl()).isEqualTo(UPDATED_URL);
    }

    @Test
    @Transactional
    public void updateNonExistingGitRepo() throws Exception {
        int databaseSizeBeforeUpdate = gitRepoRepository.findAll().size();

        // Create the GitRepo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGitRepoMockMvc.perform(put("/api/git-repos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gitRepo)))
            .andExpect(status().isCreated());

        // Validate the GitRepo in the database
        List<GitRepo> gitRepoList = gitRepoRepository.findAll();
        assertThat(gitRepoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGitRepo() throws Exception {
        // Initialize the database
        gitRepoRepository.saveAndFlush(gitRepo);
        int databaseSizeBeforeDelete = gitRepoRepository.findAll().size();

        // Get the gitRepo
        restGitRepoMockMvc.perform(delete("/api/git-repos/{id}", gitRepo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GitRepo> gitRepoList = gitRepoRepository.findAll();
        assertThat(gitRepoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GitRepo.class);
        GitRepo gitRepo1 = new GitRepo();
        gitRepo1.setId(1L);
        GitRepo gitRepo2 = new GitRepo();
        gitRepo2.setId(gitRepo1.getId());
        assertThat(gitRepo1).isEqualTo(gitRepo2);
        gitRepo2.setId(2L);
        assertThat(gitRepo1).isNotEqualTo(gitRepo2);
        gitRepo1.setId(null);
        assertThat(gitRepo1).isNotEqualTo(gitRepo2);
    }
}

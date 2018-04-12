package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.JenkinsJobBuild;

import io.github.jhipster.application.repository.JenkinsJobBuildRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing JenkinsJobBuild.
 */
@RestController
@RequestMapping("/api")
public class JenkinsJobBuildResource {

    private final Logger log = LoggerFactory.getLogger(JenkinsJobBuildResource.class);

    private static final String ENTITY_NAME = "jenkinsJobBuild";

    private final JenkinsJobBuildRepository jenkinsJobBuildRepository;

    public JenkinsJobBuildResource(JenkinsJobBuildRepository jenkinsJobBuildRepository) {
        this.jenkinsJobBuildRepository = jenkinsJobBuildRepository;
    }

    /**
     * POST  /jenkins-job-builds : Create a new jenkinsJobBuild.
     *
     * @param jenkinsJobBuild the jenkinsJobBuild to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jenkinsJobBuild, or with status 400 (Bad Request) if the jenkinsJobBuild has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jenkins-job-builds")
    @Timed
    public ResponseEntity<JenkinsJobBuild> createJenkinsJobBuild(@RequestBody JenkinsJobBuild jenkinsJobBuild) throws URISyntaxException {
        log.debug("REST request to save JenkinsJobBuild : {}", jenkinsJobBuild);
        if (jenkinsJobBuild.getId() != null) {
            throw new BadRequestAlertException("A new jenkinsJobBuild cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JenkinsJobBuild result = jenkinsJobBuildRepository.save(jenkinsJobBuild);
        return ResponseEntity.created(new URI("/api/jenkins-job-builds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jenkins-job-builds : Updates an existing jenkinsJobBuild.
     *
     * @param jenkinsJobBuild the jenkinsJobBuild to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jenkinsJobBuild,
     * or with status 400 (Bad Request) if the jenkinsJobBuild is not valid,
     * or with status 500 (Internal Server Error) if the jenkinsJobBuild couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jenkins-job-builds")
    @Timed
    public ResponseEntity<JenkinsJobBuild> updateJenkinsJobBuild(@RequestBody JenkinsJobBuild jenkinsJobBuild) throws URISyntaxException {
        log.debug("REST request to update JenkinsJobBuild : {}", jenkinsJobBuild);
        if (jenkinsJobBuild.getId() == null) {
            return createJenkinsJobBuild(jenkinsJobBuild);
        }
        JenkinsJobBuild result = jenkinsJobBuildRepository.save(jenkinsJobBuild);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jenkinsJobBuild.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jenkins-job-builds : get all the jenkinsJobBuilds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jenkinsJobBuilds in body
     */
    @GetMapping("/jenkins-job-builds")
    @Timed
    public List<JenkinsJobBuild> getAllJenkinsJobBuilds() {
        log.debug("REST request to get all JenkinsJobBuilds");
        return jenkinsJobBuildRepository.findAll();
        }

    /**
     * GET  /jenkins-job-builds/:id : get the "id" jenkinsJobBuild.
     *
     * @param id the id of the jenkinsJobBuild to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jenkinsJobBuild, or with status 404 (Not Found)
     */
    @GetMapping("/jenkins-job-builds/{id}")
    @Timed
    public ResponseEntity<JenkinsJobBuild> getJenkinsJobBuild(@PathVariable Long id) {
        log.debug("REST request to get JenkinsJobBuild : {}", id);
        JenkinsJobBuild jenkinsJobBuild = jenkinsJobBuildRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jenkinsJobBuild));
    }

    /**
     * DELETE  /jenkins-job-builds/:id : delete the "id" jenkinsJobBuild.
     *
     * @param id the id of the jenkinsJobBuild to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jenkins-job-builds/{id}")
    @Timed
    public ResponseEntity<Void> deleteJenkinsJobBuild(@PathVariable Long id) {
        log.debug("REST request to delete JenkinsJobBuild : {}", id);
        jenkinsJobBuildRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

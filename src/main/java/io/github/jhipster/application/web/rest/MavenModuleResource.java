package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.MavenModule;

import io.github.jhipster.application.repository.MavenModuleRepository;
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
 * REST controller for managing MavenModule.
 */
@RestController
@RequestMapping("/api")
public class MavenModuleResource {

    private final Logger log = LoggerFactory.getLogger(MavenModuleResource.class);

    private static final String ENTITY_NAME = "mavenModule";

    private final MavenModuleRepository mavenModuleRepository;

    public MavenModuleResource(MavenModuleRepository mavenModuleRepository) {
        this.mavenModuleRepository = mavenModuleRepository;
    }

    /**
     * POST  /maven-modules : Create a new mavenModule.
     *
     * @param mavenModule the mavenModule to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mavenModule, or with status 400 (Bad Request) if the mavenModule has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/maven-modules")
    @Timed
    public ResponseEntity<MavenModule> createMavenModule(@RequestBody MavenModule mavenModule) throws URISyntaxException {
        log.debug("REST request to save MavenModule : {}", mavenModule);
        if (mavenModule.getId() != null) {
            throw new BadRequestAlertException("A new mavenModule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MavenModule result = mavenModuleRepository.save(mavenModule);
        return ResponseEntity.created(new URI("/api/maven-modules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /maven-modules : Updates an existing mavenModule.
     *
     * @param mavenModule the mavenModule to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mavenModule,
     * or with status 400 (Bad Request) if the mavenModule is not valid,
     * or with status 500 (Internal Server Error) if the mavenModule couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/maven-modules")
    @Timed
    public ResponseEntity<MavenModule> updateMavenModule(@RequestBody MavenModule mavenModule) throws URISyntaxException {
        log.debug("REST request to update MavenModule : {}", mavenModule);
        if (mavenModule.getId() == null) {
            return createMavenModule(mavenModule);
        }
        MavenModule result = mavenModuleRepository.save(mavenModule);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mavenModule.getId().toString()))
            .body(result);
    }

    /**
     * GET  /maven-modules : get all the mavenModules.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mavenModules in body
     */
    @GetMapping("/maven-modules")
    @Timed
    public List<MavenModule> getAllMavenModules() {
        log.debug("REST request to get all MavenModules");
        return mavenModuleRepository.findAll();
        }

    /**
     * GET  /maven-modules/:id : get the "id" mavenModule.
     *
     * @param id the id of the mavenModule to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mavenModule, or with status 404 (Not Found)
     */
    @GetMapping("/maven-modules/{id}")
    @Timed
    public ResponseEntity<MavenModule> getMavenModule(@PathVariable Long id) {
        log.debug("REST request to get MavenModule : {}", id);
        MavenModule mavenModule = mavenModuleRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mavenModule));
    }

    /**
     * DELETE  /maven-modules/:id : delete the "id" mavenModule.
     *
     * @param id the id of the mavenModule to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/maven-modules/{id}")
    @Timed
    public ResponseEntity<Void> deleteMavenModule(@PathVariable Long id) {
        log.debug("REST request to delete MavenModule : {}", id);
        mavenModuleRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

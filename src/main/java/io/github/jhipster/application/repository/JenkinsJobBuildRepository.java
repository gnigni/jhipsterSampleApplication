package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.JenkinsJobBuild;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the JenkinsJobBuild entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JenkinsJobBuildRepository extends JpaRepository<JenkinsJobBuild, Long> {

}

package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.JenkinsJob;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the JenkinsJob entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JenkinsJobRepository extends JpaRepository<JenkinsJob, Long> {

}

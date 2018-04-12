package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.JenkinsFolder;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the JenkinsFolder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JenkinsFolderRepository extends JpaRepository<JenkinsFolder, Long> {

}

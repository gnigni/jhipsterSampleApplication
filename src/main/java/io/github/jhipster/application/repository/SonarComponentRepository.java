package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.SonarComponent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SonarComponent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SonarComponentRepository extends JpaRepository<SonarComponent, Long> {

}

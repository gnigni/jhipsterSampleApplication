package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.MavenModule;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MavenModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MavenModuleRepository extends JpaRepository<MavenModule, Long> {

}

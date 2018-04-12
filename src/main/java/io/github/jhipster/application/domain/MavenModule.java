package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.MavenPackaging;

/**
 * A MavenModule.
 */
@Entity
@Table(name = "maven_module")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MavenModule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "packaging")
    private MavenPackaging packaging;

    @Column(name = "artifact_id")
    private String artifactId;

    @ManyToOne
    private Application application;

    @ManyToOne
    private MavenModule parent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MavenPackaging getPackaging() {
        return packaging;
    }

    public MavenModule packaging(MavenPackaging packaging) {
        this.packaging = packaging;
        return this;
    }

    public void setPackaging(MavenPackaging packaging) {
        this.packaging = packaging;
    }

    public String getArtifactId() {
        return artifactId;
    }

    public MavenModule artifactId(String artifactId) {
        this.artifactId = artifactId;
        return this;
    }

    public void setArtifactId(String artifactId) {
        this.artifactId = artifactId;
    }

    public Application getApplication() {
        return application;
    }

    public MavenModule application(Application application) {
        this.application = application;
        return this;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public MavenModule getParent() {
        return parent;
    }

    public MavenModule parent(MavenModule mavenModule) {
        this.parent = mavenModule;
        return this;
    }

    public void setParent(MavenModule mavenModule) {
        this.parent = mavenModule;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MavenModule mavenModule = (MavenModule) o;
        if (mavenModule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mavenModule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MavenModule{" +
            "id=" + getId() +
            ", packaging='" + getPackaging() + "'" +
            ", artifactId='" + getArtifactId() + "'" +
            "}";
    }
}

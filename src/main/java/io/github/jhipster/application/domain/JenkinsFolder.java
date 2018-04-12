package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A JenkinsFolder.
 */
@Entity
@Table(name = "jenkins_folder")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class JenkinsFolder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url")
    private String url;

    @OneToOne
    @JoinColumn(unique = true)
    private MavenModule mavenModule;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public JenkinsFolder url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public MavenModule getMavenModule() {
        return mavenModule;
    }

    public JenkinsFolder mavenModule(MavenModule mavenModule) {
        this.mavenModule = mavenModule;
        return this;
    }

    public void setMavenModule(MavenModule mavenModule) {
        this.mavenModule = mavenModule;
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
        JenkinsFolder jenkinsFolder = (JenkinsFolder) o;
        if (jenkinsFolder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jenkinsFolder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JenkinsFolder{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            "}";
    }
}

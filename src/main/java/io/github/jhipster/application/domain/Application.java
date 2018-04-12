package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Application.
 */
@Entity
@Table(name = "application")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Application implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code_application")
    private String codeApplication;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "application")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MavenModule> modules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeApplication() {
        return codeApplication;
    }

    public Application codeApplication(String codeApplication) {
        this.codeApplication = codeApplication;
        return this;
    }

    public void setCodeApplication(String codeApplication) {
        this.codeApplication = codeApplication;
    }

    public String getDescription() {
        return description;
    }

    public Application description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<MavenModule> getModules() {
        return modules;
    }

    public Application modules(Set<MavenModule> mavenModules) {
        this.modules = mavenModules;
        return this;
    }

    public Application addModule(MavenModule mavenModule) {
        this.modules.add(mavenModule);
        mavenModule.setApplication(this);
        return this;
    }

    public Application removeModule(MavenModule mavenModule) {
        this.modules.remove(mavenModule);
        mavenModule.setApplication(null);
        return this;
    }

    public void setModules(Set<MavenModule> mavenModules) {
        this.modules = mavenModules;
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
        Application application = (Application) o;
        if (application.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), application.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Application{" +
            "id=" + getId() +
            ", codeApplication='" + getCodeApplication() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}

package com.todotresde.line.manufacturing.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Line.
 */
@Entity
@Table(name = "line")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Line implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "line_wsconfiguration",
               joinColumns = @JoinColumn(name="lines_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="wsconfigurations_id", referencedColumnName="id"))
    private Set<WSConfiguration> wSConfigurations = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Line name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Line description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<WSConfiguration> getWSConfigurations() {
        return wSConfigurations;
    }

    public Line wSConfigurations(Set<WSConfiguration> wSConfigurations) {
        this.wSConfigurations = wSConfigurations;
        return this;
    }

    public Line addWSConfiguration(WSConfiguration wSConfiguration) {
        this.wSConfigurations.add(wSConfiguration);
        return this;
    }

    public Line removeWSConfiguration(WSConfiguration wSConfiguration) {
        this.wSConfigurations.remove(wSConfiguration);
        return this;
    }

    public void setWSConfigurations(Set<WSConfiguration> wSConfigurations) {
        this.wSConfigurations = wSConfigurations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Line line = (Line) o;
        if (line.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, line.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Line{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", description='" + description + "'" +
            '}';
    }
}

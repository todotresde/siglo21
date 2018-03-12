package com.todotresde.sfi2.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A STAttribute.
 */
@Entity
@Table(name = "st_attribute")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class STAttribute implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany(mappedBy = "stAttributes")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SupplyType> supplyTypes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public STAttribute name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<SupplyType> getSupplyTypes() {
        return supplyTypes;
    }

    public STAttribute supplyTypes(Set<SupplyType> supplyTypes) {
        this.supplyTypes = supplyTypes;
        return this;
    }

    public STAttribute addSupplyType(SupplyType supplyType) {
        this.supplyTypes.add(supplyType);
        supplyType.getStAttributes().add(this);
        return this;
    }

    public STAttribute removeSupplyType(SupplyType supplyType) {
        this.supplyTypes.remove(supplyType);
        supplyType.getStAttributes().remove(this);
        return this;
    }

    public void setSupplyTypes(Set<SupplyType> supplyTypes) {
        this.supplyTypes = supplyTypes;
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
        STAttribute sTAttribute = (STAttribute) o;
        if (sTAttribute.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sTAttribute.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "STAttribute{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

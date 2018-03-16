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
 * A SupplyType.
 */
@Entity
@Table(name = "supply_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SupplyType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "supplyType")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Supply> supplies = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "supply_type_st_attribute",
               joinColumns = @JoinColumn(name="supply_types_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="st_attributes_id", referencedColumnName="id"))
    private Set<STAttribute> stAttributes = new HashSet<>();

    @ManyToMany(mappedBy = "supplyTypes")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WSConfiguration> wsConfigurations = new HashSet<>();

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

    public SupplyType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Supply> getSupplies() {
        return supplies;
    }

    public SupplyType supplies(Set<Supply> supplies) {
        this.supplies = supplies;
        return this;
    }

    public SupplyType addSupply(Supply supply) {
        this.supplies.add(supply);
        supply.setSupplyType(this);
        return this;
    }

    public SupplyType removeSupply(Supply supply) {
        this.supplies.remove(supply);
        supply.setSupplyType(null);
        return this;
    }

    public void setSupplies(Set<Supply> supplies) {
        this.supplies = supplies;
    }

    public Set<STAttribute> getSTAttributes() {
        return stAttributes;
    }

    public SupplyType stAttributes(Set<STAttribute> sTAttributes) {
        this.stAttributes = sTAttributes;
        return this;
    }

    public SupplyType addSTAttribute(STAttribute sTAttribute) {
        this.stAttributes.add(sTAttribute);
        sTAttribute.getSupplyTypes().add(this);
        return this;
    }

    public SupplyType removeSTAttribute(STAttribute sTAttribute) {
        this.stAttributes.remove(sTAttribute);
        sTAttribute.getSupplyTypes().remove(this);
        return this;
    }

    public void setSTAttributes(Set<STAttribute> sTAttributes) {
        this.stAttributes = sTAttributes;
    }

    public Set<WSConfiguration> getWsConfigurations() {
        return wsConfigurations;
    }

    public SupplyType wsConfigurations(Set<WSConfiguration> wSConfigurations) {
        this.wsConfigurations = wSConfigurations;
        return this;
    }

    public SupplyType addWsConfiguration(WSConfiguration wSConfiguration) {
        this.wsConfigurations.add(wSConfiguration);
        wSConfiguration.getSupplyTypes().add(this);
        return this;
    }

    public SupplyType removeWsConfiguration(WSConfiguration wSConfiguration) {
        this.wsConfigurations.remove(wSConfiguration);
        wSConfiguration.getSupplyTypes().remove(this);
        return this;
    }

    public void setWsConfigurations(Set<WSConfiguration> wSConfigurations) {
        this.wsConfigurations = wSConfigurations;
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
        SupplyType supplyType = (SupplyType) o;
        if (supplyType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supplyType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SupplyType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

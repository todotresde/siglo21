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
 * A PTAttribute.
 */
@Entity
@Table(name = "pt_attribute")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PTAttribute implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany(mappedBy = "ptAttributes")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProductType> productTypes = new HashSet<>();

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

    public PTAttribute name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ProductType> getProductTypes() {
        return productTypes;
    }

    public PTAttribute productTypes(Set<ProductType> productTypes) {
        this.productTypes = productTypes;
        return this;
    }

    public PTAttribute addProductType(ProductType productType) {
        this.productTypes.add(productType);
        productType.getPtAttributes().add(this);
        return this;
    }

    public PTAttribute removeProductType(ProductType productType) {
        this.productTypes.remove(productType);
        productType.getPtAttributes().remove(this);
        return this;
    }

    public void setProductTypes(Set<ProductType> productTypes) {
        this.productTypes = productTypes;
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
        PTAttribute pTAttribute = (PTAttribute) o;
        if (pTAttribute.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pTAttribute.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PTAttribute{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

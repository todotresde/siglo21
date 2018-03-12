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
 * A ProductType.
 */
@Entity
@Table(name = "product_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProductType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "productType")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "product_type_pt_attribute",
               joinColumns = @JoinColumn(name="product_types_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="pt_attributes_id", referencedColumnName="id"))
    private Set<PTAttribute> ptAttributes = new HashSet<>();

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

    public ProductType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public ProductType products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public ProductType addProduct(Product product) {
        this.products.add(product);
        product.setProductType(this);
        return this;
    }

    public ProductType removeProduct(Product product) {
        this.products.remove(product);
        product.setProductType(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Set<PTAttribute> getPtAttributes() {
        return ptAttributes;
    }

    public ProductType ptAttributes(Set<PTAttribute> pTAttributes) {
        this.ptAttributes = pTAttributes;
        return this;
    }

    public ProductType addPtAttribute(PTAttribute pTAttribute) {
        this.ptAttributes.add(pTAttribute);
        pTAttribute.getProductTypes().add(this);
        return this;
    }

    public ProductType removePtAttribute(PTAttribute pTAttribute) {
        this.ptAttributes.remove(pTAttribute);
        pTAttribute.getProductTypes().remove(this);
        return this;
    }

    public void setPtAttributes(Set<PTAttribute> pTAttributes) {
        this.ptAttributes = pTAttributes;
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
        ProductType productType = (ProductType) o;
        if (productType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

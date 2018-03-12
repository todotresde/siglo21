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
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MOProduct> moProducts = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "product_supply",
               joinColumns = @JoinColumn(name="products_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="supplies_id", referencedColumnName="id"))
    private Set<Supply> supplies = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private ProductType productType;

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

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<MOProduct> getMoProducts() {
        return moProducts;
    }

    public Product moProducts(Set<MOProduct> mOProducts) {
        this.moProducts = mOProducts;
        return this;
    }

    public Product addMoProduct(MOProduct mOProduct) {
        this.moProducts.add(mOProduct);
        mOProduct.setProduct(this);
        return this;
    }

    public Product removeMoProduct(MOProduct mOProduct) {
        this.moProducts.remove(mOProduct);
        mOProduct.setProduct(null);
        return this;
    }

    public void setMoProducts(Set<MOProduct> mOProducts) {
        this.moProducts = mOProducts;
    }

    public Set<Supply> getSupplies() {
        return supplies;
    }

    public Product supplies(Set<Supply> supplies) {
        this.supplies = supplies;
        return this;
    }

    public Product addSupply(Supply supply) {
        this.supplies.add(supply);
        supply.getProducts().add(this);
        return this;
    }

    public Product removeSupply(Supply supply) {
        this.supplies.remove(supply);
        supply.getProducts().remove(this);
        return this;
    }

    public void setSupplies(Set<Supply> supplies) {
        this.supplies = supplies;
    }

    public ProductType getProductType() {
        return productType;
    }

    public Product productType(ProductType productType) {
        this.productType = productType;
        return this;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
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
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

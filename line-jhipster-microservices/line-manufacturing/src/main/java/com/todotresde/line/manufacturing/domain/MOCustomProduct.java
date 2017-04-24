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
 * A MOCustomProduct.
 */
@Entity
@Table(name = "mo_custom_product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MOCustomProduct implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "mocustom_product_moproduct",
               joinColumns = @JoinColumn(name="mocustom_products_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="moproducts_id", referencedColumnName="id"))
    private Set<MOProduct> mOProducts = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public MOCustomProduct description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<MOProduct> getMOProducts() {
        return mOProducts;
    }

    public MOCustomProduct mOProducts(Set<MOProduct> mOProducts) {
        this.mOProducts = mOProducts;
        return this;
    }

    public MOCustomProduct addMOProduct(MOProduct mOProduct) {
        this.mOProducts.add(mOProduct);
        return this;
    }

    public MOCustomProduct removeMOProduct(MOProduct mOProduct) {
        this.mOProducts.remove(mOProduct);
        return this;
    }

    public void setMOProducts(Set<MOProduct> mOProducts) {
        this.mOProducts = mOProducts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MOCustomProduct mOCustomProduct = (MOCustomProduct) o;
        if (mOCustomProduct.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, mOCustomProduct.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "MOCustomProduct{" +
            "id=" + id +
            ", description='" + description + "'" +
            '}';
    }
}

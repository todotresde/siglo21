package com.todotresde.line.product.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
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

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "has_width")
    private Boolean hasWidth;

    @Column(name = "has_height")
    private Boolean hasHeight;

    @OneToMany(mappedBy = "productType")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public ProductType code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
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

    public String getDescription() {
        return description;
    }

    public ProductType description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isHasWidth() {
        return hasWidth;
    }

    public ProductType hasWidth(Boolean hasWidth) {
        this.hasWidth = hasWidth;
        return this;
    }

    public void setHasWidth(Boolean hasWidth) {
        this.hasWidth = hasWidth;
    }

    public Boolean isHasHeight() {
        return hasHeight;
    }

    public ProductType hasHeight(Boolean hasHeight) {
        this.hasHeight = hasHeight;
        return this;
    }

    public void setHasHeight(Boolean hasHeight) {
        this.hasHeight = hasHeight;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ProductType productType = (ProductType) o;
        if (productType.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, productType.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ProductType{" +
            "id=" + id +
            ", code='" + code + "'" +
            ", name='" + name + "'" +
            ", description='" + description + "'" +
            ", hasWidth='" + hasWidth + "'" +
            ", hasHeight='" + hasHeight + "'" +
            '}';
    }
}

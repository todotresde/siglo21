package com.todotresde.siglo21.line.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Entity
@Table(name = "product")
public class Product {
    @Id
    @NotNull
    private Long id;
    @NotNull(message = "not-empty")
    @Column(unique=true)
    private String code;
    @NotNull
    private String description;
    @NotNull(message = "not-empty")
    @OneToOne
    private ProductType productType;

    public Product(){

    }

    public Product(Long id, String code, String description, ProductType productType) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.productType = productType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }
}

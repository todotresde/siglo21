package com.todotresde.siglo21.security.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Entity
@Table(name = "productType")
public class ProductType {
    @Id
    @NotNull
    private Long id;
    @NotNull
    @Column(unique=true)
    private String code;
    @NotNull
    private String name;
    @NotNull
    private String description;
    private Boolean hasWidth;
    private Boolean hasHeight;

    public ProductType(){

    }

    public ProductType(Long id, String code, String name, String description, Boolean hasWidth, Boolean hasHeight) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.hasWidth = hasWidth;
        this.hasHeight = hasHeight;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getHasWidth() {
        return hasWidth;
    }

    public void setHasWidth(Boolean hasWidth) {
        this.hasWidth = hasWidth;
    }

    public Boolean getHasHeight() {
        return hasHeight;
    }

    public void setHasHeight(Boolean hasHeight) {
        this.hasHeight = hasHeight;
    }
}

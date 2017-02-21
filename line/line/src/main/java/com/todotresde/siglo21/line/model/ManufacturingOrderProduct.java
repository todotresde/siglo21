package com.todotresde.siglo21.line.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Entity
@Table(name = "manufacturingOrderProduct")
public class ManufacturingOrderProduct {
    @Id
    @NotNull
    private Long id;
    private Double width;
    private Double height;
    @NotNull
    private Integer quantity;
    @NotNull
    private Long product;

    public ManufacturingOrderProduct(){

    }

    public ManufacturingOrderProduct(Long id, Double width, Double height, Integer quantity, Long product) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.quantity = quantity;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getWidth() {
        return (width != null) ? width : 0;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getHeight() {
        return (height != null) ? height : 0;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getProduct() {
        return product;
    }

    public void setProduct(Long product) {
        this.product = product;
    }

}

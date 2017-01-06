package com.todotresde.siglo21.line.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Entity
@Table(name = "manufacturingOrderCustomProduct")
public class ManufacturingOrderCustomProduct {
    @Id
    @NotNull
    private Long id;
    @NotNull
    private String description;
    @NotNull
    @OneToMany
    private List<ManufacturingOrderProduct> manufacturingOrderProducts;

    public ManufacturingOrderCustomProduct(){

    }

    public ManufacturingOrderCustomProduct(Long id, String description, List<ManufacturingOrderProduct> manufacturingOrderProducts) {
        this.id = id;
        this.description = description;
        this.manufacturingOrderProducts = manufacturingOrderProducts;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ManufacturingOrderProduct> getManufacturingOrderProducts() {
        return manufacturingOrderProducts;
    }

    public void setManufacturingOrderProducts(List<ManufacturingOrderProduct> manufacturingOrderProducts) {
        this.manufacturingOrderProducts = manufacturingOrderProducts;
    }

}

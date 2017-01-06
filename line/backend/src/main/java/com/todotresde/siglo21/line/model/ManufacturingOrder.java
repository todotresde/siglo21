package com.todotresde.siglo21.line.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Entity
@Table(name = "manufacturingOrder")
public class ManufacturingOrder {
    @Id
    @NotNull
    private Long id;
    @NotNull
    private String code;
    @NotNull
    private Date date;
    @NotNull
    @OneToMany
    private List<ManufacturingOrderCustomProduct> manufacturingOrderCustomProducts;

    public ManufacturingOrder(){

    }

    public ManufacturingOrder(Long id, String code, List<ManufacturingOrderCustomProduct> manufacturingOrderCustomProducts) {
        this.id = id;
        this.code = code;
        this.manufacturingOrderCustomProducts = manufacturingOrderCustomProducts;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<ManufacturingOrderCustomProduct> getManufacturingOrderCustomProducts() {
        return manufacturingOrderCustomProducts;
    }

    public void setManufacturingOrderCustomProducts(List<ManufacturingOrderCustomProduct> manufacturingOrderCustomProducts) {
        this.manufacturingOrderCustomProducts = manufacturingOrderCustomProducts;
    }
}

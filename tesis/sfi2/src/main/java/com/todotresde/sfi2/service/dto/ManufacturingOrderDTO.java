package com.todotresde.sfi2.service.dto;

import com.todotresde.sfi2.domain.ManufacturingOrder;
import com.todotresde.sfi2.domain.Product;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ManufacturingOrderDTO {
    private ManufacturingOrder manufacturingOrder;
    private Set<Product> products = new HashSet<>();

    public ManufacturingOrder getManufacturingOrder() {
        return manufacturingOrder;
    }

    public void setManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        this.manufacturingOrder = manufacturingOrder;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}

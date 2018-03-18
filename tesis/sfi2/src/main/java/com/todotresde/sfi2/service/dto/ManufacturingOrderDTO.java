package com.todotresde.sfi2.service.dto;

import com.todotresde.sfi2.domain.MOProduct;
import com.todotresde.sfi2.domain.ManufacturingOrder;
import com.todotresde.sfi2.domain.Product;
import com.todotresde.sfi2.domain.STAttributeValue;

import java.util.ArrayList;
import java.util.List;

public class ManufacturingOrderDTO {
    private List<STAttributeValue> sTAttributeValues = new ArrayList<>();
    private List<MOProduct> mOProducts = new ArrayList<>();
    private ManufacturingOrder manufacturingOrder;
    private List<Product> products = new ArrayList<>();

    public List<MOProduct> getmOProducts() {
        return mOProducts;
    }

    public void setmOProducts(List<MOProduct> mOProducts) {
        this.mOProducts = mOProducts;
    }

    public List<STAttributeValue> getsTAttributeValues() {
        return sTAttributeValues;
    }

    public void setsTAttributeValues(List<STAttributeValue> sTAttributeValues) {
        this.sTAttributeValues = sTAttributeValues;
    }

    public ManufacturingOrder getManufacturingOrder() {
        return manufacturingOrder;
    }

    public void setManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        this.manufacturingOrder = manufacturingOrder;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}

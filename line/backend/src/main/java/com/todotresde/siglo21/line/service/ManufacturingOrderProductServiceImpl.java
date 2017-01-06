package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.ManufacturingOrderProductDao;
import com.todotresde.siglo21.line.model.ManufacturingOrderProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class ManufacturingOrderProductServiceImpl implements ManufacturingOrderProductService{
    @Autowired
    private ManufacturingOrderProductDao manufacturingOrderProductDao;

    public List<ManufacturingOrderProduct> all() {
        ArrayList<ManufacturingOrderProduct> manufacturingOrderProducts = new ArrayList<ManufacturingOrderProduct>();

        for (ManufacturingOrderProduct manufacturingOrderProduct : manufacturingOrderProductDao.findAll()) {
            manufacturingOrderProducts.add(manufacturingOrderProduct);
        }

        return manufacturingOrderProducts;
    }

    public ManufacturingOrderProduct byId(Long id) {
        return manufacturingOrderProductDao.findById(id);
    }

    public ManufacturingOrderProduct delete(Long id) {
        ManufacturingOrderProduct manufacturingOrderProduct = manufacturingOrderProductDao.findById(id);
        manufacturingOrderProductDao.delete(id);
        return manufacturingOrderProduct;
    }

    public ManufacturingOrderProduct save(ManufacturingOrderProduct manufacturingOrderProduct) {
        manufacturingOrderProductDao.save(manufacturingOrderProduct);
        return manufacturingOrderProduct;
    }
}

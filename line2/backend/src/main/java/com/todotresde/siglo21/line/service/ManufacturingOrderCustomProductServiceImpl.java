package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.ManufacturingOrderCustomProductDao;
import com.todotresde.siglo21.line.model.ManufacturingOrderCustomProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class ManufacturingOrderCustomProductServiceImpl implements ManufacturingOrderCustomProductService {
    @Autowired
    private ManufacturingOrderCustomProductDao manufacturingOrderCustomProductDao;

    public List<ManufacturingOrderCustomProduct> all() {
        ArrayList<ManufacturingOrderCustomProduct> manufacturingOrderCustomProducts = new ArrayList<ManufacturingOrderCustomProduct>();

        for (ManufacturingOrderCustomProduct manufacturingOrderCustomProduct : manufacturingOrderCustomProductDao.findAll()) {
            manufacturingOrderCustomProducts.add(manufacturingOrderCustomProduct);
        }

        return manufacturingOrderCustomProducts;
    }

    public ManufacturingOrderCustomProduct byId(Long id) {
        return manufacturingOrderCustomProductDao.findById(id);
    }

    public ManufacturingOrderCustomProduct delete(Long id) {
        ManufacturingOrderCustomProduct manufacturingOrderCustomProduct = manufacturingOrderCustomProductDao.findById(id);
        manufacturingOrderCustomProductDao.delete(id);
        return manufacturingOrderCustomProduct;
    }

    public ManufacturingOrderCustomProduct save(ManufacturingOrderCustomProduct manufacturingOrderCustomProduct) {
        manufacturingOrderCustomProductDao.save(manufacturingOrderCustomProduct);
        return manufacturingOrderCustomProduct;
    }
}

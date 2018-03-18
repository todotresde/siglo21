package com.todotresde.sfi2.service;

import com.todotresde.sfi2.domain.*;
import com.todotresde.sfi2.repository.ManufacturingOrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class ManufacturingOrderService {

    private final Logger log = LoggerFactory.getLogger(ManufacturingOrderService.class);

    private final MOProductService mOProductService;
    private final SchedulerService schedulerService;
    private final ProductService productService;
    private final STAttributeValueService stAttributeValueService;
    private final ManufacturingOrderRepository manufacturingOrderRepository;

    public ManufacturingOrderService(MOProductService mOProductService, SchedulerService schedulerService, ManufacturingOrderRepository manufacturingOrderRepository, ProductService productService, STAttributeValueService stAttributeValueService) {
        this.mOProductService = mOProductService;
        this.schedulerService = schedulerService;
        this.productService = productService;
        this.stAttributeValueService = stAttributeValueService;
        this.manufacturingOrderRepository = manufacturingOrderRepository;
    }

    //TODO - Capture error in case of schedulerService.sendMOProduct fail
    public ManufacturingOrder send(Long id) {
        ManufacturingOrder manufacturingOrder = manufacturingOrderRepository.findOne(id);
        log.debug("Send manufacturingOrder to build {}", manufacturingOrder);

        List<MOProduct> mOProducts = this.mOProductService.getByManufacturingOrder(manufacturingOrder);

        for(MOProduct mOProduct: mOProducts){
            for(Integer count = 0; count < mOProduct.getQuantity(); count++){
                schedulerService.sendMOProduct(mOProduct);
            }
        }

        manufacturingOrder.setStatus(1);

        manufacturingOrderRepository.save(manufacturingOrder);

        return manufacturingOrder;
    }

    public ManufacturingOrder saveWithProductsAndSTAttributeValues(ManufacturingOrder manufacturingOrder, List<Product> products, List<STAttributeValue> stAttributeValues) {
        manufacturingOrder = manufacturingOrderRepository.save(manufacturingOrder);
        Integer stAttributeValueIndex = 0;
        for(Product product : products) {
            MOProduct moProduct = new MOProduct(1, manufacturingOrder);
            moProduct = mOProductService.save(moProduct);

            ProductType productType = new ProductType();
            productType.setId(new Long(1));
            product.setName("");
            product.setProductType(productType);
            product.setMoProduct(moProduct);

            productService.save(product);

            for(Supply supply : product.getSupplies()) {
                for(STAttribute stAttribute : supply.getSupplyType().getSTAttributes()) {
                    STAttributeValue stAttributeValue = new STAttributeValue();
                    stAttributeValue.setProduct(product);
                    stAttributeValue.setStAttribute(stAttribute);
                    stAttributeValue.setSupply(supply);
                    stAttributeValue.setSupplyType(supply.getSupplyType());
                    stAttributeValue.setValue(stAttributeValues.get(stAttributeValueIndex).getValue());

                    stAttributeValueService.save(stAttributeValue);

                    stAttributeValueIndex++;
                }

            }
        }

        return manufacturingOrder;
    }
}


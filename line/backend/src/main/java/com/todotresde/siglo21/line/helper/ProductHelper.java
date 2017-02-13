package com.todotresde.siglo21.line.helper;

import com.todotresde.siglo21.line.model.Product;
import com.todotresde.siglo21.line.model.ProductType;
import com.todotresde.siglo21.line.service.ProductService;
import com.todotresde.siglo21.line.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Leonardo on 13/01/2017.
 */
@Component
public class ProductHelper {
    @Autowired
    ProductService productService;
    @Autowired
    ProductTypeService productTypeService;

    public List<Product> importProducts() {
        List<Product> products = new ArrayList<Product>();

        ClassLoader classLoader = getClass().getClassLoader();

        try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(classLoader.getResource("import/products.txt").getPath()),"ISO-8859-1"))) {
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                String id = line.substring(0, 5);
                String code = line.substring(0, 5);
                String description = line.substring(5, 65);

                String productTypeCode = line.substring(176, 178);
                String productTypeDesc = line.substring(178, 186);
                String productMeassures = line.substring(78, 79);

                ProductType productType = productTypeService.byCode(productTypeCode);
                if(productType == null){
                    productType = new ProductType();
                    productType.setId(Long.parseLong(productTypeCode));
                    productType.setCode(productTypeCode);
                    productType.setName(productTypeDesc);
                    productType.setDescription(productTypeDesc);

                    switch(productMeassures){
                        case "0":
                            productType.setHasWidth(false);
                            productType.setHasHeight(false);
                            break;
                        case "1":
                            productType.setHasWidth(true);
                            productType.setHasHeight(false);
                            break;
                        case "2":
                            productType.setHasWidth(true);
                            productType.setHasHeight(true);
                            break;
                        case "3":
                            productType.setHasWidth(false);
                            productType.setHasHeight(true);
                            break;
                        default:
                            productType.setHasWidth(false);
                            productType.setHasHeight(false);
                    }

                    productTypeService.save(productType);
                }

                Product product = new Product();
                product.setId(Long.parseLong(id));
                product.setCode(code);
                product.setDescription(description);
                product.setProductType(productType);

                productService.save(product);

                products.add(product);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return products;
        } catch (Exception e) {
            e.printStackTrace();
            return products;
        }

        return products;
    }

}

package com.all.Projectforall.services;


import com.all.Projectforall.entitys.Product;
import com.all.Projectforall.exceptions.ResourceNotFoundException;
import com.all.Projectforall.models.ProductModel;
import com.all.Projectforall.repos.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository prepo;

    @Autowired
    private CategoryService categoryService;

    public List<ProductModel> allProducts(String admin) {
        return prepo.findAllByTheAdmin(admin).stream().map(product -> new ProductModel(product)).collect(Collectors.toList());

    }

    // public List<Product> allProducts() {return  prepo.findAll();}

    public ProductModel getProductbyname(String name,String admin) {
        Optional<Product> product = prepo.findByNameAndTheAdmin(name,admin);
        product.orElseThrow(() -> new UsernameNotFoundException("Not Found" + name));
        return product.map(ProductModel::new).get();
    }

    public List<ProductModel> getProductbyCategory(String name,String admin) {
        List<Product> products = prepo.findByCategoryAndTheAdmin(name,admin);
        return products.stream().map(product -> new ProductModel(product)).collect(Collectors.toList());
    }

    public List<List<ProductModel>> groupingProducts(String admin) {
        List<List<ProductModel>>productsInGroups =new ArrayList<>();
        List<String> categories = categoryService.selectcategorynames(admin);
        for (String category:categories)
        productsInGroups.add(this.getProductbyCategory(category,admin));
       // System.out.println("grouping products: "+productsInGroups);
        return productsInGroups;
    }

    public ProductModel updateProduct(String name, ProductModel productDetails)
            throws ResourceNotFoundException {
        Product product = prepo.findByNameAndTheAdmin(name,productDetails.getThe_admin())
                .orElseThrow(() -> new ResourceNotFoundException("product not found  "));

        product.setName(productDetails.getName());
        product.setBrand(productDetails.getBrand());
        product.setDescription(productDetails.getDescription());
        product.setImageName(productDetails.getImageName());
        product.setCategory(productDetails.getCategory());
        product.setAmount(productDetails.getAmount());
        product.setPrice(productDetails.getPrice());
        product.setTheAdmin(productDetails.getThe_admin());

        final Product updatedProduct = prepo.save(product);
        return new ProductModel(updatedProduct);
    }

    public Map<String, Boolean> deleteProduct(String name,String admin)
            throws ResourceNotFoundException {
        Product product = prepo.findByNameAndTheAdmin(name,admin)
                .orElseThrow(() -> new ResourceNotFoundException("product not found  "));
        prepo.delete(product);
        Map<String, Boolean> response = new HashMap<String, Boolean>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    public ProductModel save(ProductModel product) {
        return new ProductModel(prepo.save(new Product(product)));

    }

    public List<String> selectnames(String admin) {
        return prepo.selectNames(admin);
    }


}

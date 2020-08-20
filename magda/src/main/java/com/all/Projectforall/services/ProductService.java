package com.all.Projectforall.services;


import com.all.Projectforall.entitys.Product;
import com.all.Projectforall.entitys.compositkey.ProductKey;
import com.all.Projectforall.exceptions.ResourceNotFoundException;
import com.all.Projectforall.models.ProductModel;
import com.all.Projectforall.repos.InvoiceRepository;
import com.all.Projectforall.repos.ProductRepository;
import com.all.Projectforall.responses.ProductResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository prepo;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Async
    public CompletableFuture<ProductResponse> allProducts(String admin) {
        return  CompletableFuture.completedFuture(new ProductResponse(prepo.findAllById_TheAdmin(admin)
                .stream().map(product -> new ProductModel(product)).collect(Collectors.toList()),
                invoiceRepository.countInvoiceAByInvoiceNoIsNotNull()+1));
    }

    // public CompletableFuture<List<Product> allProducts() {return CompletableFuture.completedFuture(  prepo.findAll();}

    public CompletableFuture<ProductModel> getProductbyname(String name, String admin) {
        Optional<Product> product = prepo.findById_NameAndId_TheAdmin(name, admin);
        product.orElseThrow(() -> new UsernameNotFoundException("Not Found" + name));
        return CompletableFuture.completedFuture( product.map(ProductModel::new).get());
    }

    public CompletableFuture<ProductModel> getProductbyCod(Long cod, String admin) {
        Optional<Product> product = prepo.findByCodAndId_TheAdmin(cod, admin);
        product.orElseThrow(() -> new UsernameNotFoundException("Not Found Product With Cod " + cod));
        return CompletableFuture.completedFuture( product.map(ProductModel::new).get());
    }

    public CompletableFuture<List<ProductModel>> getProductbyCategory(String name, String admin) {
        List<Product> products = prepo.findByCategoryAndId_TheAdmin(name, admin);
        return CompletableFuture.completedFuture( products.stream().map(product -> new ProductModel(product)).collect(Collectors.toList()));
    }

    public CompletableFuture<List<List<ProductModel>>> groupingProducts(String admin) throws ExecutionException, InterruptedException {
        List<List<ProductModel>> productsInGroups = new ArrayList<>();
        List<String> categories = categoryService.selectcategorynames(admin);
        for (String category : categories)
            productsInGroups.add(this.getProductbyCategory(category, admin).get());
        // System.out.println("grouping products: "+productsInGroups);
        return CompletableFuture.completedFuture( productsInGroups);
    }

    public CompletableFuture<ProductModel> updateProduct(String name, ProductModel productDetails)
            throws ResourceNotFoundException {
        Product product = prepo.findById_NameAndId_TheAdmin(name, productDetails.getThe_admin())
                .orElseThrow(() -> new ResourceNotFoundException("product not found  "));
        prepo.delete(product);

     /*   product.setId(new ProductKey(productDetails.getName(),productDetails.getThe_admin()));
        product.setBrand(productDetails.getBrand());
        product.setDescription(productDetails.getDescription());
        product.setImageName(productDetails.getImageName());
        product.setCategory(productDetails.getCategory());
        product.setAmount(productDetails.getAmount());
        product.setPrice(productDetails.getPrice());*/

        final Product updatedProduct = prepo.save(new Product(productDetails));
        return CompletableFuture.completedFuture( new ProductModel(updatedProduct));
    }

    public CompletableFuture<Map<String, Boolean>> deleteProduct(String name, String admin)
            throws ResourceNotFoundException {
        Product product = prepo.findById_NameAndId_TheAdmin(name, admin)
                .orElseThrow(() -> new ResourceNotFoundException("product not found  "));
        prepo.delete(product);
        Map<String, Boolean> response = new HashMap<String, Boolean>();
        response.put("deleted", Boolean.TRUE);
        return CompletableFuture.completedFuture( response);
    }

    public CompletableFuture<ProductModel> save(ProductModel product) {
        return CompletableFuture.completedFuture( new ProductModel(prepo.save(new Product(product))));

    }

    public CompletableFuture<List<String>> selectnames(String admin) {
        return CompletableFuture.completedFuture( prepo.selectNames(admin));
    }


}

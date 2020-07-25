package com.all.Projectforall.controllers;

import com.all.Projectforall.configuration.FileUpload;
import com.all.Projectforall.entitys.Product;
import com.all.Projectforall.exceptions.ResourceNotFoundException;
import com.all.Projectforall.models.ProductModel;
import com.all.Projectforall.services.ProductService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;


//@CrossOrigin(origins = "http://localhost:4200")


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1")
public class ProductController {

    @Autowired
    private ProductService pserv;

   /* @RequestMapping("/")
    public CompletableFuture< String aa() {
        return CompletableFuture.completedFuture( "allah";
    }*/

    @GetMapping("/product")
    public CompletableFuture<CompletableFuture<List<ProductModel>>> getAllProducts(HttpServletRequest request) {
        return CompletableFuture.completedFuture(pserv.allProducts(request.getHeader("theAdmin")));
    }

    @GetMapping("/product/{name}")
    public CompletableFuture<ResponseEntity<ProductModel>> getProductByName(@PathVariable(value = "name") String name, HttpServletRequest request)
            throws ExecutionException, InterruptedException {
        ProductModel product = pserv.getProductbyname(name, request.getHeader("theAdmin")).get();
        return CompletableFuture.completedFuture(ResponseEntity.ok().body(product));
    }

    @GetMapping("/product/{name}/category")
    public CompletableFuture<ResponseEntity<List<ProductModel>>> getProductByCategory(@PathVariable(value = "name") String name, HttpServletRequest request)
            throws ExecutionException, InterruptedException {
        List<ProductModel> products = pserv.getProductbyCategory(name, request.getHeader("theAdmin")).get();
        return CompletableFuture.completedFuture(ResponseEntity.ok().body(products));
    }

    @GetMapping("/product/grouping")
    public CompletableFuture<ResponseEntity<List<List<ProductModel>>>> groupingProducts(HttpServletRequest request)
            throws ExecutionException, InterruptedException {
        return pserv.groupingProducts(request.getHeader("theAdmin")).thenApply(ResponseEntity::ok);
    }

    // public CompletableFuture< ProductModel createProduct(@RequestParam(value = "file",required = false)MultipartFile file, @Valid @RequestBody ProductModel product, HttpServletRequest request) {
//,consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},produces = {MediaType.APPLICATION_JSON_VALUE}
    @PostMapping(value = "/product")
    public CompletableFuture<ProductModel> createProduct(@RequestParam(value = "file", required = false) MultipartFile file,
                                                        @RequestParam(value = "product", required = false) String SProduct,
                                                        HttpServletRequest request
    ) {

        if (!file.getOriginalFilename().equals(""))
            FileUpload.UPloadImage(request, file, file.getOriginalFilename(), "product");

        ProductModel product = new Gson().fromJson(SProduct, ProductModel.class);
        product.setThe_admin(request.getHeader("theAdmin"));
        return pserv.save(product);
    }

    @PutMapping("/product/{name}")
    public CompletableFuture<ResponseEntity<ProductModel>> updateProduct(@PathVariable(value = "name") String name,
                                                                        @Valid @RequestBody ProductModel productDetails,
                                                                        HttpServletRequest request)
            throws ResourceNotFoundException, ExecutionException, InterruptedException {
        productDetails.setThe_admin(request.getHeader("theAdmin"));
        final CompletableFuture<ProductModel> updatedProduct = pserv.updateProduct(name, productDetails);
        return updatedProduct.thenApply(ResponseEntity::ok);
    }


    @DeleteMapping("/product/{name}")
    public CompletableFuture<Map<String, Boolean>> deleteProduct(@PathVariable(value = "name") String name, HttpServletRequest request)
            throws ResourceNotFoundException {

        return pserv.deleteProduct(name, request.getHeader("theAdmin"));
    }

    @GetMapping("/product/names")
    public CompletableFuture<List<String>> selectnames(HttpServletRequest request) {
        return pserv.selectnames(request.getHeader("theAdmin"));
    }


}

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


//@CrossOrigin(origins = "http://localhost:4200")


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1")
public class ProductController {
    @Autowired
    private ProductService pserv;

   /* @RequestMapping("/")
    public String aa() {
        return "allah";
    }*/

    @GetMapping("/product")
    public List<ProductModel> getAllProducts() {
        return pserv.allProducts();
    }

    @GetMapping("/product/{name}")
    public ResponseEntity<ProductModel> getProductByName(@PathVariable(value = "name") String name) {
        ProductModel product = pserv.getProductbyname(name);
        return ResponseEntity.ok().body(product);
    }

    @GetMapping("/product/{name}/category")
    public ResponseEntity<List<ProductModel>> getProductByCategory(@PathVariable(value = "name") String name) {
        List<ProductModel> products = pserv.getProductbyCategory(name);
        return ResponseEntity.ok().body(products);
    }

    @GetMapping("/product/grouping")
    public ResponseEntity<List<List<ProductModel>>> groupingProducts() {
        return ResponseEntity.ok().body(pserv.groupingProducts());
    }

    // public ProductModel createProduct(@RequestParam(value = "file",required = false)MultipartFile file, @Valid @RequestBody ProductModel product, HttpServletRequest request) {
//,consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},produces = {MediaType.APPLICATION_JSON_VALUE}
    @PostMapping(value = "/product")
    public ProductModel createProduct(@RequestParam(value = "file", required = false) MultipartFile file,
                                      @RequestParam(value = "product", required = false) String SProduct,
                                      HttpServletRequest request
    ) {

        if (!file.getOriginalFilename().equals(""))
            FileUpload.UPloadImage(request, file, file.getOriginalFilename(),"product");

        ProductModel product = new Gson().fromJson(SProduct, ProductModel.class);
        return pserv.save(product);
    }

    @PutMapping("/product/{name}")
    public ResponseEntity<ProductModel> updateProduct(@PathVariable(value = "name") String name,
                                                      @Valid @RequestBody Product productDetails)
            throws ResourceNotFoundException {

        final ProductModel updatedProduct = pserv.updateProduct(name, productDetails);
        return ResponseEntity.ok(updatedProduct);
    }


    @DeleteMapping("/product/{name}")
    public Map<String, Boolean> deleteProduct(@PathVariable(value = "name") String name)
            throws ResourceNotFoundException {

        return pserv.deleteProduct(name);
    }

    @GetMapping("/product/names")
    public List<String> selectnames() {
        return pserv.selectnames();
    }


}

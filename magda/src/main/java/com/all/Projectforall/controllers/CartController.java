package com.all.Projectforall.controllers;

import com.all.Projectforall.configuration.FileUpload;
import com.all.Projectforall.entitys.Cart;
import com.all.Projectforall.entitys.Product;
import com.all.Projectforall.exceptions.ResourceNotFoundException;
import com.all.Projectforall.models.CartModel;
import com.all.Projectforall.models.ProductModel;
import com.all.Projectforall.services.CartService;
import com.all.Projectforall.services.ProductService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class CartController {

    @Autowired
    private CartService c_service;

   /* @RequestMapping("/")
    public String aa() {
        return "allah";
    }*/

    @GetMapping()
    public List<CartModel> getAllProducts() {
        return c_service.allCartLines();
    }

    @GetMapping("/cart/{user}/{name}")
    public ResponseEntity<List<CartModel>> getCartLineByUserAndProductName(@PathVariable(value = "user") String user,
                                                                     @PathVariable(value = "name") String productName) {
        List<Cart> cartLines = c_service.getCartLineByUserAndProductName(user, productName);
        return ResponseEntity.ok().body(cartLines.stream().map(cart -> new CartModel(cart)).collect(Collectors.toList()));
    }

    @GetMapping("/cart/{user}")
    public ResponseEntity<List<CartModel>> getAllUserCartLines(@PathVariable(value = "user") String user) {
        List<CartModel> cartLines = c_service.getCartLineByUser(user);
        return ResponseEntity.ok().body(cartLines);
    }

    @PostMapping("/cart")
    public CartModel createProduct(@Valid @RequestBody CartModel cart) {
        return c_service.save(cart);
    }

    @PutMapping("/cart/{user}/{name}")
    public ResponseEntity<CartModel> updateProduct(@PathVariable(value = "user") String user,
                                                   @PathVariable(value = "name") String name,
                                                   @Valid @RequestBody CartModel cartDetails){

        final CartModel updatedCartLine = c_service.updateCart(user,name,cartDetails);
        return ResponseEntity.ok(updatedCartLine);
    }


    @DeleteMapping("/cart/{user}/{name}")
    public Map<String, Boolean> deleteCartLine(@PathVariable(value = "user") String user,
                                              @PathVariable(value = "name") String name){

        return c_service.deleteCartLine(user,name);
    }

    @DeleteMapping("/cart/{user}")
    public Map<String, Boolean> deleteUserCart(@PathVariable(value = "user") String user){

        return c_service.deleteAllUserCartLines(user);
    }

}

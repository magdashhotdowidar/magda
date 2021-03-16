package com.all.Projectforall.controllers;

import com.all.Projectforall.entitys.Cart;
import com.all.Projectforall.models.CartModel;
import com.all.Projectforall.models.PrivacyModel;
import com.all.Projectforall.services.CartService;
import com.all.Projectforall.services.PrivacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/privacy")
public class PrivacyController {

    @Autowired
    private PrivacyService service;

   /* @RequestMapping("/")
    public String aa() {
        return "allah";
    }*/


    @GetMapping("/{user}/{property}")
    public CompletableFuture<ResponseEntity<PrivacyModel>>getPrivacyByUserAndProperty(@PathVariable(value = "user") String user,
                                                                                      @PathVariable(value = "property") String property) {
        return service.getPrivacyByProperty(user,property).thenApply(ResponseEntity::ok);
    }

    @PostMapping()
    public CompletableFuture<String> createPrivacy(@Valid @RequestBody PrivacyModel privacyModel) {
        return service.createPrivacy(privacyModel);
    }

    @PutMapping()
    public CompletableFuture<ResponseEntity<String>> updateProduct(@Valid @RequestBody PrivacyModel privacyModel) {
    return service.updateProperty(privacyModel).thenApply(ResponseEntity::ok);
    }


    @DeleteMapping("/{user}/{property}")
    public CompletableFuture<String> deleteCartLine(@PathVariable(value = "user") String user,
                                                    @PathVariable(value = "property") String property) {
        return service.deletePrivacy(user,property);
    }

}

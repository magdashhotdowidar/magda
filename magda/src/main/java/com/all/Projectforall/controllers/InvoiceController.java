package com.all.Projectforall.controllers;

import com.all.Projectforall.exceptions.ResourceNotFoundException;
import com.all.Projectforall.models.InvoiceModel;
import com.all.Projectforall.responses.InvoiceResponse;
import com.all.Projectforall.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @RequestMapping("/allah")
    public CompletableFuture<String> aa() {
        return CompletableFuture.completedFuture("allah");
    }

    @GetMapping("")
    public CompletableFuture<ResponseEntity<List<InvoiceModel>>> getAllInvoices(HttpServletRequest request) {
        return invoiceService.allInvoices(request.getHeader("theAdmin")).thenApply(ResponseEntity::ok);
    }

    @GetMapping("/{customer}/{date}")
    public CompletableFuture<ResponseEntity<InvoiceResponse>> getInvoiceByCustomerAndDate(@PathVariable(value = "customer") String customer,
                                                                                          @PathVariable(value = "date") String date,
                                                                                          HttpServletRequest request)
            throws ResourceNotFoundException, ParseException {

        CompletableFuture<InvoiceResponse> response = invoiceService.getInvoiceBycustomerAndDate(customer, date, request.getHeader("theAdmin"));
        return response.thenApply(ResponseEntity::ok);
    }

    @PostMapping("")
    public CompletableFuture<ResponseEntity<InvoiceModel>> createInvoice(@Valid @RequestBody InvoiceModel invoiceModel, HttpServletRequest request) {
        invoiceModel.setThe_admin(request.getHeader("theAdmin"));
        return invoiceService.save(invoiceModel).thenApply(ResponseEntity::ok);
    }

   /* @PutMapping("/{id}")
    public CompletableFuture<  ResponseEntity<RecipeModel> updateRecipe(@PathVariable(value = "id") Long recipeId,
                                                    @Valid @RequestBody RecipeModel recipeDetails) throws ResourceNotFoundException {

        final RecipeModel updatedRecipe = recipeService.updateRecipe(recipeId, recipeDetails);
        return ResponseEntity.ok(updatedRecipe);
    }*/


    @DeleteMapping("/{customer}/{date}")
    public CompletableFuture<Map<String, Boolean>> deleteInvoice(@PathVariable(value = "customer") String customer,
                                                                 @PathVariable(value = "date") String date,
                                                                 HttpServletRequest request)
            throws ResourceNotFoundException {

        return invoiceService.deleteInvoice(customer, date, request.getHeader("theAdmin"));
    }

    @DeleteMapping("")
    public CompletableFuture<Map<String, Boolean>> deleteAllInvoices(HttpServletRequest request)
            throws ResourceNotFoundException {

        return invoiceService.deleteAllInvoices(request.getHeader("theAdmin"));
    }
}

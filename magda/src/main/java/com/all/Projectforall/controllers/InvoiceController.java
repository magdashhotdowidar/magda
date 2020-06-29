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

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @RequestMapping("/allah")
    public String aa() {
        return "allah";
    }

    @GetMapping("")
    public List<InvoiceModel> getAllInvoices() {
        return invoiceService.allInvoices();
    }

    @GetMapping("/{customer}/{date}")
    public ResponseEntity<InvoiceResponse> getInvoiceByCustomerAndDate(@PathVariable(value = "customer") String customer,
                                                                    @PathVariable(value = "date") String date)
            throws ResourceNotFoundException, ParseException {

        InvoiceResponse response = invoiceService.getInvoiceBycustomerAndDate(customer, date);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("")
    public ResponseEntity<InvoiceModel> createInvoice(@Valid @RequestBody InvoiceModel invoiceModel) {
        return ResponseEntity.ok(invoiceService.save(invoiceModel));
    }

   /* @PutMapping("/{id}")
    public ResponseEntity<RecipeModel> updateRecipe(@PathVariable(value = "id") Long recipeId,
                                                    @Valid @RequestBody RecipeModel recipeDetails) throws ResourceNotFoundException {

        final RecipeModel updatedRecipe = recipeService.updateRecipe(recipeId, recipeDetails);
        return ResponseEntity.ok(updatedRecipe);
    }*/


    @DeleteMapping("/{customer}/{date}")
    public Map<String, Boolean>  deleteInvoice(@PathVariable(value = "customer") String customer,
                                               @PathVariable(value = "date")String date)
            throws ResourceNotFoundException {

        return invoiceService.deleteInvoice(customer,date);
    }

    @DeleteMapping("")
    public Map<String, Boolean> deleteAllInvoices()
            throws ResourceNotFoundException {

        return invoiceService.deleteAllInvoices();
    }
}

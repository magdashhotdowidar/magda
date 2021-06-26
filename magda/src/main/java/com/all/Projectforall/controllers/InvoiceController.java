package com.all.Projectforall.controllers;

import com.all.Projectforall.exceptions.custExcep.ResourceNotFoundException;
import com.all.Projectforall.models.InvoiceModel;
import com.all.Projectforall.responses.InvoiceResponse;
import com.all.Projectforall.services.InvoiceService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;

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

    @GetMapping("/{invoiceNo}/{date}")
    public CompletableFuture<ResponseEntity<InvoiceResponse>> getInvoiceByInvoiceNoAndDate(@PathVariable(value = "invoiceNo") int invoiceNo,
                                                                                          @PathVariable(value = "date") String date,
                                                                                          HttpServletRequest request)
            throws ResourceNotFoundException, ParseException {

        CompletableFuture<InvoiceResponse> response = invoiceService.getInvoiceByInvoiceNoAndDate(invoiceNo, date, request.getHeader("theAdmin"));
        return response.thenApply(ResponseEntity::ok);
    }

/*    @GetMapping("/{invoiceNo}/{date}/{time}")
    public CompletableFuture<ResponseEntity<InvoiceResponse>> getInvoiceByInvoiceNoAndDateAndTime(@PathVariable(value = "invoiceNo") int invoiceNo,
                                                                                           @PathVariable(value = "date") String date,
                                                                                           @PathVariable(value = "time") String time,
                                                                                           HttpServletRequest request)
            throws ResourceNotFoundException, ParseException {

        CompletableFuture<InvoiceResponse> response = invoiceService.getInvoiceByInvoiceNoAndDateAndTime(invoiceNo, date,time, request.getHeader("theAdmin"));
        return response.thenApply(ResponseEntity::ok);
    }*/

    @PostMapping("")
    public CompletableFuture<ResponseEntity<InvoiceModel>> createInvoice(@Valid @RequestBody InvoiceModel invoiceModel,
                                                                         HttpServletRequest request)
            throws IOException, JRException {
        invoiceModel.setThe_admin(request.getHeader("theAdmin"));
        return invoiceService.save(invoiceModel).thenApply(ResponseEntity::ok);
    }

   /* @PutMapping("/{id}")
    public CompletableFuture<  ResponseEntity<RecipeModel> updateRecipe(@PathVariable(value = "id") Long recipeId,
                                                    @Valid @RequestBody RecipeModel recipeDetails) throws ResourceNotFoundException {

        final RecipeModel updatedRecipe = recipeService.updateRecipe(recipeId, recipeDetails);
        return ResponseEntity.ok(updatedRecipe);
    }*/


    @DeleteMapping("/{invoiceNo}/{date}")
    public CompletableFuture<Map<String, Boolean>> deleteInvoice(@PathVariable(value = "invoiceNo") int invoiceNo,
                                                                 @PathVariable(value = "date") String date,
                                                                 HttpServletRequest request)
            throws ResourceNotFoundException {

        return invoiceService.deleteInvoice(invoiceNo, date, request.getHeader("theAdmin"));
    }

    @DeleteMapping("")
    public CompletableFuture<Map<String, Boolean>> deleteAllInvoices(HttpServletRequest request)
            throws ResourceNotFoundException {

        return invoiceService.deleteAllInvoices(request.getHeader("theAdmin"));
    }

    @GetMapping("/chartData")
    public CompletableFuture<List<Object[]>> chartData(){
        return invoiceService.chartData();
    }
}

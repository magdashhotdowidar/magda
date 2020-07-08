package com.all.Projectforall.services;

import com.all.Projectforall.entitys.InvoProduct;
import com.all.Projectforall.entitys.InvoiceA;
import com.all.Projectforall.exceptions.ResourceNotFoundException;
import com.all.Projectforall.models.InvoiceModel;
import com.all.Projectforall.repos.InvoiceRepository;
import com.all.Projectforall.responses.InvoiceResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import java.util.stream.Collectors;

@Service
public class InvoiceService {
    /* important note any response must be in model form
     specially in relationships or it wil returm  recursive infinity response
       and in relationship i must  create a model for the two table
       and in the model i determine the needed field only */

    @Autowired
    private InvoiceRepository inr;

    public List<InvoiceModel> allInvoices(String admin) {

        return inr.findAllByTheAdmin(admin).stream().map(InvoiceModel::new).collect(Collectors.toList());
    }

    public InvoiceResponse getInvoiceBycustomerAndDate(String customer, String date,String admin) throws ResourceNotFoundException, ParseException {

      /*  SimpleDateFormat simpleDateFormatIn = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZZZ");
       // String stringDate=simpleDateFormatIn.format(date);
        Date formattedDate = simpleDateFormatIn.parse(date);
        System.out.println("THE INPUT DATE(" + date + ")");*/
        List<InvoiceA> invoices = inr.findByCustomerNameAndDateAndTheAdmin(customer, date,admin)
                .orElseThrow(() -> new ResourceNotFoundException("NO INVOICE FOR :: " + customer));
        if (!invoices.isEmpty()) {
         List<InvoiceModel>invoiceModels=   invoices.stream().map(invoiceA -> new InvoiceModel(invoiceA)).collect(Collectors.toList());
            return new InvoiceResponse(invoiceModels, "THE INVOICE FOR CUSTOMER " + customer + " IS FOUNDED");
        } else {
            return new InvoiceResponse(new ArrayList<InvoiceModel>(), "THE INVOICE FOR CUSTOMER " + customer + " IS NOT FOUNDED");
        }
    }

/*    public RecipeModel updateRecipe(Long id, RecipeModel recipe) throws ResourceNotFoundException {
        Recipe oldrecipe = rr.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found for this id :: " + id));
        oldrecipe.setName(recipe.getName());
        oldrecipe.setDescription(recipe.getDescription());
        oldrecipe.setImagepath(recipe.getImagepath());
        recipe.getIngredients().forEach(ingredientModel -> oldrecipe.add_ingredient(new Ingredient(ingredientModel)));
        final Recipe updatedrecipe = rr.save(oldrecipe);
        return new RecipeModel(updatedrecipe);
    }*/

    public Map<String, Boolean> deleteInvoice(String customer, String date,String admin) throws ResourceNotFoundException {
        List<InvoiceA> invoices = inr.findByCustomerNameAndDateAndTheAdmin(customer, date,admin)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found for this id :: " + customer));
        invoices.forEach(invoiceA ->inr.delete(invoiceA) );

        Map<String, Boolean> response = new HashMap<String, Boolean>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    public Map<String, Boolean> deleteAllInvoices(String admin) throws ResourceNotFoundException {
        inr.deleteAllByTheAdmin(admin);
        Map<String, Boolean> response = new HashMap<String, Boolean>();
        response.put("all_recipes_deleted_successfully", Boolean.TRUE);
        return response;
    }

    public InvoiceModel save(InvoiceModel invoiceModel) {
     /*   String[] dates = invoiceModel.getDate().toString().split("T");
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-mm-yyyy");
      invoiceModel.setDate( simpleDateFormat.parse(dates[0]));*/
        InvoiceA invoice = new InvoiceA(invoiceModel);
        invoiceModel.getProductModels().forEach(productModel -> invoice.add_Product(new InvoProduct(productModel)));

        return new InvoiceModel(inr.save(invoice));

    }

}

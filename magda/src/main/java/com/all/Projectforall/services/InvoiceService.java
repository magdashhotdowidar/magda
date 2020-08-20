package com.all.Projectforall.services;

import com.all.Projectforall.entitys.InvoProduct;
import com.all.Projectforall.entitys.InvoiceA;
import com.all.Projectforall.exceptions.ResourceNotFoundException;
import com.all.Projectforall.jasperReports.services.ProductReportService;
import com.all.Projectforall.models.InvoiceModel;
import com.all.Projectforall.repos.InvoProductRepository;
import com.all.Projectforall.repos.InvoiceRepository;
import com.all.Projectforall.responses.InvoiceResponse;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class InvoiceService {
    /* important note any response must be in model form
     specially in relationships or it wil returm  recursive infinity response
       and in relationship i must  create a model for the two table
       and in the model i determine the needed field only */

    @Autowired
    private InvoiceRepository inr;
    @Autowired
    private ProductReportService print;
    @Autowired
    private InvoProductRepository invoProductRepository;

    public CompletableFuture<List<InvoiceModel>> allInvoices(String admin) {
        return CompletableFuture.completedFuture(inr.findAllByTheAdmin(admin).stream().map(InvoiceModel::new).collect(Collectors.toList()));
    }

    public CompletableFuture<InvoiceResponse> getInvoiceByInvoiceNoAndDate(int invoiceNo, String date, String admin)
            throws ResourceNotFoundException {

        List<InvoiceA> invoices = inr.findByInvoiceNoAndDateAndTheAdmin(invoiceNo, date, admin)
                .orElseThrow(() -> new ResourceNotFoundException("NO INVOICE FOR :: " + invoiceNo));
        if (!invoices.isEmpty()) {
            List<InvoiceModel> invoiceModels = invoices.stream().map(invoiceA -> new InvoiceModel(invoiceA)).collect(Collectors.toList());
            return CompletableFuture.completedFuture(new InvoiceResponse(invoiceModels, "THE INVOICE NO " + invoiceNo + " IS FOUNDED"));
        } else {
            return CompletableFuture.completedFuture(new InvoiceResponse(new ArrayList<InvoiceModel>(),
                    "THE INVOICE NO " + invoiceNo + " IS NOT FOUNDED"));
        }
    }

   /* public CompletableFuture<InvoiceResponse> getInvoiceByInvoiceNoAndDateAndTime(int invoiceNo, String date, String time, String admin)
            throws ResourceNotFoundException {

        List<InvoiceA> invoices = inr.findByInvoiceNoAndDateAndTimeLikeAndTheAdmin(invoiceNo, date, time, admin)
                .orElseThrow(() -> new ResourceNotFoundException("NO INVOICE FOR :: " + invoiceNo));
        if (!invoices.isEmpty()) {
            List<InvoiceModel> invoiceModels = invoices.stream().map(invoiceA -> new InvoiceModel(invoiceA)).collect(Collectors.toList());
            return CompletableFuture.completedFuture(new InvoiceResponse(invoiceModels, "THE INVOICE NO " + invoiceNo + " IS FOUNDED"));
        } else {
            return CompletableFuture.completedFuture(new InvoiceResponse(new ArrayList<InvoiceModel>(),
                    "THE INVOICE NO " + invoiceNo + " IS NOT FOUNDED"));
        }
    }*/

    public CompletableFuture<Map<String, Boolean>> deleteInvoice(int invoiceNo, String date, String admin) throws ResourceNotFoundException {
        List<InvoiceA> invoices = inr.findByInvoiceNoAndDateAndTheAdmin(invoiceNo, date, admin)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found for this id :: " + invoiceNo));
        invoices.forEach(invoiceA -> inr.delete(invoiceA));

        Map<String, Boolean> response = new HashMap<String, Boolean>();
        response.put("deleted", Boolean.TRUE);
        return CompletableFuture.completedFuture(response);
    }

    @Transactional  // to prevent this exception=>No EntityManager with actual transaction available for current thread - cannot reliably process 'remove' call]
    public CompletableFuture<Map<String, Boolean>> deleteAllInvoices(String admin) throws ResourceNotFoundException {
        inr.deleteAllByTheAdmin(admin);
        Map<String, Boolean> response = new HashMap<String, Boolean>();
        response.put("all_recipes_deleted_successfully", Boolean.TRUE);
        return CompletableFuture.completedFuture(response);
    }

    public CompletableFuture<InvoiceModel> save(InvoiceModel invoiceModel) throws IOException, JRException {
        print.printInvoice(invoiceModel);
        InvoiceA invoice = new InvoiceA(invoiceModel);
        invoiceModel.getProductModels().forEach(productModel -> {
            productModel.setThe_admin(invoiceModel.getThe_admin());
            invoice.add_Product(new InvoProduct(productModel));
        });

        return CompletableFuture.completedFuture(new InvoiceModel(inr.save(invoice)));

    }

    public CompletableFuture<List<Object[]>> chartData(){
        return CompletableFuture.completedFuture(invoProductRepository.chartData());
    }

}

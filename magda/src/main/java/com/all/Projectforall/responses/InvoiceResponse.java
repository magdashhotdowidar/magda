package com.all.Projectforall.responses;

import com.all.Projectforall.models.InvoiceModel;

import java.util.List;

public class InvoiceResponse {
    private List<InvoiceModel> invoices;
    private String message;

    public InvoiceResponse() {
    }

    public InvoiceResponse(List<InvoiceModel> invoices, String message) {
        this.invoices = invoices;
        this.message = message;
    }

    public List<InvoiceModel> getInvoices() {
        return invoices;
    }

    public void setInvoices(List<InvoiceModel> invoices) {
        this.invoices = invoices;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "InvoiceResponse{" +
                "invoices=" + invoices +
                ", message='" + message + '\'' +
                '}';
    }
}

package com.all.Projectforall.models;

import com.all.Projectforall.entitys.InvoiceA;

import java.util.ArrayList;
import java.util.Date;

import java.util.List;
import java.util.stream.Collectors;


public class InvoiceModel {

    private String date;
    private String time;
    private String userName;
    private int invoiceNo;
    private List<ProductModel> productModels;
    private String the_admin;

    public InvoiceModel() {
    }

    public InvoiceModel(InvoiceA invoice) {

        if (invoice != null) {
            this.date = invoice.getDate();
            this.time=invoice.getTime();
            this.userName = invoice.getUserName();
            this.invoiceNo = invoice.getInvoiceNo();
            this.the_admin=invoice.getTheAdmin();
            if (!invoice.getInvoProducts().isEmpty()) {
                this.productModels = invoice.getInvoProducts().
                        stream().map(product ->
                        new ProductModel(product)
                ).collect(Collectors.toList());
            }
        }
    }

    public InvoiceModel(String date, String userName, int invoiceNO) {
        this.date = date;
        this.userName = userName;
        this.invoiceNo = invoiceNO;
    }

    public String getThe_admin() {
        return the_admin;
    }

    public void setThe_admin(String the_admin) {
        this.the_admin = the_admin;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getInvoiceNo() {
        return invoiceNo;
    }

    public void setInvoiceNo(int invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public List<ProductModel> getProductModels() {
        if(productModels==null)productModels=new ArrayList<>();
        return productModels;
    }

    public void setProductModels(List<ProductModel> productModels) {
        this.productModels = productModels;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "InvoiceModel{" +
                "date='" + date + '\'' +
                ", time='" + time + '\'' +
                ", userName='" + userName + '\'' +
                ", invoiceNo=" + invoiceNo +
                ", productModels=" + productModels +
                ", the_admin='" + the_admin + '\'' +
                '}';
    }
}

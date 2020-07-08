package com.all.Projectforall.models;

import com.all.Projectforall.entitys.InvoiceA;

import java.util.ArrayList;
import java.util.Date;

import java.util.List;
import java.util.stream.Collectors;


public class InvoiceModel {

    private String date;
    private String userName;
    private String customerName;
    private List<ProductModel> productModels;
    private String the_admin;


    public InvoiceModel() {
    }

    public InvoiceModel(InvoiceA invoice) {

        if (invoice != null) {
            this.date = invoice.getDate();
            this.userName = invoice.getUserName();
            this.customerName = invoice.getCustomerName();
            this.the_admin=invoice.getTheAdmin();
            if (!invoice.getInvoProducts().isEmpty()) {
                this.productModels = invoice.getInvoProducts().
                        stream().map(product ->
                        new ProductModel(product)
                ).collect(Collectors.toList());
            }
        }
    }

    public InvoiceModel(String date, String userName, String customerName) {
        this.date = date;
        this.userName = userName;
        this.customerName = customerName;
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

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public List<ProductModel> getProductModels() {
        if(productModels==null)productModels=new ArrayList<>();
        return productModels;
    }

    public void setProductModels(List<ProductModel> productModels) {
        this.productModels = productModels;
    }

    @Override
    public String toString() {
        return "InvoiceModel{" +
                "date=" + date +
                ", userName='" + userName + '\'' +
                ", customerName='" + customerName + '\'' +
                ", productModels=" + productModels +
                '}';
    }
}

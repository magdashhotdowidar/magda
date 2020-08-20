package com.all.Projectforall.entitys;

import com.all.Projectforall.models.InvoiceModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "INVOICES")
public class InvoiceA {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String date;
    private String time;
    private String userName;
    private int invoiceNo;
    private String theAdmin;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<InvoProduct> invoProducts;

    public void add_Product(InvoProduct invoiceProduct) {
        if (invoiceProduct != null) {
            if (invoProducts == null) invoProducts = new ArrayList<>();
            invoiceProduct.setInvoice(this);//set the foreign key
            invoProducts.add(invoiceProduct);
        }
    }

    public InvoiceA() {
    }

    public InvoiceA(InvoiceModel invoice) {
        this.date = invoice.getDate();
        this.time=invoice.getTime();
        this.userName = invoice.getUserName();
        this.invoiceNo = invoice.getInvoiceNo();
        this.theAdmin=invoice.getThe_admin();
    }

    public String getTheAdmin() {
        return theAdmin;
    }

    public void setTheAdmin(String the_admin) {
        this.theAdmin = the_admin;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void setInvoiceNo(int invoiceNO) {
        this.invoiceNo = invoiceNO;
    }

    public List<InvoProduct> getInvoProducts() {
        return invoProducts;
    }

    public void setInvoProducts(List<InvoProduct> invoProducts) {
        this.invoProducts = invoProducts;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "InvoiceA{" +
                "id=" + id +
                ", date='" + date + '\'' +
                ", time='" + time + '\'' +
                ", userName='" + userName + '\'' +
                ", invoiceNo=" + invoiceNo +
                ", theAdmin='" + theAdmin + '\'' +
                '}';
    }
}

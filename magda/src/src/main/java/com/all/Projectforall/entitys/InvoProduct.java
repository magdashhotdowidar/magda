package com.all.Projectforall.entitys;

import com.all.Projectforall.models.ProductModel;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;

@Entity
@Table(name = "INVOICE_PRODUCTS")
public class InvoProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private int amount;
    private double price;
    private String theAdmin;

/*    @Transient
    private MultipartFile file;*/

       @ManyToOne
    @JoinColumn(name = "invoice_id")
    private InvoiceA invoice;


    public InvoProduct() {
    }

    public InvoProduct(ProductModel productModel) {
        this.name = productModel.getName();
        this.amount = productModel.getAmount();
        this.price=productModel.getPrice();
        this.theAdmin=productModel.getThe_admin();
       // this.file=productModel.getFile();
    }

    public String getTheAdmin() {
        return theAdmin;
    }

    public void setTheAdmin(String the_admin) {
        this.theAdmin = the_admin;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public InvoiceA getInvoice() {
        return invoice;
    }

    public void setInvoice(InvoiceA invoice) {
        this.invoice = invoice;
    }
/*
    @Transient
    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    @Override
    public String toString() {
        return "InvoProduct{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", amount=" + amount +
                ", price=" + price +
                '}';
    }*/
}

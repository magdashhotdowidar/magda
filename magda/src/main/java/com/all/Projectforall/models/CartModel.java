package com.all.Projectforall.models;

import com.all.Projectforall.entitys.Cart;

public class CartModel {

    private String name;
    private String user;
    private int amount;
    private double price;
    private double total;
    private String imageName;
    private String the_admin;

    public CartModel() {
    }

    public CartModel(String name, int amount, double price, double total, String imageName,String user) {
        this.name = name;
        this.amount = amount;
        this.price = price;
        this.total = total;
        this.imageName = imageName;
        this.user=user;
    }

    public CartModel(Cart cart) {
        this.name = cart.getName();
        this.amount = cart.getAmount();
        this.price = cart.getPrice();
        this.imageName = cart.getImageName();
        this.total = cart.getTotal();
        this.user=cart.getUser();
        this.the_admin=cart.getThe_admin();
    }

    public String getThe_admin() {
        return the_admin;
    }

    public void setThe_admin(String the_admin) {
        this.the_admin = the_admin;
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

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "CartModel{" +
                "name='" + name + '\'' +
                ", user='" + user + '\'' +
                ", amount=" + amount +
                ", price=" + price +
                ", total=" + total +
                ", imageName='" + imageName + '\'' +
                '}';
    }
}

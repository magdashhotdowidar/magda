package com.all.Projectforall.entitys;


import com.all.Projectforall.models.CartModel;
import com.all.Projectforall.models.ProductModel;

import javax.persistence.*;


@Entity
@Table(name = "carts")
public class Cart {
    /* important important note in toString method do not customize any fields you do not want to view like objects fields(relationship ) or files (multiPartFile )   */
/* important note if alter the entity class and add fields modify the table in the data base or put @Transient on the getter not on the variable
 or else you wil get the error => java.base@13.0.2/jdk.internal.misc.Unsafe.park(Native Method) .....This is very likely to create a memory leak. Stack trace of thread  */

    private int id;
    private String name;
    private String user;
    private int amount;
    private double price;
    private double total;
    private String imageName;
    private String the_admin;

    public Cart() {
    }

    public Cart(int id, String name, int amount, double price, double total, String imageName,String user) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.price = price;
        this.total = total;
        this.imageName = imageName;
        this.user=user;
    }

    public Cart(CartModel cartModel) {
        this.name = cartModel.getName();
        this.amount = cartModel.getAmount();
        this.price = cartModel.getPrice();
        this.imageName = cartModel.getImageName();
        this.total=cartModel.getTotal();
        this.user=cartModel.getUser();
        this.the_admin=cartModel.getThe_admin();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name = "product_Name", nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "product_Amount", nullable = false)
    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Column(name = "product_Price", nullable = false)
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Column(name = "Image_Name", nullable = false)
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

    @Column(name = "Cart_User", nullable = false)
    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getThe_admin() {
        return the_admin;
    }

    public void setThe_admin(String the_admin) {
        this.the_admin = the_admin;
    }


    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", user='" + user + '\'' +
                ", amount=" + amount +
                ", price=" + price +
                ", total=" + total +
                ", imageName='" + imageName + '\'' +
                '}';
    }
}

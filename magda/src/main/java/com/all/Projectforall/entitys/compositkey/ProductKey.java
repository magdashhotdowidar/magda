package com.all.Projectforall.entitys.compositkey;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProductKey implements Serializable {

    private String name;
    private String theAdmin;

    public ProductKey() {
    }

    public ProductKey(String name, String theAdmin) {
        this.name = name;
        this.theAdmin = theAdmin;
    }

    // @Column(name = "product_Name", nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTheAdmin() {
        return theAdmin;
    }

    public void setTheAdmin(String the_admin) {
        this.theAdmin = the_admin;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProductKey)) return false;
        ProductKey that = (ProductKey) o;
        return Objects.equals(getName(), that.getName()) &&
                Objects.equals(getTheAdmin(), that.getTheAdmin());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName(), getTheAdmin());
    }

    @Override
    public String toString() {
        return "ProductKey{" +
                "name='" + name + '\'' +
                ", theAdmin='" + theAdmin + '\'' +
                '}';
    }
}

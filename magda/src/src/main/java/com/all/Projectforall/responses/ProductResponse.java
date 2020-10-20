package com.all.Projectforall.responses;

import com.all.Projectforall.models.ProductModel;

import java.util.List;

public class ProductResponse {
    private List<ProductModel> products;
    private Long invoicesCount;

    public ProductResponse() {
    }

    public ProductResponse(List<ProductModel> products, Long invoicesCount) {
        this.products = products;
        this.invoicesCount = invoicesCount;
    }

    public List<ProductModel> getProducts() {
        return products;
    }

    public void setProducts(List<ProductModel> products) {
        this.products = products;
    }

    public Long getInvoicesCount() {
        return invoicesCount;
    }

    public void setInvoicesCount(Long invoicesCount) {
        this.invoicesCount = invoicesCount;
    }

    @Override
    public String toString() {
        return "ProductResponse{" +
                "products=" + products +
                ", invoicesCount=" + invoicesCount +
                '}';
    }
}

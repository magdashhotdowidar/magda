package com.all.Projectforall.services;


import com.all.Projectforall.entitys.Cart;
import com.all.Projectforall.models.CartModel;
import com.all.Projectforall.repos.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository c_repo;

    public List<CartModel> allCartLines() {
        return c_repo.findAll().stream().map(cartLine -> new CartModel(cartLine)).collect(Collectors.toList());

    }

    public List<Cart> getCartLineByUserAndProductName(String user, String productName) {
        return c_repo.findByUserAndName(user, productName);
    }

    public List<CartModel> getCartLineByUser(String user) {
        return c_repo.findByUser(user).stream().map(CartModel::new).collect(Collectors.toList());
    }


    public CartModel updateCart(String user, String productName, CartModel cartDetails) {

        List<Cart> carts = c_repo.findByUserAndName(user, productName);
        Cart cart = carts.get(0);
        cart.setName(cartDetails.getName());
        cart.setImageName(cartDetails.getImageName());
        cart.setAmount(cartDetails.getAmount());
        cart.setPrice(cartDetails.getPrice());
        cart.setTotal(cartDetails.getTotal());
        cart.setUser(cartDetails.getUser());

        final Cart updatedCartLine = c_repo.save(cart);
        return new CartModel(updatedCartLine);
    }

    public Map<String, Boolean> deleteCartLine(String user, String productName) {
        List<Cart> carts = c_repo.findByUserAndName(user, productName);
        Cart cart = carts.get(0);
        c_repo.delete(cart);
        Map<String, Boolean> response = new HashMap<String, Boolean>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    public Map<String, Boolean> deleteAllUserCartLines(String user) {
        List<Cart> carts = c_repo.findByUser(user);
        c_repo.deleteAll(carts);
        Map<String, Boolean> response = new HashMap<String, Boolean>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    public CartModel save(CartModel cart) {
        return new CartModel(c_repo.save(new Cart(cart)));

    }

}

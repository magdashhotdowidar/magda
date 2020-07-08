package com.all.Projectforall.services;


import com.all.Projectforall.entitys.Category;
import com.all.Projectforall.entitys.Product;
import com.all.Projectforall.exceptions.ResourceNotFoundException;
import com.all.Projectforall.models.CategoryModel;
import com.all.Projectforall.models.ProductModel;
import com.all.Projectforall.repos.CategoryRepository;
import com.all.Projectforall.repos.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository crepo;

    public List<CategoryModel> allCategories(String admin) {
        return  crepo.findAllByTheAdmin(admin).stream().map(category -> new CategoryModel(category)).collect(Collectors.toList());

    }



    public Map<String, Boolean> deleteCategory(String name,String admin)
            throws ResourceNotFoundException {
        Category category = crepo.findByNameAndTheAdmin(name,admin)
                .orElseThrow(() -> new ResourceNotFoundException("product not found  "));
        crepo.delete(category);
        Map<String, Boolean> response = new HashMap<String, Boolean>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    public CategoryModel save(CategoryModel categoryModel) {
        return new CategoryModel(crepo.save(new Category(categoryModel)));

    }

    public List<String> selectcategorynames(String admin) {
        return crepo.selectNames(admin);
    }


}

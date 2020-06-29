package com.all.Projectforall.controllers;

import com.all.Projectforall.configuration.FileUpload;
import com.all.Projectforall.entitys.Product;
import com.all.Projectforall.exceptions.ResourceNotFoundException;
import com.all.Projectforall.models.CategoryModel;
import com.all.Projectforall.models.ProductModel;
import com.all.Projectforall.services.CategoryService;
import com.all.Projectforall.services.ProductService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/category/")
public class CategoryController {
    @Autowired
    private CategoryService cserv;

   /* @RequestMapping("/")
    public String aa() {
        return "allah";
    }*/

    @GetMapping()
    public List<CategoryModel> getAllCategories() {
        return cserv.allCategories();
    }

    @PostMapping()
    public CategoryModel createCategory(@RequestBody CategoryModel categoryModel) {
        return cserv.save(categoryModel);
    }


    @DeleteMapping("{name}")
    public Map<String, Boolean> deleteCategory(@PathVariable(value = "name") String name)
            throws ResourceNotFoundException {

        return cserv.deleteCategory(name);
    }

    @GetMapping("names")
    public List<String> selectnames() {
        return cserv.selectcategorynames();
    }


}

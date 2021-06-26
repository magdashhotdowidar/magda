package com.all.Projectforall.controllers;

import com.all.Projectforall.exceptions.custExcep.ResourceNotFoundException;
import com.all.Projectforall.models.CategoryModel;
import com.all.Projectforall.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
    public List<CategoryModel> getAllCategories(HttpServletRequest request) {
        return cserv.allCategories(request.getHeader("theAdmin"));
    }

    @PostMapping()
    public CategoryModel createCategory(@RequestBody CategoryModel categoryModel,HttpServletRequest request) {
        categoryModel.setTheAdmin(request.getHeader("theAdmin"));
        return cserv.save(categoryModel);
    }


    @DeleteMapping("{name}")
    public Map<String, Boolean> deleteCategory(@PathVariable(value = "name") String name,HttpServletRequest request)
            throws ResourceNotFoundException {

        return cserv.deleteCategory(name,request.getHeader("theAdmin"));
    }

    @GetMapping("names")
    public List<String> selectnames(HttpServletRequest request) {
        return cserv.selectcategorynames(request.getHeader("theAdmin"));
    }


}

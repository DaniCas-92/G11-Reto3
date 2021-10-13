/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.service;

import com.danielcastrillon.motoG11.entities.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author tec_danielc
 */

@RestController
@RequestMapping(value="/api/Category")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;
    
    @GetMapping("/all")
      public List<Category> getCategories() {return categoryService.getAll();}

    @GetMapping("/{id}")
      public Optional<Category> getCategory(@PathVariable("id") int idCategory) {
          return categoryService.getCategory(idCategory);
      }
      
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
      public Category save(@RequestBody Category category) {return categoryService.save(category);}
    
}

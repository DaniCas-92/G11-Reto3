/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.service;

import com.danielcastrillon.motoG11.dao.CategoryRepository;
import com.danielcastrillon.motoG11.entities.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author tec_danielc
 */

@Service
public class CategoryService {
    
    @Autowired
    CategoryRepository categoryRepository;
    
    public List<Category> getAll() {return (List<Category>) categoryRepository.getAll();};
  
    public Optional<Category> getCategory(int id) {return categoryRepository.getCategory(id);};
  
    public Category save(Category category) { 
       if (category.getId()== null){
           return categoryRepository.save(category);
       }
       else
       {
          Optional<Category> ca =  categoryRepository.getCategory(category.getId());
          if (ca.isEmpty()){
              return categoryRepository.save(category);
          }
          else
          {
              return category;
          }
       }
 
    }
    
}

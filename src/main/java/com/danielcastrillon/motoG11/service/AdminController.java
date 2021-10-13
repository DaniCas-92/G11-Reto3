/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.service;

import com.danielcastrillon.motoG11.entities.Admin;
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
@RequestMapping(value="/api/Admin")
public class AdminController {
    
    @Autowired
    private AdminService adminService;
    
    @GetMapping("/all")
      public List<Admin> getAdmins() {return adminService.getAll();}

    @GetMapping("/{id}")
      public Optional<Admin> getAdmin(@PathVariable("id") int idAdmin) {
          return adminService.getAdmin(idAdmin);
      }
      
    @PostMapping("/save")    
    @ResponseStatus(HttpStatus.CREATED)
      public Admin save(@RequestBody Admin admin) {return adminService.save(admin);}
    
}

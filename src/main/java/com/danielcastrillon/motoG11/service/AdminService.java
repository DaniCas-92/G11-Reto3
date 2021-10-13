/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.service;

import com.danielcastrillon.motoG11.dao.AdminRepository;
import com.danielcastrillon.motoG11.entities.Admin;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author tec_danielc
 */

@Service
public class AdminService {
    
    @Autowired
    AdminRepository adminRepository;
    
    public List<Admin> getAll() {return (List<Admin>) adminRepository.getAll();};
  
    public Optional<Admin> getAdmin(int id) {return adminRepository.getAdmin(id);};
  
    public Admin save(Admin admin) { 
       if (admin.getIdAdmin()== null){
           return adminRepository.save(admin);
       }
       else
       {
          Optional<Admin> ad =  adminRepository.getAdmin(admin.getIdAdmin());
          if (ad.isEmpty()){
              return adminRepository.save(admin);
          }
          else
          {
              return admin;
          }
       }
 
    }
    
}

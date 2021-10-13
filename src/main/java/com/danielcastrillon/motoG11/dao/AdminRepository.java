/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.dao;

import com.danielcastrillon.motoG11.entities.Admin;
import com.danielcastrillon.motoG11.entities.AdminCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author tec_danielc
 */

@Repository
public class AdminRepository {
    
    @Autowired
    private AdminCrud adminCrudRepository;
    
    public List<Admin> getAll() {return (List<Admin>) adminCrudRepository.findAll();}
    
    public Optional<Admin> getAdmin(int idAdmin) {return adminCrudRepository.findById(idAdmin);}
    
    public Admin save(Admin admin) {return adminCrudRepository.save(admin);}
}

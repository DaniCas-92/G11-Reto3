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

    public List<Admin> getAll() {
        return (List<Admin>) adminRepository.getAll();
    }
  
    public Optional<Admin> getAdmin(int id) {
        return adminRepository.getAdmin(id);
    }
  
    public Admin save(Admin admin) {
        if (admin.getIdAdmin() == null) {
            return adminRepository.save(admin);
        } else {
            Optional<Admin> ad = adminRepository.getAdmin(admin.getIdAdmin());
            if (ad.isEmpty()) {
                return adminRepository.save(admin);
            } else {
                return admin;
            }
        }

    }

    public Admin update(Admin admin) {
        if (admin.getIdAdmin() != null) {
            Optional<Admin> e = adminRepository.getAdmin(admin.getIdAdmin());
            if (!e.isEmpty()) {
                if (admin.getName() != null) {
                    e.get().setName(admin.getName());
                }
                if (admin.getPassword()!= null) {
                    e.get().setPassword(admin.getPassword());
                }
                /*if (admin.getEmail() != null) {
                    e.get().setEmail(admin.getEmail());
                }*/
                adminRepository.save(e.get());
                return e.get();
            } else {
                return admin;
            }
        } else {
            return admin;
        }
    }

    public boolean deleteAdmin(int id) {

        /**
         * alternativa de Delete Optional<Category> category =
         * categoryRepository.getCategory(id); if (category.isEmpty()){ return
         * false; } else { categoryRepository.delete(category.get()); return
         * true; }
         */
        Boolean aBoolean = getAdmin(id).map(
                admin -> {
                    adminRepository.delete(admin);
                    return true;
                }).orElse(false);
        return aBoolean;

    }

}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.service;

import com.danielcastrillon.motoG11.dao.MotorbikeRepository;
import com.danielcastrillon.motoG11.entities.Motorbike;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author tec_danielc
 */

@Service
public class MotorbikeService {
    @Autowired
    MotorbikeRepository motorbikeRepository;
    
    public List<Motorbike> getAll() {return (List<Motorbike>) motorbikeRepository.getAll();}
  
    public Optional<Motorbike> getMotorbike(int id) {return motorbikeRepository.getMotorbike(id);}
  
    public Motorbike save(Motorbike motorbike) { 
       if (motorbike.getId()== null){
           return motorbikeRepository.save(motorbike);
       }
       else
       {
          Optional<Motorbike> mo =  motorbikeRepository.getMotorbike(motorbike.getId());
          if (mo.isEmpty()){
              return motorbikeRepository.save(motorbike);
          }
          else
          {
              return motorbike;
          }
       }
 
    }
    
    /*public Motorbike update(Motorbike motorbike) { 
       if (motorbike.getId()!= null){
          Optional<Motorbike> mo =  motorbikeRepository.getMotorbike(motorbike.getId());
          if (!mo.isEmpty()){
              if(motorbike.getId()!= null){
                  mo.get().setName(motorbike.getName());
                  mo.get().setBrand(motorbike.getBrand());
                  mo.get().setDescription(motorbike.getDescription());
              }
              return motorbikeRepository.save(mo.get());
          }
          else
          {
              return motorbike;
          }
       } else {
           return motorbike;
       }
 
    }
    
    public boolean deleteMotorbike(int id){
        Boolean aBoolean = getMotorbike(id).map(
                motorbike->{
                    motorbikeRepository.delete(motorbike);
                    return true;
                }
        ).orElse(false);
        return aBoolean;
    }*/
}

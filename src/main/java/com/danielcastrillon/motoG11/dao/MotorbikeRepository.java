/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.dao;

import com.danielcastrillon.motoG11.entities.Motorbike;
import com.danielcastrillon.motoG11.entities.MotorbikeCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author tec_danielc
 */
@Repository
public class MotorbikeRepository {
    
    @Autowired
    private MotorbikeCrud motoCrudRepository;
    
    public List<Motorbike> getAll() {return (List<Motorbike>) motoCrudRepository.findAll();}
    
    public Optional<Motorbike> getMotorbike(int id) {return motoCrudRepository.findById(id);}
    
    public Motorbike save(Motorbike motorbike) {return motoCrudRepository.save(motorbike);}
    
    public void delete(Motorbike motorbike){motoCrudRepository.delete(motorbike);}
    
}

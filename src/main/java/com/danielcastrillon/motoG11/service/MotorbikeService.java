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

    public List<Motorbike> getAll() {
        return (List<Motorbike>) motorbikeRepository.getAll();
    }

    public Optional<Motorbike> getMotorbike(int id) {
        return motorbikeRepository.getMotorbike(id);
    }

    public Motorbike save(Motorbike motorbike) {
        if (motorbike.getId() == null) {
            return motorbikeRepository.save(motorbike);
        } else {
            Optional<Motorbike> mo = motorbikeRepository.getMotorbike(motorbike.getId());
            if (mo.isEmpty()) {
                return motorbikeRepository.save(motorbike);
            } else {
                return motorbike;
            }
        }

    }

    public Motorbike update(Motorbike motorbike) {
        if (motorbike.getId() != null) {
            Optional<Motorbike> mo = motorbikeRepository.getMotorbike(motorbike.getId());
            if (!mo.isEmpty()) {
                if (motorbike.getName()!= null) {
                    mo.get().setName(motorbike.getName());
                }
                if (motorbike.getBrand()!= null) {
                    mo.get().setBrand(motorbike.getBrand());
                }
                if (motorbike.getYear()!= null) {
                    mo.get().setYear(motorbike.getYear());
                }
                if (motorbike.getDescription() != null) {
                    mo.get().setDescription(motorbike.getDescription());
                }
                /*if (motorbike.getCategory()!= null) {
                    mo.get().setCategory(motorbike.getCategory());
                }
                if (motorbike.getMessages()!= null) {
                    mo.get().setMessages(motorbike.getMessages());
                }
                if (motorbike.getReservations()!= null) {
                    mo.get().setReservations(motorbike.getReservations());
                }*/
                return motorbikeRepository.save(mo.get());
            } else {
                return motorbike;
            }
        } else {
            return motorbike;
        }

    }

    public boolean deleteMotorbike(int id) {
        /**
         * alternativa de Delete Optional<Category> category =
         * categoryRepository.getCategory(id); if (category.isEmpty()){ return
         * false; } else { categoryRepository.delete(category.get()); return
         * true; }
         */
        return getMotorbike(id).map(
                motorbike -> {
                    motorbikeRepository.delete(motorbike);
                    return true;
                }).orElse(false);
    }
}

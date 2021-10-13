/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.dao;

import com.danielcastrillon.motoG11.entities.Reservation;
import com.danielcastrillon.motoG11.entities.ReservationCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author tec_danielc
 */

@Repository
public class ReservationRepository {
    
    @Autowired
    private ReservationCrud reservationCrudRepository;
    
    public List<Reservation> getAll() {return (List<Reservation>) reservationCrudRepository.findAll();}
    
    public Optional<Reservation> getReservation(int idReservation) {return reservationCrudRepository.findById(idReservation);}
    
    public Reservation save(Reservation reservation) {return reservationCrudRepository.save(reservation);}
}

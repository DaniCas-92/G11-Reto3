/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.service;

import com.danielcastrillon.motoG11.dao.ReservationRepository;
import com.danielcastrillon.motoG11.entities.Reservation;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author tec_danielc
 */

@Service
public class ReservationService {
    
    @Autowired
    ReservationRepository reservationRepository;
    
    public List<Reservation> getAll() {return (List<Reservation>) reservationRepository.getAll();};
  
    public Optional<Reservation> getReservation(int idReservation) {return reservationRepository.getReservation(idReservation);};
  
    public Reservation save(Reservation reservation) { 
       if (reservation.getIdReservation()== null){
           return reservationRepository.save(reservation);
       }
       else
       {
          Optional<Reservation> re =  reservationRepository.getReservation(reservation.getIdReservation());
          if (re.isEmpty()){
              return reservationRepository.save(reservation);
          }
          else
          {
              return reservation;
          }
       }
 
    }

    public Reservation update(Reservation reservation) {
        if (reservation.getIdReservation()!= null) {
            Optional<Reservation> r = reservationRepository.getReservation(reservation.getIdReservation());
            if (!r.isEmpty()) {
                if (reservation.getStartDate()!= null) {
                    r.get().setStartDate(reservation.getStartDate());
                }
                if (reservation.getDevolutionDate()!= null) {
                    r.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if (reservation.getStatus()!= null) {
                    r.get().setStatus(reservation.getStatus());
                }
                /*if (reservation.getMotorbike()!= null) {
                    r.get().setMotorbike(reservation.getMotorbike());
                }
                if (reservation.getClient()!= null) {
                    r.get().setClient(reservation.getClient());
                }
                if (reservation.getScore()!= null) {
                    r.get().setScore(reservation.getScore());
                }
                if (motorbike.getReservations()!= null) {
                    mo.get().setReservations(motorbike.getReservations());
                }*/
                return reservationRepository.save(r.get());
            } else {
                return reservation;
            }
        } else {
            return reservation;
        }

    }

    public boolean deleteReservation(int id) {
        /**
         * alternativa de Delete Optional<Category> category =
         * categoryRepository.getCategory(id); if (category.isEmpty()){ return
         * false; } else { categoryRepository.delete(category.get()); return
         * true; }
         */
        Boolean aBoolean = getReservation(id).map(
                reservation -> {
                    reservationRepository.delete(reservation);
                    return true;
                }).orElse(false);
        return aBoolean;
    }
}

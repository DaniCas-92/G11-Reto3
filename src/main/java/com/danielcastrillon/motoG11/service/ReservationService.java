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
 * Esta clase contiene los métodos para el servicio de una reservación
 * @author tec_danielc
 * @version 1.0
 */

@Service
public class ReservationService {
    
    /*
    * Objeto de la clase ReservationRepository
    */
    @Autowired
    ReservationRepository reservationRepository;
    
    /**
     * Método que retorna una lista de reservaciones
     * @return List<Reservation>  
     */
    public List<Reservation> getAll() {return (List<Reservation>) reservationRepository.getAll();};
  
    /**
     * Método que retorna una reservación según el id
     * @param idReservation
     * @return Optional<Reservation>
     */
    public Optional<Reservation> getReservation(int idReservation) {return reservationRepository.getReservation(idReservation);};
  
    /**
     * Método que hace el llamado para almacenar una reserva
     * @param reservation
     * @return Reservation
     */
    public Reservation save(Reservation reservation) { 
       if (reservation.getIdReservation()== null){
           return reservationRepository.save(reservation);
       }
       else
       {
          Optional<Reservation> reser =  reservationRepository.getReservation(reservation.getIdReservation());
          if (reser.isEmpty()){
              return reservationRepository.save(reservation);
          }
          else
          {
              return reservation;
          }
       }
 
    }

    /**
     * Método que actualiza una reserva solicitada
     * @param reservation
     * @return 
     */
    public Reservation update(Reservation reservation) {
        if (reservation.getIdReservation()!= null) {
            Optional<Reservation> reser = reservationRepository.getReservation(reservation.getIdReservation());
            if (!reser.isEmpty()) {
                if (reservation.getStartDate()!= null) {
                    reser.get().setStartDate(reservation.getStartDate());
                }
                if (reservation.getDevolutionDate()!= null) {
                    reser.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if (reservation.getStatus()!= null) {
                    reser.get().setStatus(reservation.getStatus());
                }
                return reservationRepository.save(reser.get());
            } else {
                return reservation;
            }
        } else {
            return reservation;
        }

    }

    /**
     * Método que elimina una reserva según el id
     * @param idReservation
     * @return 
     */
    public boolean deleteReservation(int idReservation) {
        /**
         * alternativa de Delete Optional<Category> category =
         * categoryRepository.getCategory(id); if (category.isEmpty()){ return
         * false; } else { categoryRepository.delete(category.get()); return
         * true; }
         */
        Boolean aBoolean = getReservation(idReservation).map(
                reservation -> {
                    reservationRepository.delete(reservation);
                    return true;
                }).orElse(false);
        return aBoolean;
    }
}

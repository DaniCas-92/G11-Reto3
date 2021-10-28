/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.service;

import com.danielcastrillon.motoG11.dao.ReservationRepository;
import com.danielcastrillon.motoG11.entities.Reservation;
import com.danielcastrillon.motoG11.reports.CountClients;
import com.danielcastrillon.motoG11.reports.StatusReservas;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
    
    /**
     * Objeto de la clase ReservationRepository
     */
    @Autowired
    ReservationRepository resRepository;
    
    /**
     * Método que retorna una lista de reservaciones
     * @return  
     */
    public List<Reservation> getAll() {return (List<Reservation>) resRepository.getAll();};
  
    /**
     * Método que retorna una reservación según el id
     * @param idReservation
     * @return
     */
    public Optional<Reservation> getReservation(int idReservation) {return resRepository.getReservation(idReservation);};
  
    /**
     * Método que hace el llamado para almacenar una reserva
     * @param reservation
     * @return
     */
    public Reservation save(Reservation reservation) { 
       if (reservation.getIdReservation()== null){
           return resRepository.save(reservation);
       }
       else
       {
          Optional<Reservation> reser =  resRepository.getReservation(reservation.getIdReservation());
          if (reser.isEmpty()){
              return resRepository.save(reservation);
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
            Optional<Reservation> reser = resRepository.getReservation(reservation.getIdReservation());
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
                return resRepository.save(reser.get());
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
        return getReservation(idReservation).map(
                reservation -> {
                    resRepository.delete(reservation);
                    return true;
                }).orElse(false);
    }
    
    /**
     * Método que cuenta Reservascompletadas vs canceladas
     * @return 
     */
    public StatusReservas getReportStatusReservation(){
        List<Reservation> completed = resRepository.reservationStatus("completed");
        List<Reservation> cancelled = resRepository.reservationStatus("cancelled");
        return new StatusReservas(completed.size(), cancelled.size());
    }
    
    /**
     * Método que hace el conteo de reservas por un intervalo de tiempo
     * @param dateA
     * @param dateB
     * @return 
     */
    public List<Reservation> getReportDateReservation(String dateA, String dateB){
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date datoUno = new Date();
        Date datoDos = new Date();
        
        try{
            datoUno = parser.parse(dateA);
            datoDos = parser.parse(dateB);
        } catch(ParseException evt){
            evt.printStackTrace();
        }
        if(datoUno.before(datoDos)){
            return resRepository.reservationDate(datoUno, datoDos);
        } else{
            return new ArrayList<>();
        }
    }
    
    /**
     * Método que genera el top de los mejores clientes
     * @return 
     */
    public List<CountClients> servicioTopClients(){
        return resRepository.getTopClients();
    } 
}

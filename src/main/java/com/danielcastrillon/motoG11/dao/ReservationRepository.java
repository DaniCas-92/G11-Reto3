/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.dao;

import com.danielcastrillon.motoG11.entities.Client;
import com.danielcastrillon.motoG11.entities.Reservation;
import com.danielcastrillon.motoG11.entities.ReservationCrud;
import com.danielcastrillon.motoG11.reports.CountClients;
import java.util.ArrayList;
import java.util.Date;
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
    
    public void delete(Reservation reservation) {reservationCrudRepository.delete(reservation);}
    
    public List<Reservation> reservationStatus(String status){return reservationCrudRepository.findAllByStatus(status);}
    
    public List<Reservation> reservationDate(Date a, Date b){return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(a, b);}
    
    public List<CountClients> getTopClients(){
        List<CountClients> res = new ArrayList<>();
        List<Object[]>  report = reservationCrudRepository.countTotalReservationsByClient();
        for (int i = 0; i < report.size(); i++) {
            res.add(new CountClients((Long)report.get(i)[1],(Client)report.get(i)[0]));
        }
        return res;
    }
}

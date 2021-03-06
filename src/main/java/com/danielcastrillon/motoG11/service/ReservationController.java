/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.service;

import com.danielcastrillon.motoG11.entities.Reservation;
import com.danielcastrillon.motoG11.reports.CountClients;
import com.danielcastrillon.motoG11.reports.StatusReservas;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author tec_danielc
 */

@RestController
@RequestMapping(value="/api/Reservation")
public class ReservationController {
    
    @Autowired
    private ReservationService reservationService;
    
    @GetMapping("/all")
    public List<Reservation> getReservations() {return reservationService.getAll();}

    @GetMapping("/{id}")
    public Optional<Reservation> getReservation(@PathVariable("id") int reservationId) {
        return reservationService.getReservation(reservationId);
    }
      
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation reservation) {return reservationService.save(reservation);}


    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED) 
    public Reservation update(@RequestBody Reservation reservation) {return reservationService.update(reservation);}


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") int reservationId) {reservationService.deleteReservation(reservationId);}
    
    
    @GetMapping("/report-status")
    public StatusReservas getReservation(){
        return reservationService.getReportStatusReservation();
    }
    
    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
    public List<Reservation> getReservationDate(@PathVariable("dateOne") String dateOne, @PathVariable("dateTwo") String dateTwo){
        return reservationService.getReportDateReservation(dateOne, dateTwo);
    }
    
    @GetMapping("/report-clients")
    public List<CountClients> getClients(){
        return reservationService.servicioTopClients();
    }
}

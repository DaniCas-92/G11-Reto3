/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.entities;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author tec_danielc
 */

@Repository
public interface ReservationCrud extends CrudRepository<Reservation, Integer>{
    
    public List<Reservation> findAllByStatus(String status);
    
    public List<Reservation> findAllByStartDateAfterAndStartDateBefore(Date dateOne, Date dateTwo);
    
    //SELECT client_id, count(*) AS "total" FROM reservation GROUP BY client_id ORDER BY total DESC;
    @Query("SELECT c.client, COUNT(c.client) FROM Reservation AS c  GROUP BY c.client ORDER BY COUNT(c.client) DESC")
    public List<Object[]> countTotalReservationsByClient();
}

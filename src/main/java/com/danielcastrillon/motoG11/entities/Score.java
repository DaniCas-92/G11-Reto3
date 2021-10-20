/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author tec_danielc
 */

@Entity
@Table(name="score")
public class Score implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idScore")
    private Integer idScore;
    
    @Column(name="messageText")
    private String messageText;
    
    @Column(name="stars")
    private Integer stars;
    
    @OneToOne
    @JoinColumn (name="reservation_id")
    @JsonIgnoreProperties("score")
    private Reservation reservation;

    /**
     * @return the idScore
     */
    public Integer getIdScore() {
        return idScore;
    }

    /**
     * @param idScore the idScore to set
     */
    public void setIdScore(Integer idScore) {
        this.idScore = idScore;
    }

    /**
     * @return the stars
     */
    public Integer getStars() {
        return stars;
    }

    /**
     * @param stars the stars to set
     */
    public void setStars(Integer stars) {
        this.stars = stars;
    }

    /**
     * @return the messageText
     */
    public String getMessageText() {
        return messageText;
    }

    /**
     * @param messageText the messageText to set
     */
    public void setMessageText(String messageText) {
        this.messageText = messageText;
    } 

    /**
     * @return the reservation
     */
    public Reservation getReservation() {
        return reservation;
    }

    /**
     * @param reservation the reservation to set
     */
    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }
    
}

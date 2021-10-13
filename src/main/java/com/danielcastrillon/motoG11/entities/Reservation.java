/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;

/**
 *
 * @author tec_danielc
 */

@Entity
@Table(name="reservation")
public class Reservation implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idReservation")
    private Integer idReservation;
    
    @Column(name = "startDate")
    private Date startDate;
    
    @Column(name = "devolutionDate")
    private Date devolutionDate;
    
    @Column(name="status")
    private String status = "created";
    
    @ManyToOne
    @JoinColumn (name = "motorbike_id")
    @JsonIgnoreProperties({"reservations","messages:client"})
    private Motorbike motorbike;
    
    @ManyToOne
    @JoinColumn (name = "client_id")
    @JsonIgnoreProperties({"reservations","messages"})
    private Client client;
    
    @OneToOne(cascade = {CascadeType.PERSIST}, mappedBy = "reservation")
    @JsonIgnoreProperties("reservation")
    private Score score;

    /**
     * @return the idReservation
     */
    public Integer getIdReservation() {
        return idReservation;
    }

    /**
     * @param idReservation the idReservation to set
     */
    public void setIdReservation(Integer idReservation) {
        this.idReservation = idReservation;
    }

    /**
     * @return the startDate
     */
    public Date getStartDate() {
        return startDate;
    }

    /**
     * @param startDate the startDate to set
     */
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    /**
     * @return the devolutionDate
     */
    public Date getDevolutionDate() {
        return devolutionDate;
    }

    /**
     * @param devolutionDate the devolutionDate to set
     */
    public void setDevolutionDate(Date devolutionDate) {
        this.devolutionDate = devolutionDate;
    }

    /**
     * @return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @return the client
     */
    public Client getClient() {
        return client;
    }

    /**
     * @param client the client to set
     */
    public void setClient(Client client) {
        this.client = client;
    }

    /**
     * @return the motorbike
     */
    public Motorbike getMotorbike() {
        return motorbike;
    }

    /**
     * @param motorbike the motorbike to set
     */
    public void setMotorbike(Motorbike motorbike) {
        this.motorbike = motorbike;
    }

    /**
     * @return the score
     */
    public Score getScore() {
        return score;
    }

    /**
     * @param score the score to set
     */
    public void setScore(Score score) {
        this.score = score;
    }
    
}

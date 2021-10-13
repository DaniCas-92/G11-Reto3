/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author tec_danielc
 */

@Entity
@Table(name="message")
public class Message implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idMessage")
    private Integer idMessage;
    
    @Column(name = "messageText")
    private String messageText;
    
    @ManyToOne
    @JoinColumn (name = "motorbike_id")
    @JsonIgnoreProperties({"messages","reservations"})
    private Motorbike motorbike;
    
    @ManyToOne
    @JoinColumn (name = "client_id")
    @JsonIgnoreProperties({"messages","reservations"})
    private Client client;

    /**
     * @return the idMessage
     */
    public Integer getIdMessage() {
        return idMessage;
    }

    /**
     * @param idMessage the idMessage to set
     */
    public void setIdMessage(Integer idMessage) {
        this.idMessage = idMessage;
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
    
}

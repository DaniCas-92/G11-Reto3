/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.reports;

import com.danielcastrillon.motoG11.entities.Client;

/**
 *
 * @author tec_danielc
 */
public class CountClients {
    
    private Long total;
    private Client client;

    public CountClients(Long total, Client client) {
        this.total = total;
        this.client = client;
    }

    /**
     * @return the total
     */
    public Long getTotal() {
        return total;
    }

    /**
     * @param total the total to set
     */
    public void setTotal(Long total) {
        this.total = total;
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

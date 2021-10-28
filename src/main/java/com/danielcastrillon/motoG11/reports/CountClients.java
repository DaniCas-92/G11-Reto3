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
    
    
    
}

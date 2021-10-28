/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.reports;

/**
 *
 * @author tec_danielc
 */
public class StatusReservas {
    
    private int completed;
    private int cancelled;


    public StatusReservas(int completed, int cancelled) {
        this.completed = completed;
        this.cancelled = cancelled;
    }
    
    /**
     * @return the completed
     */
    public int getCompleted() {
        return completed;
    }

    /**
     * @param completed the completed to set
     */
    public void setCompleted(int completed) {
        this.completed = completed;
    }

    /**
     * @return the cancelled
     */
    public int getCancelled() {
        return cancelled;
    }

    /**
     * @param cancelled the cancelled to set
     */
    public void setCancelled(int cancelled) {
        this.cancelled = cancelled;
    }
    
    
}

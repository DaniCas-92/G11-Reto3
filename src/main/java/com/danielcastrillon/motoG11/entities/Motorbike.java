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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Esta clase contiene los atributos y metodos para el producto
 * @author tec_danielc
 * @version 1.0
 */

@Entity
@Table(name="motorbike")
public class Motorbike implements Serializable {
    
    /**
     * Variable tipo int que denota el id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    
    /**
     * Variable tipo String que denota el name
     */
    @Column(name = "name")
    private String name;
    
    /**
     * Variable tipo String que denota el brand
     */
    @Column(name = "brand")
    private String brand;
    
    /**
     * Variable tipo int que denota el year
     */
    @Column(name = "year")
    private Integer year;
    
    /**
     * Variable tipo String que denota la description
     */
    @Column(name = "description")
    private String description;
     
    /**
     * Variable tipo Category que denota category
     */
    @ManyToOne
    @JoinColumn(name="category_id")
    @JsonIgnoreProperties("motorbikes")
    private Category category;
     
    /**
     * Variable tipo Message que denota messages
     */
    @OneToMany (cascade = {CascadeType.PERSIST}, mappedBy = "motorbike")
    @JsonIgnoreProperties({"motorbike","client"})
    private List<Message> messages;
     
    /**
     * Variable tipo Message que denota reservations
     */
    @OneToMany (cascade = {CascadeType.PERSIST}, mappedBy = "motorbike")
    @JsonIgnoreProperties("motorbike")
    private List<Reservation> reservations;

    /**
     * @return the id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return the brand
     */
    public String getBrand() {
        return brand;
    }

    /**
     * @param brand the brand to set
     */
    public void setBrand(String brand) {
        this.brand = brand;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the year
     */
    public Integer getYear() {
        return year;
    }

    /**
     * @param year the year to set
     */
    public void setYear(Integer year) {
        this.year = year;
    }

    /**
     * @return the category
     */
    public Category getCategory() {
        return category;
    }

    /**
     * @param category the category to set
     */
    public void setCategory(Category category) {
        this.category = category;
    }

    /**
     * @return the messages
     */
    public List<Message> getMessages() {
        return messages;
    }

    /**
     * @param messages the messages to set
     */
    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    /**
     * @return the reservations
     */
    public List<Reservation> getReservations() {
        return reservations;
    }

    /**
     * @param reservations the reservations to set
     */
    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
    
}

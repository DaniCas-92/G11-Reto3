/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.dao;

import com.danielcastrillon.motoG11.entities.Client;
import com.danielcastrillon.motoG11.entities.ClientCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author tec_danielc
 */

@Repository
public class ClientRepository {
    
    @Autowired
    private ClientCrud clientCrudRepository;
    
    public List<Client> getAll() {return (List<Client>) clientCrudRepository.findAll();}
    
    public Optional<Client> getClient(int idClient) {return clientCrudRepository.findById(idClient);}
    
    public Client save(Client client) {return clientCrudRepository.save(client);}
    
    public void delete(Client client) {clientCrudRepository.delete(client);}
}

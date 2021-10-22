/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.service;

import com.danielcastrillon.motoG11.dao.ClientRepository;
import com.danielcastrillon.motoG11.entities.Client;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author tec_danielc
 */

@Service
public class ClientService {
    
    @Autowired
    ClientRepository clientRepository;
    
    public List<Client> getAll() {return (List<Client>) clientRepository.getAll();};
  
    public Optional<Client> getClient(int id) {return clientRepository.getClient(id);};
  
    public Client save(Client category) { 
       if (category.getIdClient()== null){
           return clientRepository.save(category);
       }
       else
       {
          Optional<Client> cl =  clientRepository.getClient(category.getIdClient());
          if (cl.isEmpty()){
              return clientRepository.save(category);
          }
          else
          {
              return category;
          }
       }
 
    }

    public Client update(Client client) {
        if (client.getIdClient()!= null) {
            Optional<Client> e = clientRepository.getClient(client.getIdClient());
            if (!e.isEmpty()) {
                if (client.getName() != null) {
                    e.get().setName(client.getName());
                }
                if (client.getAge()!= null) {
                    e.get().setAge(client.getAge());
                }
                if (client.getPassword()!= null) {
                    e.get().setPassword(client.getPassword());
                }
                /*if (client.getEmail()!= null) {
                    e.get().setEmail(client.getEmail());
                }
                if (client.getMessages()!= null) {
                    e.get().setMessages(client.getMessages());
                }
                if (client.getReservations()!= null) {
                    e.get().setReservations(client.getReservations());
                }*/
                clientRepository.save(e.get());
                return e.get();
            } else {
                return client;
            }
        } else {
            return client;
        }
    }

    public boolean deleteClient(int id) {

        /**
         * alternativa de Delete Optional<Category> category =
         * categoryRepository.getCategory(id); if (category.isEmpty()){ return
         * false; } else { categoryRepository.delete(category.get()); return
         * true; }
         */
        return getClient(id).map(
                client -> {
                    clientRepository.delete(client);
                    return true;
                }).orElse(false);

    }
}

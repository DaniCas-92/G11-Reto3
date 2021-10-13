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
}

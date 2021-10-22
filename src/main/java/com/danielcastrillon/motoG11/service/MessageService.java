/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.service;

import com.danielcastrillon.motoG11.dao.MessageRepository;
import com.danielcastrillon.motoG11.entities.Category;
import com.danielcastrillon.motoG11.entities.Message;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author tec_danielc
 */

@Service
public class MessageService {
    
    @Autowired
    MessageRepository messageRepository;
    
    public List<Message> getAll() {return (List<Message>) messageRepository.getAll();};
  
    public Optional<Message> getMessage(int id) {return messageRepository.getMessage(id);};
  
    public Message save(Message message) { 
       if (message.getIdMessage()== null){
           return messageRepository.save(message);
       }
       else
       {
          Optional<Message> me =  messageRepository.getMessage(message.getIdMessage());
          if (me.isEmpty()){
              return messageRepository.save(message);
          }
          else
          {
              return message;
          }
       }
 
    }

    public Message update(Message message) {
        if (message.getIdMessage()!= null) {
            Optional<Message> e = messageRepository.getMessage(message.getIdMessage());
            if (!e.isEmpty()) {
                if (message.getMessageText()!= null) {
                    e.get().setMessageText(message.getMessageText());
                }
                /*if (message.getMotorbike()!= null) {
                    e.get().setMotorbike(message.getMotorbike());
                }
                if (message.getClient()!= null) {
                    e.get().setClient(message.getClient());
                }*/
                messageRepository.save(e.get());
                return e.get();
            } else {
                return message;
            }
        } else {
            return message;
        }
    }

    public boolean deleteMessage(int id) {

        /**
         * alternativa de Delete Optional<Category> category =
         * categoryRepository.getCategory(id); if (category.isEmpty()){ return
         * false; } else { categoryRepository.delete(category.get()); return
         * true; }
         */
        return getMessage(id).map(
                message -> {
                    messageRepository.delete(message);
                    return true;
                }).orElse(false);

    }
}

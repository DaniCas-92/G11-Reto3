/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.service;

import com.danielcastrillon.motoG11.dao.ScoreRepository;
import com.danielcastrillon.motoG11.entities.Score;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author tec_danielc
 */

@Service
public class ScoreService {
    
    @Autowired
    ScoreRepository scoreRepository;
    
    public List<Score> getAll() {return (List<Score>) scoreRepository.getAll();};
  
    public Optional<Score> getScore(int id) {return scoreRepository.getScore(id);};
  
    public Score save(Score score) { 
       if (score.getIdScore()== null){
           return scoreRepository.save(score);
       }
       else
       {
          Optional<Score> sc =  scoreRepository.getScore(score.getIdScore());
          if (sc.isEmpty()){
              return scoreRepository.save(score);
          }
          else
          {
              return score;
          }
       }
 
    }

    public Score update(Score score) {
        if (score.getIdScore()!= null) {
            Optional<Score> s = scoreRepository.getScore(score.getIdScore());
            if (!s.isEmpty()) {
                if (score.getStars()!= null) {
                    s.get().setStars(score.getStars());
                }
                if (score.getMessageText()!= null) {
                    s.get().setMessageText(score.getMessageText());
                }
                /*if (score.getReservation()!= null) {
                    s.get().setReservation(score.getReservation());
                }*/
                return scoreRepository.save(s.get());
            } else {
                return score;
            }
        } else {
            return score;
        }

    }

    public boolean deleteScore(int id) {
        /**
         * alternativa de Delete Optional<Category> category =
         * categoryRepository.getCategory(id); if (category.isEmpty()){ return
         * false; } else { categoryRepository.delete(category.get()); return
         * true; }
         */
        return getScore(id).map(
                score -> {
                    scoreRepository.delete(score);
                    return true;
                }).orElse(false);
    }
    
}

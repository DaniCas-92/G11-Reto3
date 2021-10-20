/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.dao;

import com.danielcastrillon.motoG11.entities.Score;
import com.danielcastrillon.motoG11.entities.ScoreCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author tec_danielc
 */

@Repository
public class ScoreRepository {
    
    @Autowired
    private ScoreCrud scoreCrudRepository;
    
    public List<Score> getAll() {return (List<Score>) scoreCrudRepository.findAll();}
    
    public Optional<Score> getScore(int idScore) {return scoreCrudRepository.findById(idScore);}
    
    public Score save(Score score) {return scoreCrudRepository.save(score);}
  
    public void delete(Score score) {scoreCrudRepository.delete(score);}
    
}

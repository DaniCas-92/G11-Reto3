/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.danielcastrillon.motoG11.service;

import com.danielcastrillon.motoG11.entities.Score;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author tec_danielc
 */

@RestController
@RequestMapping(value="/api/Score")
public class ScoreController {
    
    @Autowired
    private ScoreService scoreService;
    
    @GetMapping("/all")
      public List<Score> getScores() {return scoreService.getAll();}

    @GetMapping("/{id}")
      public Optional<Score> getScore(@PathVariable("id") int idScore) {
          return scoreService.getScore(idScore);
      }
      
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
      public Score save(@RequestBody Score score) {return scoreService.save(score);}


    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED) 
    public Score update(@RequestBody Score score) {return scoreService.update(score);}


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") int scoreId) {scoreService.deleteScore(scoreId);}
    
}

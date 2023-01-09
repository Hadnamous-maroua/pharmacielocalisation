package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.Ville;
import com.example.demo.model.Zone;

public interface ZoneRepository extends JpaRepository<Zone, Integer> {
	
	Zone findById(int id);
	@Query("Select m from Zone m where m.ville.nom= :n")
	Zone findByVille(Ville ville);
	Zone findByNom(String zone);
}

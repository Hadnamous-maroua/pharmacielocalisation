package com.example.demo.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.example.demo.model.Pharmacie;
import com.example.demo.model.Ville;
import com.example.demo.model.Zone;


public interface PharmacieRepository extends JpaRepository<Pharmacie, Integer> {

	Pharmacie findById(int id);
	Pharmacie findByNom(String nom);
	@Query("Select m from Pharmacie m where m.zone.ville.nom= :n")
	Zone findByVille(Ville ville);
	
	
	
	@Query("Select m from Pharmacie m where m.zone.nom= :n")
	Collection<?>  findPharmacyByZone();
	
	
}

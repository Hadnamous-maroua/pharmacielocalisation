package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Ville;

public interface VilleRepository extends JpaRepository<Ville, Integer> {
	
	Ville findById(int id);
	Ville findByNom(String ville);
	
}
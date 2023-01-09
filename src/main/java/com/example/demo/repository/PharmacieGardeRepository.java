package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Pharmacie;
import com.example.demo.model.PharmacieGarde;

public interface PharmacieGardeRepository extends JpaRepository<PharmacieGarde, Integer> {
	PharmacieGarde findById(int id);
	

}

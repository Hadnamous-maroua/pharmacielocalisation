package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.model.PharmacieGarde;
import com.example.demo.model.PharmacieGardePK;
import com.example.demo.repository.PharmacieGardeRepository;





@RestController
@RequestMapping("pharmaciegarde")
public class PharmacieGardeController {
	

	
	@Autowired
	private PharmacieGardeRepository repository;
	
	@PostMapping("/save")
	public PharmacieGarde create(@RequestBody PharmacieGarde pg){
		return repository.save(pg);
	}
	
	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable (required = true) String id){
		PharmacieGarde s = repository.findById(Integer.parseInt(id));
		repository.delete(s);
	}

	@GetMapping("/all")
	public List<PharmacieGarde> findAll(){
		return repository.findAll();
	}
	
	@GetMapping(value = "/count")
	public long countPharmacieGarde() {
		return repository.count();
	}
	
	



}

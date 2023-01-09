package com.example.demo.controller;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Pharmacie;
import com.example.demo.repository.PharmacieRepository;

@RestController
@RequestMapping("pharmacies")
public class PharmacieController {
	
	@Autowired
	private PharmacieRepository repository;
	
	@PostMapping("/save")
	public void save(@RequestBody Pharmacie pharmacie){
		repository.save(pharmacie);
	}
	
	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable (required = true) String id){
		Pharmacie s = repository.findById(Integer.parseInt(id));
		repository.delete(s);
	}

	@GetMapping("/all")
	public List<Pharmacie> findAll(){
		return repository.findAll();
	}
	
	@GetMapping(value = "/count")
	public long countPharmacie() {
		return repository.count();
	}
	
	
	
	
	
	


}

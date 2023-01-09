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
import com.example.demo.model.Ville;
import com.example.demo.model.Zone;
import com.example.demo.repository.ZoneRepository;


@RestController
@RequestMapping("zones")
public class ZoneController {
	
	@Autowired
	private ZoneRepository repository;
	
	@PostMapping("/save")
	public void save(@RequestBody Zone zone){
		repository.save(zone);
	}
	
	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable (required = true) String id){
		Zone s = repository.findById(Integer.parseInt(id));
		repository.delete(s);
	}

	@GetMapping("/all")
	public List<Zone> findAll(){
		return repository.findAll();
	}
	
	@GetMapping(value = "/count")
	public long countZone() {
		return repository.count();
	}
	
	@GetMapping("/pharmacie/{zone}")
	public Collection<Pharmacie> getPharmaByZone(@PathVariable (required = true) String zone){
		Zone v=repository.findByNom(zone);
		Collection<Pharmacie> pharmacies= v.getPharmacies();
		return pharmacies;
	}

}

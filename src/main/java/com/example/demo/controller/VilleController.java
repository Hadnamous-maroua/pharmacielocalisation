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

import com.example.demo.model.Ville;
import com.example.demo.model.Zone;
import com.example.demo.repository.VilleRepository;


@RestController
@RequestMapping("villes")
public class VilleController {
	
	@Autowired
	private VilleRepository repository;
	
	@PostMapping("/save")
	public void save(@RequestBody Ville ville){
		repository.save(ville);
	}
	
	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable (required = true) String id){
		Ville s = repository.findById(Integer.parseInt(id));
		repository.delete(s);
	}

	@GetMapping("/all")
	public List<Ville> findAll(){
		return repository.findAll();
	}
	
	@GetMapping(value = "/count")
	public long countZone() {
		return repository.count();
	}
	
	@GetMapping("/zone/{ville}")
	public Collection<Zone> getZoneByVille(@PathVariable (required = true) String ville){
		Ville v=repository.findByNom(ville);
		Collection<Zone> zones= v.getZones();
		return zones;
	}

}

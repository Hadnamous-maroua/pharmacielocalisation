package com.example.demo.model;

import java.util.Date;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
public class PharmacieGarde {
	@EmbeddedId
	private PharmacieGardePK pk;
	@Temporal(TemporalType.DATE)
	
	private Date dateFin;
	
	@ManyToOne
	@JoinColumn(name = "pharmacie", insertable = false, updatable = false )
	private Pharmacie pharmacie;
	@ManyToOne
	@JoinColumn(name = "garde", insertable = false, updatable = false)
	private Garde garde;
	
	public PharmacieGarde() {
		super();
	}
	 public PharmacieGarde(PharmacieGardePK pk, Date dateFin, Pharmacie pharmacie, Garde garde) {
        this.pk = pk;
        this.dateFin = dateFin;
        this.pharmacie = pharmacie;
        this.garde = garde;
    }
	public PharmacieGarde(Date dateFin, Pharmacie pharmacie, Garde garde) {
        
        this.dateFin = dateFin;
        this.pharmacie = pharmacie;
        this.garde = garde;
    }
	
	
	public PharmacieGardePK getPk() {
		return pk;
	}
	public void setPk(PharmacieGardePK pk) {
		this.pk = pk;
	}
	
	public Date getDateFin() {
		return dateFin;
	}
	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}
	
	public Pharmacie getPharmacie() {
		return pharmacie;
	}
	public void setPharmacie(Pharmacie pharmacie) {
		this.pharmacie =pharmacie;
	}
	public Garde getGarde() {
		return garde;
	}
	public void setGarde(Garde garde) {
		this.garde = garde;
	}
	

}

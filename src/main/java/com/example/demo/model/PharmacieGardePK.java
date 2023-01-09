package com.example.demo.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Embeddable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;


@Embeddable
public class PharmacieGardePK  implements Serializable {
	private int pharmacie;
	private int garde;
	@Temporal(TemporalType.DATE)
	
	private Date dateDebut;
	
	public PharmacieGardePK() {
		super();
	}
	public PharmacieGardePK(int pharmacie,int garde, Date dateDebut) {
		this.pharmacie=pharmacie;
		this.garde=garde;
		this.dateDebut=dateDebut;

	}
	public PharmacieGardePK(int pharmacie,int garde) {
		this.pharmacie=pharmacie;
		this.garde=garde;
		;

	}
	
	public int getPharmacie() {
		return pharmacie;
	}

	public void setPharmacie(int pharmacie) {
		this.pharmacie = pharmacie;
	}

	public int getGarde() {
		return garde;
	}

	public void setGarde(int garde) {
		this.garde = garde;
	}

	public Date getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}

	@Override
	public int hashCode() {
		return Objects.hash(dateDebut, pharmacie, garde);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PharmacieGardePK other = (PharmacieGardePK) obj;
		return Objects.equals(dateDebut, other.dateDebut) && pharmacie == other.pharmacie && garde == other.garde;
	}
	
	

}


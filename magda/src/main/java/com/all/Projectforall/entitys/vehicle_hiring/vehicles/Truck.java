package com.all.Projectforall.entitys.vehicle_hiring.vehicles;

import com.all.Projectforall.entitys.vehicle_hiring.Vehicle;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "trucks")
@PrimaryKeyJoinColumn(name = "id")
public class Truck extends Vehicle {
    private int loadingCap;

    public Truck() {
    }

    public Truck(String plateNumber, int numberOfTires, int loadingCap) {
        super(plateNumber, numberOfTires);
        this.loadingCap = loadingCap;
    }

    public Truck(String plateNum,int loadingCap) {
        super(plateNum,0);
        this.loadingCap = loadingCap;
    }

    public int getLoadingCap() {
        return loadingCap;
    }

    public void setLoadingCap(int loadingCap) {
        this.loadingCap = loadingCap;
    }

    @Override
    public String toString() {
        return "Truck{" +
                " id=" + super.getId() +
                ", plateNumber=" + super.getPlateNumber() +
                ", dailyFee=" + super.getDailyFee() +
                ", numberOfTires=" + super.getNumberOfTires() +
                ", price=" + super.getPrice() +
                ", loadingCap=" + loadingCap +
                '}';
    }
}

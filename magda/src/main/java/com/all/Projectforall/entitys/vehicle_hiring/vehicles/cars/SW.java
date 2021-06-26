package com.all.Projectforall.entitys.vehicle_hiring.vehicles.cars;

import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Car;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "sw_cars")
@PrimaryKeyJoinColumn(name = "id")
public class SW extends Car {
    private int loadingCap;

    public SW(int loadingCap) {
        this.loadingCap = loadingCap;
    }

    public SW(String plateNumber, int numberOfTires, String color, int seatingCap, int numOfDoors, int loadingCap) {
        super(plateNumber, numberOfTires, color, seatingCap, numOfDoors, false);
        this.loadingCap = loadingCap;
    }

    public SW(String plateNumber, int numberOfTires, int dailyFee, int price, String color, int seatingCap, int numOfDoors, int loadingCap) {
        super(plateNumber, numberOfTires, dailyFee, price, color, seatingCap, numOfDoors, false);
        this.loadingCap = loadingCap;
    }

    public SW() {
    }

    public int getLoadingCap() {
        return loadingCap;
    }

    public void setLoadingCap(int loadingCap) {
        this.loadingCap = loadingCap;
    }

    @Override
    public String toString() {
        return "SW{" +
                "loadingCap=" + loadingCap +
                '}';
    }
}

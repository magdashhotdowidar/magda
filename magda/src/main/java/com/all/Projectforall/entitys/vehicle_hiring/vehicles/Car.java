package com.all.Projectforall.entitys.vehicle_hiring.vehicles;

import com.all.Projectforall.entitys.vehicle_hiring.Vehicle;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "cars")
@PrimaryKeyJoinColumn(name = "id")
public class Car extends Vehicle {
    private String color;
    private int seatingCap;
    private int numOfDoors;
    private boolean deliverDroppingOffRemotely;

    public Car() {
    }

    public Car(String plateNumber, int numberOfTires, String color, int seatingCap, int numOfDoors, boolean deliverDroppingOffRemotely) {
        super(plateNumber, numberOfTires);
        this.color = color;
        this.seatingCap = seatingCap;
        this.numOfDoors = numOfDoors;
        this.deliverDroppingOffRemotely = deliverDroppingOffRemotely;
    }

    public Car(String plateNumber, int numberOfTires, int dailyFee, int price, String color, int seatingCap, int numOfDoors, boolean deliverDroppingOffRemotely) {
        super(plateNumber, numberOfTires, dailyFee, price);
        this.color = color;
        this.seatingCap = seatingCap;
        this.numOfDoors = numOfDoors;
        this.deliverDroppingOffRemotely = deliverDroppingOffRemotely;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getSeatingCap() {
        return seatingCap;
    }

    public void setSeatingCap(int seatingCap) {
        this.seatingCap = seatingCap;
    }

    public int getNumOfDoors() {
        return numOfDoors;
    }

    public void setNumOfDoors(int numOfDoors) {
        this.numOfDoors = numOfDoors;
    }

    public boolean isDeliverDroppingOffRemotely() {
        return deliverDroppingOffRemotely;
    }

    public void setDeliverDroppingOffRemotely(boolean deliverDroppingOffRemotely) {
        this.deliverDroppingOffRemotely = deliverDroppingOffRemotely;
    }

    @Override
    public String toString() {
        return "Car{" +
                "color='" + color + '\'' +
                ", seatingCap=" + seatingCap +
                ", numOfDoors=" + numOfDoors +
                ", deliverDroppingOffRemotely=" + deliverDroppingOffRemotely +
                '}';
    }
}

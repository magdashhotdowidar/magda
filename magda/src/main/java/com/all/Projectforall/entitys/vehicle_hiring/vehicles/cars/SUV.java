package com.all.Projectforall.entitys.vehicle_hiring.vehicles.cars;

import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Car;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "suv_cars")
@PrimaryKeyJoinColumn(name = "id")
public class SUV extends Car {
private String wheelDriveType;

    public SUV() {
    }

    public SUV(String plateNumber, int numberOfTires, String color, int seatingCap, int numOfDoors, boolean deliverDroppingOffRemotely, String wheelDriveType) {
        super(plateNumber, numberOfTires, color, seatingCap, numOfDoors, deliverDroppingOffRemotely);
        this.wheelDriveType = wheelDriveType;
    }

    public SUV(String plateNumber, int numberOfTires, int dailyFee, int price, String color, int seatingCap, int numOfDoors, boolean deliverDroppingOffRemotely, String wheelDriveType) {
        super(plateNumber, numberOfTires, dailyFee, price, color, seatingCap, numOfDoors, deliverDroppingOffRemotely);
        this.wheelDriveType = wheelDriveType;
    }

    public String getWheelDriveType() {
        return wheelDriveType;
    }

    public void setWheelDriveType(String wheelDriveType) {
        this.wheelDriveType = wheelDriveType;
    }

    @Override
    public String toString() {
        return "SUV{" +
                "wheelDriveType='" + wheelDriveType + '\'' +
                '}';
    }
}

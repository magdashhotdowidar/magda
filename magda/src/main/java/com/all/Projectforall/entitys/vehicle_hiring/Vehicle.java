package com.all.Projectforall.entitys.vehicle_hiring;

import org.springframework.data.annotation.Persistent;

import javax.persistence.*;

@Entity
@Table(name = "vehicles")
@Inheritance(strategy = InheritanceType.JOINED)
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true,nullable = false)
    private String plateNumber;
    private String vehicleType;
    private String imageName;
    private int numberOfTires;
    private int dailyFee;
    private int price;


    public Vehicle() {
    }

    public Vehicle(String plateNumber, int numberOfTires) {
        this.plateNumber = plateNumber;
        this.numberOfTires = numberOfTires;
    }

    public Vehicle( String plateNumber, int numberOfTires, int dailyFee, int price) {
        this.plateNumber = plateNumber;
        this.numberOfTires = numberOfTires;
        this.dailyFee = dailyFee;
        this.price = price;
    }

    //---------------getter And Setter-------------------------------------
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public int getNumberOfTires() {
        return numberOfTires;
    }

    public void setNumberOfTires(int numberOfTires) {
        this.numberOfTires = numberOfTires;
    }

    public int getDailyFee() {
        return dailyFee;
    }

    public void setDailyFee(int dailyFee) {
        this.dailyFee = dailyFee;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }
}

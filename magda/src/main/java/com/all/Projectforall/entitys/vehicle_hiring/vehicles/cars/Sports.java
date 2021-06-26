package com.all.Projectforall.entitys.vehicle_hiring.vehicles.cars;

import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Car;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "sports_cars")
@PrimaryKeyJoinColumn(name = "id")
public class Sports extends Car {

    private int  horsepowerHP;

    public Sports() {
    }

    public Sports(int horsepower) {
        this.horsepowerHP = horsepower;
    }

    public Sports(String plateNumber, int numberOfTires, String color, int seatingCap, int numOfDoors, boolean deliverDroppingOffRemotely, int horsepowerHP) {
        super(plateNumber, numberOfTires, color, seatingCap, numOfDoors, deliverDroppingOffRemotely);
        this.horsepowerHP = horsepowerHP;
    }

    public Sports(String plateNumber, int numberOfTires, int dailyFee, int price, String color, int seatingCap, int numOfDoors, boolean deliverDroppingOffRemotely, int horsepowerHP) {
        super(plateNumber, numberOfTires, dailyFee, price, color, seatingCap, numOfDoors, deliverDroppingOffRemotely);
        this.horsepowerHP = horsepowerHP;
    }

    public int getHorsepower() {
        return horsepowerHP;
    }

    public void setHorsepower(int horsepower) {
        this.horsepowerHP = horsepower;
    }

    @Override
    public String toString() {
        return "Sports{" +
                "horsepower=" + horsepowerHP +
                '}';
    }
}

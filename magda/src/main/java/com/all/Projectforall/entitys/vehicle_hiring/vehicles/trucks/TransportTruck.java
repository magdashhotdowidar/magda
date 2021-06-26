package com.all.Projectforall.entitys.vehicle_hiring.vehicles.trucks;

import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Truck;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "transport_truck")
@PrimaryKeyJoinColumn(name = "id")
public class TransportTruck extends Truck {
    private boolean goesAbroad;

    public TransportTruck() {
    }

    public TransportTruck(Truck truck, boolean goesAbroad) {
        super(truck.getPlateNumber(), truck.getNumberOfTires(), truck.getLoadingCap());
        this.goesAbroad = goesAbroad;
    }

    public boolean isGoesAbroad() {
        return goesAbroad;
    }

    public void setGoesAbroad(boolean goesAbroad) {
        this.goesAbroad = goesAbroad;
    }

    @Override
    public String toString() {
        return "TransportTruck{" +
                " id=" + super.getId() +
                ", goesAbroad=" + goesAbroad +
                ", plateNumber=" + super.getPlateNumber() +
                ", dailyFee=" + super.getDailyFee() +
                ", numberOfTires=" + super.getNumberOfTires() +
                ", price=" + super.getPrice() +
                ", loadingCap=" + super.getLoadingCap() +
                '}';
    }
}

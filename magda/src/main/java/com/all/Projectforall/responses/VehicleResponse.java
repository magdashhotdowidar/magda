package com.all.Projectforall.responses;

import com.all.Projectforall.entitys.vehicle_hiring.Vehicle;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Car;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Truck;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.cars.SUV;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.cars.SW;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.cars.Sports;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.trucks.TransportTruck;

import java.util.List;

public class VehicleResponse {
    private List<Vehicle> vehicles;
    private List<Vehicle>availableVehicles;
    private List<Car> cars;
    private List<Truck> trucks;
    private List<TransportTruck> transportTrucks;
    private List<Sports> sports;
    private List<SUV> suvList;
    private List<SW> swList;

    public VehicleResponse() {
    }

    public VehicleResponse(List<Vehicle> vehicles,List<Vehicle>availableVehicles, List<Car> cars, List<Truck> trucks, List<TransportTruck> transportTrucks, List<Sports> sports, List<SUV> suvList, List<SW> swList) {
        this.vehicles = vehicles;
        this.availableVehicles=availableVehicles;
        this.cars = cars;
        this.trucks = trucks;
        this.transportTrucks = transportTrucks;
        this.sports = sports;
        this.suvList = suvList;
        this.swList = swList;
    }

    public List<Vehicle> getVehicles() {
        return vehicles;
    }

    public List<Vehicle> getAvailableVehicles() { return availableVehicles; }

    public List<Car> getCars() {
        return cars;
    }

    public List<Truck> getTrucks() {
        return trucks;
    }

    public List<TransportTruck> getTransportTrucks() {
        return transportTrucks;
    }

    public List<Sports> getSports() {
        return sports;
    }

    public List<SUV> getSuvList() {
        return suvList;
    }

    public List<SW> getSwList() {
        return swList;
    }
}

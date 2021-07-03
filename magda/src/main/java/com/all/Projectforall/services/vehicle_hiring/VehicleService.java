package com.all.Projectforall.services.vehicle_hiring;

import com.all.Projectforall.entitys.vehicle_hiring.Vehicle;
import com.all.Projectforall.entitys.vehicle_hiring.VehicleTransaction;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Car;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Truck;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.cars.SUV;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.cars.SW;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.cars.Sports;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.trucks.TransportTruck;
import com.all.Projectforall.repos.vehicle_hiring.VehicleRepository;
import com.all.Projectforall.repos.vehicle_hiring.vehicles.CarRepository;
import com.all.Projectforall.repos.vehicle_hiring.vehicles.TruckRepository;
import com.all.Projectforall.repos.vehicle_hiring.vehicles.cars.SUVCarRepository;
import com.all.Projectforall.repos.vehicle_hiring.vehicles.cars.SWRepository;
import com.all.Projectforall.repos.vehicle_hiring.vehicles.cars.SportCarRepository;
import com.all.Projectforall.repos.vehicle_hiring.vehicles.trucks.TransportTruckRepository;
import com.all.Projectforall.responses.VehicleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;
    @Autowired
    private TruckRepository truckRepository;
    @Autowired
    private CarRepository carRepository;
    @Autowired
    private SportCarRepository sportCarRepository;
    @Autowired
    private SUVCarRepository suvCarRepository;
    @Autowired
    private SWRepository swRepository;
    @Autowired
    private TransportTruckRepository transportTruckRepository;
    @Autowired
    private VehicleTransactionService transactionService;

    @Async
    public CompletableFuture<String> save(Vehicle vehicle) {
        String message = "";

        Vehicle obj = vehicleRepository.save(vehicle);

        if (obj != null) message = "success";
        else message = "fail";
        return CompletableFuture.completedFuture(message);

    }

    @Async
    public CompletableFuture<String> delete(String plateNumber) {
        String message = "";
        Vehicle obj = vehicleRepository.findByPlateNumber(plateNumber).get();

        if (obj != null) {
            vehicleRepository.delete(obj);
            message = "success";
        } else message = "fail";
        return CompletableFuture.completedFuture(message);
    }

    @Async
    @Transactional
    public void deleteAllVehicles() {
       vehicleRepository.deleteAll();
    }
    @Async
    @Transactional
    public void deleteByPlateNumISNull() {
        vehicleRepository.deleteAllByPlateNumberIsNull();
    }

    @Async
    public CompletableFuture<List<Truck>> getAllTruck() {
        List<Truck> list = truckRepository.findAll();

        return CompletableFuture.completedFuture(list);
    }

    @Async
    public CompletableFuture<List<Car>> getAllCars() {
        List<Car> list = carRepository.findAll();

        return CompletableFuture.completedFuture(list);
    }

    @Async
    public CompletableFuture<List<TransportTruck>> getAllTransportTrucks() {
        List<TransportTruck> list = transportTruckRepository.findAll();

        return CompletableFuture.completedFuture(list);
    }

    @Async
    public CompletableFuture<List<Sports>> getAllSportCars() {
        List<Sports> list = sportCarRepository.findAll();

        return CompletableFuture.completedFuture(list);
    }

    @Async
    public CompletableFuture<List<SW>> getAllSWCars() {
        List<SW> list = swRepository.findAll();

        return CompletableFuture.completedFuture(list);
    }

    @Async
    public CompletableFuture<List<SUV>> getAllSuvCars() {
        List<SUV> list = suvCarRepository.findAll();

        return CompletableFuture.completedFuture(list);
    }

    private List<Vehicle> getAvailableVehicles() {
        List<Vehicle> vehicles = new ArrayList<>();
            for (Vehicle vehicle : vehicleRepository.findAll())
                if (transactionService.getTransactionVehicle("","",vehicle.getPlateNumber())!=null) vehicles.add(vehicle);
        return vehicles;
    }

    @Async
    public CompletableFuture<Vehicle> getVehicle(String plateNum)  {
        return CompletableFuture.completedFuture( vehicleRepository.findByPlateNumber(plateNum).get());
    }


    @Async
    public CompletableFuture<VehicleResponse> getAllVehiclesSorted() throws Exception {
        VehicleResponse response = new VehicleResponse(vehicleRepository.findAll(), getAvailableVehicles(), getAllCars().get(), getAllTruck().get(), getAllTransportTrucks()
                .get(), getAllSportCars().get(), getAllSuvCars().get(), getAllSWCars().get());

        return CompletableFuture.completedFuture(response);
    }

}

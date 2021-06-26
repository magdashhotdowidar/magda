package com.all.Projectforall.services.vehicle_hiring;

import com.all.Projectforall.configuration.TestClass;
import com.all.Projectforall.entitys.vehicle_hiring.VehicleTransaction;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Truck;
import com.all.Projectforall.exceptions.custExcep.NoCancellationYouMustPayException;
import com.all.Projectforall.exceptions.custExcep.OverWeightException;
import com.all.Projectforall.exceptions.custExcep.SorryWeDontHaveThatOneException;
import com.all.Projectforall.repos.vehicle_hiring.VehicleRepository;
import com.all.Projectforall.repos.vehicle_hiring.VehicleTransactionRepository;
import com.all.Projectforall.repos.vehicle_hiring.vehicles.TruckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;


@Service()
public class VehicleTransactionService {
    @Autowired
    private VehicleTransactionRepository vehicleTransactionRepository;
    @Autowired
    private VehicleRepository vehicleRepository;
    @Autowired
    private TruckRepository truckRepository;

    public List<VehicleTransaction> getAvailableVehicles() {
        return vehicleTransactionRepository.findAll().stream().filter(vehicle ->
                checkTheCarExisting(vehicle.getEndDate())).collect(Collectors.toList());
    }

    @Async
    public CompletableFuture<String> bookMe(String startDate, String endDate, String plateNumber) throws SorryWeDontHaveThatOneException {
        VehicleTransaction vehicle = getTransactionVehicle( startDate, endDate, plateNumber);
        if (vehicle == null)
            throw new SorryWeDontHaveThatOneException("this car " + plateNumber + " not available now");

        vehicleTransactionRepository.save(vehicle);
        return CompletableFuture.completedFuture("the car booked successfully");
    }

    private boolean checkTheCarExisting(String date) {
        return TestClass.calcDAte(date, "cur").get("available") == 1;
    }

    @Async
    public CompletableFuture<String> cancelMe(String plateNum) throws NoCancellationYouMustPayException {
        VehicleTransaction vehicle = vehicleTransactionRepository.findByPlateNum(plateNum).get();
        if (vehicle != null) {
            if (checkTheCarExisting(vehicle.getStartDate()))
                throw new NoCancellationYouMustPayException("cancellation noLonger possible");
            vehicle.setBooked(false);
            vehicle.setRented(false);
            vehicle.setCanceled(true);
        }

        return CompletableFuture.completedFuture("cancellation done successfully");
    }

    @Async
    public CompletableFuture<String> rentMe(String startDate, String endDate, String plateNumber) throws SorryWeDontHaveThatOneException {
        VehicleTransaction vehicle = rent(startDate, endDate, plateNumber);
        if (vehicle != null) {
            vehicleTransactionRepository.save(vehicle);

            return CompletableFuture.completedFuture("the car rented successfully");
        }
        throw new SorryWeDontHaveThatOneException("this car " + plateNumber + " not available now : ");
    }

    @Async
    public CompletableFuture<String> rentMe(String startDate, String endDate, String plateNum, String location) throws SorryWeDontHaveThatOneException {
        VehicleTransaction vehicle = rent(startDate, endDate, plateNum);
        if (vehicle != null) {
            vehicle.setLocation(location);
            vehicleTransactionRepository.save(vehicle);

            return CompletableFuture.completedFuture("the car rented successfully");
        }
        throw new SorryWeDontHaveThatOneException("this car " + plateNum + " plateNum not available now : ");
    }

    private VehicleTransaction rent(String startDate, String endDate, String plateNumber) {
        VehicleTransaction vehicle = getTransactionVehicle( startDate, endDate, plateNumber);
        if (vehicle != null) {
            vehicle.setRented(true);
            return vehicle;
        }
        return null;
    }

    private VehicleTransaction getTransactionVehicle( String startDate, String endDate, String plateNumber) {

        if (vehicleTransactionRepository.findAll().isEmpty()||!vehicleTransactionRepository.findByPlateNum(plateNumber).isPresent())
            return new VehicleTransaction(plateNumber, startDate, endDate);
        else if (vehicleTransactionRepository.findByPlateNum(plateNumber).isPresent()) {
            VehicleTransaction obj = vehicleTransactionRepository.findByPlateNum(plateNumber).filter(vehicle -> checkTheCarExisting(vehicle.getEndDate())).get();
            if (!obj.equals(null)) {
                if (!startDate.equals("") && !endDate.equals("")) {
                    obj.setStartDate(startDate);
                    obj.setEndDate(endDate);
                }
                obj.setRented(true);
                obj.setBooked(true);
                obj.setCanceled(false);
                return obj;
            }
        }
        return null;
    }

    @Async
    public CompletableFuture<Integer> dropMe(String plateNum) {
        VehicleTransaction vehicle = vehicleTransactionRepository.findByPlateNum(plateNum).get();
        vehicle.setBooked(false);
        vehicle.setRented(false);

        int rentPeriod = TestClass.calcDAte(vehicle.getStartDate(), vehicle.getEndDate()).get("defInDays");
        int allFees = rentPeriod * vehicleRepository.findByPlateNumber(plateNum).get().getDailyFee();
        return CompletableFuture.completedFuture(allFees);
    }

    @Async
    public CompletableFuture<List<Truck>> loadMe(int amount) throws OverWeightException {
        List<Truck> availableTrucks = truckRepository.findAll().stream().filter(truck -> truck.getLoadingCap() >= amount).collect(Collectors.toList());
        if (availableTrucks.isEmpty()) throw new OverWeightException("the amount is too heavy");
        return CompletableFuture.completedFuture(availableTrucks);

    }
}

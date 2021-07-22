package com.all.Projectforall.services.vehicle_hiring;

import com.all.Projectforall.configuration.TestClass;
import com.all.Projectforall.entitys.vehicle_hiring.VehicleTransaction;
import com.all.Projectforall.entitys.vehicle_hiring.transactionTables.Cancellation;
import com.all.Projectforall.entitys.vehicle_hiring.transactionTables.Location;
import com.all.Projectforall.entitys.vehicle_hiring.transactionTables.Reservation;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Truck;
import com.all.Projectforall.exceptions.custExcep.NoCancellationYouMustPayException;
import com.all.Projectforall.exceptions.custExcep.OverWeightException;
import com.all.Projectforall.exceptions.custExcep.SorryWeDontHaveThatOneException;
import com.all.Projectforall.models.vehicle_hiring.CancellationModel;
import com.all.Projectforall.models.vehicle_hiring.Drop;
import com.all.Projectforall.repos.vehicle_hiring.VehicleRepository;
import com.all.Projectforall.repos.vehicle_hiring.VehicleTransactionRepository;
import com.all.Projectforall.repos.vehicle_hiring.transacations.LocationRepository;
import com.all.Projectforall.repos.vehicle_hiring.transacations.ReservationRepository;
import com.all.Projectforall.repos.vehicle_hiring.vehicles.TruckRepository;
import com.all.Projectforall.responses.VehicleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
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
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private LocationRepository locationRepository;

    @Async
    @Transactional
    public CompletableFuture<VehicleResponse> bookMe(String startDate, String endDate, String plateNumber, String user, String cus) throws SorryWeDontHaveThatOneException {
        VehicleTransaction vehicle = getTransactionVehicle(startDate, endDate, plateNumber);
        if (vehicle == null)
            throw new SorryWeDontHaveThatOneException("this car " + plateNumber + " not available now " + "it will be available in " +
                    vehicleTransactionRepository.findByPlateNum(plateNumber).get().getEndDate());

        vehicle.add_reservation(new Reservation(plateNumber, startDate, endDate, user, cus, "booking"));
        vehicleTransactionRepository.save(vehicle);
        return CompletableFuture.completedFuture(new VehicleResponse("the car booked successfully"));
    }

    @Async
    @Transactional
    public CompletableFuture<VehicleResponse> rentMe(String startDate, String endDate, String plateNumber, String user, String cus, String location) throws SorryWeDontHaveThatOneException {
        VehicleTransaction vehicle = getTransactionVehicle(startDate, endDate, plateNumber);
        if (vehicle == null)
            throw new SorryWeDontHaveThatOneException("this car " + plateNumber + " not available now " + "it will be available in " +
                    vehicleTransactionRepository.findByPlateNum(plateNumber).get().getEndDate());

        Reservation reservation = new Reservation(plateNumber, startDate, endDate, user, cus, "renting");
        vehicle.add_reservation(reservation);
        vehicleTransactionRepository.save(vehicle);
        if (!location.equals("")) locationRepository.save(new Location(location,reservation));
        return CompletableFuture.completedFuture(new VehicleResponse("the car rented successfully"));
    }


    public VehicleTransaction getTransactionVehicle(String startDate, String endDate, String plateNumber) {
        if (vehicleTransactionRepository.findAll().isEmpty() || !vehicleTransactionRepository.findByPlateNum(plateNumber).isPresent())
            return new VehicleTransaction(plateNumber, startDate, endDate);
        else if (vehicleTransactionRepository.findByPlateNum(plateNumber).isPresent()) {
            VehicleTransaction obj = vehicleTransactionRepository.findByPlateNum(plateNumber).get();

            if (obj.getEndDate().equals("free") || checkTheCarExisting(obj.getEndDate())) {
                if (!startDate.equals("") && !endDate.equals("")) {
                    obj.setStartDate(startDate);
                    obj.setEndDate(endDate);
                }
                return obj;
            }
        }
        return null;
    }

    @Async
    @Transactional
    public CompletableFuture<VehicleResponse> cancelMe(String plateNum) throws NoCancellationYouMustPayException {
        VehicleTransaction v = vehicleTransactionRepository.findByPlateNum(plateNum).get();
        if (v != null) {
            if (v.getStartDate().equals("free"))
                throw new NoCancellationYouMustPayException("this reservation already cancelled");
            if (checkTheCarExisting(v.getStartDate()))
                throw new NoCancellationYouMustPayException("cancellation noLonger possible you must pay");
            Reservation reservation = reservationRepository.findByPlateNumAndStartDateAndEndDate(v.getPlateNum(), v.getStartDate(), v.getEndDate()).get();
            Cancellation cancellation = new Cancellation(v.getPlateNum(), v.getStartDate(), v.getEndDate(), reservation.getUser(), reservation.getCustomer());
            v.add_cancellation(cancellation);
            reservationRepository.delete(reservation);
            v.setStartDate("free");
            v.setEndDate("free");
            vehicleTransactionRepository.save(v);
            return CompletableFuture.completedFuture(new VehicleResponse(new CancellationModel(cancellation), "cancellation done successfully"));
        }
        throw new NoCancellationYouMustPayException("no transaction for this vehicle ");
    }

    private boolean checkTheCarExisting(String date) {
        return TestClass.calcDAte(date, "cur").get("available") == 1;
    }

    @Async
    public CompletableFuture<VehicleResponse> dropMe(String plateNum) throws NoCancellationYouMustPayException {
        VehicleTransaction v = vehicleTransactionRepository.findByPlateNum(plateNum)
                .orElseThrow(() -> new NoCancellationYouMustPayException("no transaction for this vehicle"));
        Optional<Reservation> optionalReservation = reservationRepository.findByPlateNumAndStartDateAndEndDate(v.getPlateNum(), v.getStartDate(), v.getEndDate());
        if (optionalReservation.isPresent()) {// here i use many forms for dealing with optional object
            Reservation reservation = optionalReservation.get();
            int dailyFees = vehicleRepository.findByPlateNumber(plateNum).get().getDailyFee();
            int rentPeriod = TestClass.calcDAte(v.getStartDate(), v.getEndDate()).get("defInDays");
            int allFees = rentPeriod * dailyFees;
            if (v.getStartDate().equals("free"))
                throw new NoCancellationYouMustPayException("this reservation cancelled period ago");
            CancellationModel cancellation = new CancellationModel(v.getPlateNum(), v.getStartDate(), v.getEndDate(),
                    reservation.getUser(), reservation.getCustomer(), new Drop(allFees, dailyFees, rentPeriod));
            if (!checkTheCarExisting(v.getEndDate()))
                return CompletableFuture.completedFuture(new VehicleResponse(cancellation, "note that you didn't end your reservation yet"));

            v.setStartDate("free");
            v.setEndDate("free");
            vehicleTransactionRepository.save(v);
            return CompletableFuture.completedFuture(new VehicleResponse(cancellation, "returning done successfully"));
        }
        throw new NoCancellationYouMustPayException("no reservation for this vehicle ");
    }

    @Async
    public CompletableFuture<List<Truck>> loadMe(int amount) throws OverWeightException {
        List<Truck> availableTrucks = truckRepository.findAll().stream().filter(truck -> truck.getLoadingCap() >= amount).collect(Collectors.toList());

        if (availableTrucks.isEmpty()) throw new OverWeightException("the amount is too heavy");
        return CompletableFuture.completedFuture(availableTrucks);

    }
}

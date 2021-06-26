package com.all.Projectforall.repos.vehicle_hiring.vehicles.cars;

import com.all.Projectforall.entitys.vehicle_hiring.vehicles.cars.Sports;
import com.all.Projectforall.repos.vehicle_hiring.vehicles.CarRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SportCarRepository extends JpaRepository<Sports,Long> {
    Optional<Sports>findByPlateNumber(String plateNumber);
}

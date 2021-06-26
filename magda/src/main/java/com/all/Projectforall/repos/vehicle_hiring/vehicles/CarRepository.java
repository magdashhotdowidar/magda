package com.all.Projectforall.repos.vehicle_hiring.vehicles;

import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Car;
import com.all.Projectforall.repos.vehicle_hiring.VehicleRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car,Long> {
}

package com.all.Projectforall.repos.vehicle_hiring;

import com.all.Projectforall.entitys.vehicle_hiring.VehicleTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VehicleTransactionRepository extends JpaRepository<VehicleTransaction, Long> {
    Optional<VehicleTransaction>findByPlateNum(String plateNum);
}

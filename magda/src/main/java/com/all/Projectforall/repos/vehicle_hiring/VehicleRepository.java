package com.all.Projectforall.repos.vehicle_hiring;

import com.all.Projectforall.entitys.vehicle_hiring.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
    Optional<Vehicle> findByPlateNumber(String plateNum);
    List<Vehicle>findByPlateNumberLikeOrVehicleTypeLike(String plateNumber,String vehicleType);
    List<Vehicle>findByVehicleTypeLike(String type);

    @Modifying
    @Query(value = "delete from Vehicle v where  v.plateNumber is null ")
    void deleteAllByPlateNumberIsNull();

    @Query("select v.plateNumber,v.dailyFee from Vehicle v")
    public List<Object[]>chartData();
}

package com.all.Projectforall.repos.vehicle_hiring.transacations;

import com.all.Projectforall.entitys.vehicle_hiring.transactionTables.Cancellation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CancellationRepository extends JpaRepository<Cancellation, Integer> {
    Optional<Cancellation> findByPlateNumAndStartDateAndEndDateAndEmployeeAndCustomer(String plateNum,String startDate,String endDate,String employee,String customer);


 /*   @Modifying
    @Query(value = "delete from Vehicle v where  v.plateNumber is null ")
    void deleteAllByPlateNumberIsNull();*/
}

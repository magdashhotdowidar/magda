package com.all.Projectforall.repos.vehicle_hiring.transacations;

import com.all.Projectforall.entitys.vehicle_hiring.transactionTables.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    Optional<Reservation> findByPlateNumAndStartDateAndEndDateAndEmployeeAndCustomer(String plateNumber, String startDate, String endDate, String employee, String customer);
    Optional<Reservation> findByPlateNumAndStartDateAndEndDate(String plateNumber, String startDate, String endDate);
    List<Reservation> findByReservationType(String type);


/*    @Modifying
    @Query(value = "delete from Vehicle v where  v.plateNumber is null ")
    void deleteAllByPlateNumberIsNull();*/
}

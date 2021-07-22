package com.all.Projectforall.repos.vehicle_hiring.transacations;

import com.all.Projectforall.entitys.vehicle_hiring.transactionTables.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {

}

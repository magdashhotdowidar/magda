package com.all.Projectforall.entitys.vehicle_hiring.vehicles.trucks;

import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Truck;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "small_truck")
@PrimaryKeyJoinColumn(name = "id")
public class SmallTruck extends Truck {
}

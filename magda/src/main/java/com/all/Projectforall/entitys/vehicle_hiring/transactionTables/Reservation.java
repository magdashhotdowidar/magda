package com.all.Projectforall.entitys.vehicle_hiring.transactionTables;

import com.all.Projectforall.entitys.vehicle_hiring.VehicleTransaction;
import com.all.Projectforall.models.vehicle_hiring.ReservationModel;

import javax.persistence.*;

@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String plateNum;
    private String startDate;
    private String endDate;
    private String employee;
    private String customer;
    private String reservationType;
    @ManyToOne
    @JoinColumn(name = "transaction_id")
    private VehicleTransaction vehicleTransaction;

    @OneToOne(mappedBy = "reservation")
    private Location location;

    public Reservation() {
    }
    public Reservation(ReservationModel reservation) {
        this.plateNum=reservation.getPlateNum();
        this.startDate=reservation.getStartDate();
        this.endDate=reservation.getEndDate();
        this.employee=reservation.getUser();
        this.customer=reservation.getCustomer();
        this.reservationType=reservation.getReservationType();
    }

    public Reservation(String plateNum, String startDate, String endDate, String user, String customer,String reservationType) {
        this.plateNum = plateNum;
        this.startDate = startDate;
        this.endDate = endDate;
        this.employee = user;
        this.customer = customer;
        this.reservationType=reservationType;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPlateNum() {
        return plateNum;
    }

    public void setPlateNum(String plateNum) {
        this.plateNum = plateNum;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getUser() {
        return employee;
    }

    public void setUser(String user) {
        this.employee = user;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public VehicleTransaction getVehicleTransaction() {
        return vehicleTransaction;
    }

    public void setVehicleTransaction(VehicleTransaction vehicleTransaction) {
        this.vehicleTransaction = vehicleTransaction;
    }

    public String getReservationType() {
        return reservationType;
    }

    public void setReservationType(String reservationType) {
        this.reservationType = reservationType;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "plateNum='" + plateNum + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", user='" + employee + '\'' +
                ", customer='" + customer + '\'' +
                ", reservationType='" + reservationType + '\'' +
                '}';
    }
}

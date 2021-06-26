package com.all.Projectforall.entitys.vehicle_hiring;

import javax.persistence.*;

@Entity
@Table(name = "vehicles_trans")
public class VehicleTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transId;
    private String plateNum;
    private String startDate;
    private String endDate;
    private String location;
    private int totalFees;
    private boolean rented;
    private boolean booked;
    private boolean canceled;

    public VehicleTransaction() {
    }

    public VehicleTransaction(String plateNum, String startDate, String endDate, String location, boolean rented, boolean booked, boolean canceled) {
        this.plateNum = plateNum;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.rented = rented;
        this.booked = booked;
        this.canceled = canceled;
    }
    public VehicleTransaction(String plateNum, String startDate, String endDate) {
        this.plateNum = plateNum;
        this.startDate = startDate;
        this.endDate = endDate;
        this.rented = true;
        this.booked = true;
        this.canceled = false;
    }
    public VehicleTransaction(String plateNum, String startDate, String endDate,String location) {
        this.plateNum = plateNum;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location=location;
        this.rented = true;
        this.booked = true;
        this.canceled = false;
    }

    public int getTransId() {
        return transId;
    }

    public void setTransId(int transId) {
        this.transId = transId;
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

    public boolean isRented() {
        return rented;
    }

    public void setRented(boolean rented) {
        this.rented = rented;
    }

    public boolean isBooked() {
        return booked;
    }

    public void setBooked(boolean booked) {
        this.booked = booked;
    }

    public boolean isCanceled() {
        return canceled;
    }

    public void setCanceled(boolean canceled) {
        this.canceled = canceled;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPlateNum() {
        return plateNum;
    }

    public void setPlateNum(String plateNum) {
        this.plateNum = plateNum;
    }

    public int getTotalFees() {
        return totalFees;
    }

    public void setTotalFees(int totalFees) {
        this.totalFees = totalFees;
    }

    @Override
    public String toString() {
        return "VehicleTransaction{" +
                "transId=" + transId +
                ", plateNum='" + plateNum + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", location='" + location + '\'' +
                ", totalFees=" + totalFees +
                ", rented=" + rented +
                ", booked=" + booked +
                ", canceled=" + canceled +
                '}';
    }
}

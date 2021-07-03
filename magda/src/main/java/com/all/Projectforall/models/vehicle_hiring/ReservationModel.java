package com.all.Projectforall.models.vehicle_hiring;

import com.all.Projectforall.entitys.vehicle_hiring.transactionTables.Reservation;

public class ReservationModel {
    private String plateNum;
    private String startDate;
    private String endDate;
    private String user;
    private String customer;
    private String reservationType;

    public ReservationModel(Reservation reservation) {
        this.plateNum=reservation.getPlateNum();
        this.startDate=reservation.getStartDate();
        this.endDate=reservation.getEndDate();
        this.user=reservation.getUser();
        this.customer=reservation.getCustomer();
        this.reservationType=reservation.getReservationType();
    }

    public ReservationModel(String plateNum, String startDate, String endDate, String user, String customer, String reservationType) {
        this.plateNum = plateNum;
        this.startDate = startDate;
        this.endDate = endDate;
        this.user = user;
        this.customer = customer;
        this.reservationType = reservationType;
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
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getReservationType() {
        return reservationType;
    }

    public void setReservationType(String reservationType) {
        this.reservationType = reservationType;
    }

    @Override
    public String toString() {
        return "ReservationModel{" +
                "plateNum='" + plateNum + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", user='" + user + '\'' +
                ", customer='" + customer + '\'' +
                ", reservationType='" + reservationType + '\'' +
                '}';
    }
}

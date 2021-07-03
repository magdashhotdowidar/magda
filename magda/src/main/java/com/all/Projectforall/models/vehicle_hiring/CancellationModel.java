package com.all.Projectforall.models.vehicle_hiring;

import com.all.Projectforall.entitys.vehicle_hiring.transactionTables.Cancellation;

public class CancellationModel {
    private String plateNum;
    private String startDate;
    private String endDate;
    private String user;
    private String customer;
    private Drop drop;

    public CancellationModel(Cancellation cancellation) {
        this.plateNum=cancellation.getPlateNum();
        this.startDate=cancellation.getStartDate();
        this.endDate=cancellation.getEndDate();
        this.user=cancellation.getEmployee();
        this.customer=cancellation.getCustomer();
    }

    public CancellationModel(String plateNum, String startDate, String endDate, String user, String customer,Drop drop) {
        this.plateNum = plateNum;
        this.startDate = startDate;
        this.endDate = endDate;
        this.user = user;
        this.customer = customer;
        this.drop=drop;
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

    public Drop getDrop() {
        return drop;
    }

    @Override
    public String toString() {
        return "CancellationModel{" +
                "plateNum='" + plateNum + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", user='" + user + '\'' +
                ", customer='" + customer + '\'' +
                '}';
    }
}



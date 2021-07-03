package com.all.Projectforall.models.vehicle_hiring;

import com.all.Projectforall.entitys.vehicle_hiring.VehicleTransaction;

public class VehicleTransactionModel {
    private String plateNum;
    private String startDate;
    private String endDate;

    public VehicleTransactionModel(VehicleTransaction transaction) {
        this.plateNum = transaction.getPlateNum();
        this.startDate = transaction.getStartDate();
        this.endDate = transaction.getEndDate();
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

    @Override
    public String toString() {
        return "VehicleTransactionModel{" +
                "plateNum='" + plateNum + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                '}';
    }
}

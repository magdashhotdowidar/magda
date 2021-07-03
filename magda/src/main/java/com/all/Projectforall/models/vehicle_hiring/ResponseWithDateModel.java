package com.all.Projectforall.models.vehicle_hiring;

public class ResponseWithDateModel {
    private String plateNum;
    private String startDate;
    private String endDate;
    private String user;
    private String customer;

    public ResponseWithDateModel() {
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public String getUser() {
        return user;
    }

    public String getCustomer() {
        return customer;
    }

    public String getPlateNum() {
        return plateNum;
    }
}

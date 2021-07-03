package com.all.Projectforall.models.vehicle_hiring;

public class Drop{
    private int allFees;
    private int dailyFees;
    private int rentPeriod;

    public Drop(int allFees,int dailyFees, int rentPeriod) {
        this.allFees = allFees;
        this.rentPeriod = rentPeriod;
        this.dailyFees=dailyFees;
    }

    public int getAllFees() {
        return allFees;
    }

    public int getRentPeriod() {
        return rentPeriod;
    }

    public int getDailyFees() {
        return dailyFees;
    }
}

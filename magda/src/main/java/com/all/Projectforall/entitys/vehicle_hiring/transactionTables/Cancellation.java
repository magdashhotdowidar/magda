package com.all.Projectforall.entitys.vehicle_hiring.transactionTables;

import com.all.Projectforall.entitys.vehicle_hiring.VehicleTransaction;
import com.all.Projectforall.models.vehicle_hiring.CancellationModel;

import javax.persistence.*;

@Entity
@Table(name = "cancellations")
public class Cancellation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String plateNum;
    private String startDate;
    private String endDate;
    private String employee;
    private String customer;

    @ManyToOne
    @JoinColumn(name = "transaction_id")
    private VehicleTransaction vehicleTransaction;

    public Cancellation() {
    }

    public Cancellation(CancellationModel cancellation) {
        this.plateNum=cancellation.getPlateNum();
        this.startDate=cancellation.getStartDate();
        this.endDate=cancellation.getEndDate();
        this.employee=cancellation.getUser();
        this.customer=cancellation.getCustomer();
    }

    public Cancellation(String plateNum, String startDate, String endDate, String user, String customer) {
        this.plateNum = plateNum;
        this.startDate = startDate;
        this.endDate = endDate;
        this.employee = user;
        this.customer = customer;
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

    public String getEmployee() {
        return employee;
    }

    public void setEmployee(String employee) {
        this.employee = employee;
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
}

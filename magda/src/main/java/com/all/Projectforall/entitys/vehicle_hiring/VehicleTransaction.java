package com.all.Projectforall.entitys.vehicle_hiring;

import com.all.Projectforall.entitys.vehicle_hiring.transactionTables.Cancellation;
import com.all.Projectforall.entitys.vehicle_hiring.transactionTables.Reservation;
import com.all.Projectforall.models.vehicle_hiring.VehicleTransactionModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vehicles_trans")
public class VehicleTransaction {
    //important important note when the class have many relations of type one to many make fetchType lazy to avoid the exception
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transId;
    private String plateNum;
    private String startDate;
    private String endDate;

    @OneToMany(mappedBy = "vehicleTransaction", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Reservation>reservations;

    @OneToMany(mappedBy = "vehicleTransaction", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Cancellation> cancellations;


    public VehicleTransaction() {
    }
    public void add_reservation(Reservation reservation) {
        if (reservation != null) {
            if (reservations == null) reservations = new ArrayList<>();
            reservation.setVehicleTransaction(this);//set the foreign key
            reservations.add(reservation);
        }
    }

    public void add_cancellation(Cancellation cancellation) {
        if (cancellations != null) {
            if (cancellations == null) cancellations = new ArrayList<>();
            cancellation.setVehicleTransaction(this);//set the foreign key
            cancellations.add(cancellation);
        }
    }

    public VehicleTransaction(VehicleTransactionModel transaction) {
        this.plateNum = transaction.getPlateNum();
        this.startDate = transaction.getStartDate();
        this.endDate = transaction.getEndDate();
    }


    public VehicleTransaction(String plateNum, String startDate, String endDate) {
        this.plateNum = plateNum;
        this.startDate = startDate;
        this.endDate = endDate;
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

    public String getPlateNum() {
        return plateNum;
    }

    public void setPlateNum(String plateNum) {
        this.plateNum = plateNum;
    }

    public List<Reservation> getReservations() {
        if (reservations==null)return new ArrayList<>();
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    public List<Cancellation> getCancellations() {
        if (cancellations ==null)return new ArrayList<>();
        return cancellations;
    }

    public void setCancellations(List<Cancellation> cancellations) {
        this.cancellations = cancellations;
    }

    @Override
    public String toString() {
        return "VehicleTransaction{" +
                "plateNum='" + plateNum + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                '}';
    }
}

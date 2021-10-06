package com.all.Projectforall.models.clinic;

import com.all.Projectforall.entitys.clinic.Appointment;

import java.sql.Timestamp;

public class AppointmentModel {
    private int id;
    private String appointmentTime;
    private String appointmentDate;
    private String registrationDate;
    private boolean started;
    private boolean ended;
    private String reason;
    private String doctor;
    private String patient;

    public AppointmentModel() {
    }

    public AppointmentModel(Appointment appointment) {
        this.id=appointment.getId();
        this.appointmentTime = appointment.getAppointmentTime();
        this.appointmentDate=appointment.getAppointmentDate();
        this.registrationDate=appointment.getRegistrationDate();
        this.doctor=appointment.getDoctor().getFirstName()+" "+appointment.getDoctor().getLastName();
        this.patient=appointment.getPatient().getFirstName()+" "+appointment.getPatient().getLastName();
        this.started = appointment.isStarted();
        this.ended = appointment.isEnded();
        this.reason = appointment.getReason();
    }

    public String getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(String appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public boolean isStarted() {
        return started;
    }

    public void setStarted(boolean started) {
        this.started = started;
    }

    public boolean isEnded() {
        return ended;
    }

    public void setEnded(boolean ended) {
        this.ended = ended;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public String getPatient() {
        return patient;
    }

    public void setPatient(String patient) {
        this.patient = patient;
    }

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(String registrationDate) {
        this.registrationDate = registrationDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "AppointmentModel{" +
                "appointmentTime=" + appointmentTime +
                ", started=" + started +
                ", ended=" + ended +
                ", reason='" + reason + '\'' +
                ", doctor='" + doctor + '\'' +
                ", patient='" + patient + '\'' +
                '}';
    }
}

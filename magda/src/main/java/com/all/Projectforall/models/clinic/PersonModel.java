package com.all.Projectforall.models.clinic;

import com.all.Projectforall.entitys.clinic.Appointment;
import com.all.Projectforall.entitys.clinic.Doctor;
import com.all.Projectforall.entitys.clinic.Patient;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

public class PersonModel {
    private String firstName;
    private String lastName;
    private String objectType;
    private String phone;
    private String doctor;
    private String speciality;
    private List<PatientModel> patients;
    private List<AppointmentModel> appointments;
    public PersonModel() {
    }

    public PersonModel(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public PersonModel(Doctor doctor) {
        this(doctor.getFirstName(), doctor.getLastName());
        this.speciality = doctor.getSpeciality();
        if(!doctor.getPatients().isEmpty()||doctor.getPatients()==null)
        this.patients = doctor.getPatients().stream().map(PatientModel::new).collect(Collectors.toList());
        if(!doctor.getAppointments().isEmpty()||doctor.getAppointments()==null)
        this.appointments = doctor.getAppointments().stream().map(AppointmentModel::new).collect(Collectors.toList());
    }

    public PersonModel(Patient patient) {
        this(patient.getFirstName(), patient.getLastName());
        this.phone = patient.getPhone();
        this.doctor = patient.getDoctor().getFirstName() + " " + patient.getDoctor().getLastName();
        this.appointments = patient.getAppointments().stream().map(AppointmentModel::new).collect(Collectors.toList());
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getObjectType() {
        return objectType;
    }

    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public String getSpeciality() {
        return speciality;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    public List<PatientModel> getPatients() {
        return patients;
    }

    public void setPatients(List<PatientModel> patients) {
        this.patients = patients;
    }

    public List<AppointmentModel> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<AppointmentModel> appointments) {
        this.appointments = appointments;
    }

    @Override
    public String toString() {
        return "PersonModel{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", objectType='" + objectType + '\'' +
                ", phone='" + phone + '\'' +
                ", doctor='" + doctor + '\'' +
                ", speciality='" + speciality + '\'' +
                '}';
    }
}

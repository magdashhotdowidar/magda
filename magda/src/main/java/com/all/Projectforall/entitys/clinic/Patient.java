package com.all.Projectforall.entitys.clinic;

import com.all.Projectforall.models.clinic.PersonModel;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Size(min = 3,message = "name should have at least 3 character")
    private String firstName;
    @Size(min = 3,message = "name should have at least 3 character")
    private String lastName;
    private String phone;

    //this relationship should be @ManyToMany but as you asked me to determine it to one doctor it set it to @ManyToOne
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Appointment> appointments;

    public void add_appointment(Appointment appointment) {
        if (appointment != null) {
            if (appointments == null) appointments = new ArrayList<>();
            appointment.setPatient(this);//set the foreign key
            appointments.add(appointment);
        }
    }

    public Patient() {
    }

    public Patient(PersonModel patient) {
        this.firstName = patient.getFirstName();
        this.lastName = patient.getLastName();
        this.phone = patient.getPhone();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phone='" + phone + '\'' +
                ", doctor='" + doctor.getFirstName() + '\'' +
                '}';
    }
}

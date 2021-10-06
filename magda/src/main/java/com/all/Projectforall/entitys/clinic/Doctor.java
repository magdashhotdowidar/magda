package com.all.Projectforall.entitys.clinic;

import com.all.Projectforall.models.clinic.PersonModel;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Size(min = 3,message = "name should have at least 3 character")
    private String firstName;
    @Size(min = 3,message = "name should have at least 3 character")
    private String lastName;
    @Size(min = 2,message = "name should have at least 2 character")
    private String speciality;

    //this relationship should be @ManyToMany but as you asked me to determine it to one doctor it set it to @OneToMany
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Patient> patients;
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Appointment> appointments;

    public void add_patient(Patient patient) {
        if (patient != null) {
            if (patients == null) patients = new ArrayList<>();
            patient.setDoctor(this);//set the foreign key
            patients.add(patient);
        }
    }
    public void add_appointment(Appointment appointment) {
        if (appointment != null) {
            if (appointments == null) appointments = new ArrayList<>();
            appointment.setDoctor(this);//set the foreign key
            appointments.add(appointment);
        }
    }

    public Doctor() {
    }

    public Doctor(PersonModel doctor) {
        this.firstName = doctor.getFirstName();
        this.lastName = doctor.getLastName();
        this.speciality = doctor.getSpeciality();
    }

    public Doctor(@Size(min = 3, message = "name should have at least 3 character") String firstName,
                  @Size(min = 3, message = "name should have at least 3 character") String lastName,
                  @Size(min = 2, message = "name should have at least 2 character") String speciality) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.speciality = speciality;
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

    public String getSpeciality() {
        return speciality;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    public List<Patient> getPatients() {
        return patients;
    }

    public void setPatients(List<Patient> patients) {
        this.patients = patients;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    @Override
    public String toString() {
        return "Doctor{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", speciality='" + speciality + '\'' +
                '}';
    }
}

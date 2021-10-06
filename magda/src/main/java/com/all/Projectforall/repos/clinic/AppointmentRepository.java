package com.all.Projectforall.repos.clinic;

import com.all.Projectforall.entitys.clinic.Appointment;
import com.all.Projectforall.entitys.clinic.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    List<Appointment> findByAppointmentDate(String appointmentDate);
    List<Appointment>findByAppointmentDateIsNull();
    List<Appointment> findByPatient(Patient patient);
    Optional<Appointment> findByPatient_FirstNameLikeOrPatient_LastNameLikeAndAppointmentDate(String firstName ,String lastName, String appointmentDate);
}

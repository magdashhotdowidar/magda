package com.all.Projectforall.services.clinic;


import com.all.Projectforall.configuration.TestClass;
import com.all.Projectforall.entitys.clinic.Appointment;
import com.all.Projectforall.entitys.clinic.Doctor;
import com.all.Projectforall.entitys.clinic.Patient;
import com.all.Projectforall.models.clinic.AppointmentModel;
import com.all.Projectforall.repos.clinic.AppointmentRepository;
import com.all.Projectforall.repos.clinic.DoctorRepository;
import com.all.Projectforall.repos.clinic.PatientRepository;
import com.all.Projectforall.responses.ClinicResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository repo;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PatientRepository patientRepository;


    public CompletableFuture<List<AppointmentModel>> getAllAppointmentsHistory() {
        List<AppointmentModel> appointments = repo.findAll()
                .stream().map(AppointmentModel::new).collect(Collectors.toList());
        return CompletableFuture.completedFuture(appointments);

    }

    public CompletableFuture<List<AppointmentModel>> getAllAppointmentsRegisteredOnline() {
        List<AppointmentModel> appointments = repo.findByAppointmentDateIsNull()
                .stream().map(AppointmentModel::new).collect(Collectors.toList());
        return CompletableFuture.completedFuture(appointments);

    }

    public CompletableFuture<List<AppointmentModel>> getAllAppointmentsToday() {
        List<AppointmentModel> appointments = repo.findByAppointmentDate(TestClass.obj2.format(new Date()))
                .stream().map(AppointmentModel::new).collect(Collectors.toList());
        return CompletableFuture.completedFuture(appointments);

    }

    public CompletableFuture<List<AppointmentModel>> getAllAppointmentsByDate(String appointmentTime) {
        List<AppointmentModel> appointments = repo.findByAppointmentDate(appointmentTime)
                .stream().map(AppointmentModel::new).collect(Collectors.toList());
        return CompletableFuture.completedFuture(appointments);

    }

    public CompletableFuture<ClinicResponse> getAllAppointmentsByPatient(String patientName) {
        Patient patient = patientRepository.findByFirstNameLikeOrLastNameLike(patientName.split(" ")[0], patientName.split(" ")[1]).get(0);
        List<AppointmentModel> appointments = repo
                .findByPatient(patient).stream().map(AppointmentModel::new).collect(Collectors.toList());
        return CompletableFuture.completedFuture(new ClinicResponse(appointments, "success"));

    }


    public CompletableFuture<ClinicResponse> addAppointment(AppointmentModel obj) {
        Appointment appointment = new Appointment(obj);
        Doctor doctor = doctorRepository.findByFirstNameLikeOrLastNameLike(obj.getDoctor().split(" ")[0], obj.getDoctor().split(" ")[1]).get(0);
        appointment.setDoctor(doctor);
        Patient patient = patientRepository.findByFirstNameLikeOrLastNameLike(obj.getPatient().split(" ")[0], obj.getPatient().split(" ")[1]).get(0);
        appointment.setPatient(patient);
        repo.save(appointment);

        return CompletableFuture.completedFuture(new ClinicResponse("success"));

    }

    @Transactional
    public CompletableFuture<ClinicResponse> cancelAppointment(String patient, String appointmentDate) throws ClassNotFoundException {
        Appointment appointment = repo
                .findByPatient_FirstNameLikeOrPatient_LastNameLikeAndAppointmentDate("%" + patient.split(" ")[0] + "%", "%" + patient.split(" ")[1] + "%", appointmentDate)
                .orElseThrow(() -> new ClassNotFoundException("object not fount"));
        repo.delete(appointment);

        return CompletableFuture.completedFuture(new ClinicResponse("success"));
    }


}

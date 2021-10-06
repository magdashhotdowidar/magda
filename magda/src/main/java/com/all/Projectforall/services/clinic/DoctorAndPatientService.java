package com.all.Projectforall.services.clinic;


import com.all.Projectforall.entitys.clinic.Appointment;
import com.all.Projectforall.entitys.clinic.Doctor;
import com.all.Projectforall.entitys.clinic.Patient;
import com.all.Projectforall.exceptions.custExcep.NoCancellationYouMustPayException;
import com.all.Projectforall.models.clinic.PersonModel;
import com.all.Projectforall.repos.clinic.DoctorRepository;
import com.all.Projectforall.repos.clinic.PatientRepository;
import com.all.Projectforall.responses.ClinicResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.concurrent.CompletableFuture;

@Service
public class DoctorAndPatientService {

    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PatientRepository patientRepository;



    public CompletableFuture<ClinicResponse> addDoctor(PersonModel doctor) throws IllegalArgumentException {
        if (doctor.getFirstName().length()<3||doctor.getLastName().length()<3)
            throw new IllegalArgumentException("name should have at least 3 character");
         String message = "";
         Doctor obj = new Doctor(doctor);

         if (doctorRepository.save(obj) != null) message = "success";
         else message = "fail";

         return CompletableFuture.completedFuture(new ClinicResponse(message));

    }
    @Transactional
    public CompletableFuture<ClinicResponse> addPatient(PersonModel patient) throws NoCancellationYouMustPayException {
        if (patient.getFirstName().length()<3||patient.getLastName().length()<3)
            throw new NoCancellationYouMustPayException("name should have at least 3 character");
        String message = "";
        Patient obj = new Patient(patient);
       Doctor doctor= doctorRepository.findByFirstNameLikeOrLastNameLike(patient.getDoctor().split(" ")[0],patient.getDoctor().split(" ")[1]).get(0);
       if (doctor==null)throw new NoSuchElementException("this doctor name not exist");
        obj.setDoctor(doctor);
        if (patientRepository.save(obj) != null) message = "success";
        else message = "fail";

        return CompletableFuture.completedFuture(new ClinicResponse(message));

    }

    public CompletableFuture<String>deleteDoctor(String name){
        String message = "";
        Doctor obj=doctorRepository.findByFirstNameLike("%"+name+"%").get();

        if (obj != null) {
            doctorRepository.delete(obj);
            message = "success";
        } else message = "fail";
        return CompletableFuture.completedFuture(message);
    }

    public CompletableFuture<String>deletePatient(String name){
        String message = "";
        Patient obj=patientRepository.findByFirstNameLike(name).get();

        if (obj != null) {
            patientRepository.delete(obj);
            message = "success";
        } else message = "fail";
        return CompletableFuture.completedFuture(message);
    }

}

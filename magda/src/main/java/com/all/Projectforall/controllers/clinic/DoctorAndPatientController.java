package com.all.Projectforall.controllers.clinic;

import com.all.Projectforall.exceptions.custExcep.NoCancellationYouMustPayException;
import com.all.Projectforall.models.clinic.PersonModel;
import com.all.Projectforall.repos.clinic.DoctorRepository;
import com.all.Projectforall.repos.clinic.PatientRepository;
import com.all.Projectforall.responses.ClinicResponse;
import com.all.Projectforall.services.clinic.DoctorAndPatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/clinic/doctorAndPatient")
public class DoctorAndPatientController {

    @Autowired
    private DoctorAndPatientService service;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PatientRepository patientRepository;

    @PostMapping()
    public CompletableFuture<ResponseEntity<ClinicResponse>> addDoctor(@Valid @RequestBody PersonModel obj) throws NoCancellationYouMustPayException {
        if (obj.getObjectType().equalsIgnoreCase("doctor")) return service.addDoctor( obj).thenApply(ResponseEntity::ok);
            else return service.addPatient(obj).thenApply(ResponseEntity::ok);
    }

    @DeleteMapping("/{name}")//here i used header to practice it .it was possible to use @pathVariable
    public CompletableFuture<ResponseEntity<String>> deleteDoctor(@PathVariable(value = "name") String name, @RequestHeader("personType")String objectTyp) {
        if(objectTyp.equals("doctor")) return service.deleteDoctor(name).thenApply(ResponseEntity::ok);
        else return service.deletePatient(name).thenApply(ResponseEntity::ok);
    }
    @GetMapping("searchByDoctorNames/{value}")
    @Transactional
    public ResponseEntity<List<PersonModel>> getDoctorByNames(@PathVariable("value") String doctor) {
        return ResponseEntity.ok().body(doctorRepository.findByFirstNameLikeOrLastNameLike("%" + doctor + "%", "%" + doctor + "%")
                                                         .stream().map(PersonModel::new).collect(Collectors.toList()));
    }
    @GetMapping("searchByPatientNames/{value}")
    @Transactional
    public ResponseEntity<List<PersonModel>> getPatientByNames(@PathVariable("value") String patient) {
        return ResponseEntity.ok().body(patientRepository.findByFirstNameLikeOrLastNameLike("%" + patient + "%", "%" + patient + "%")
                .stream().map(PersonModel::new).collect(Collectors.toList()));
    }


}
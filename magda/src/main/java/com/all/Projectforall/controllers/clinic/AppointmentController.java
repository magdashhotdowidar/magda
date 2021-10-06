package com.all.Projectforall.controllers.clinic;

import com.all.Projectforall.models.clinic.AppointmentModel;
import com.all.Projectforall.responses.ClinicResponse;
import com.all.Projectforall.services.clinic.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/clinic")
public class AppointmentController {

    @Autowired
    private AppointmentService service;


    @GetMapping("AllAppointmentsHistory")
    public CompletableFuture<ResponseEntity<List<AppointmentModel>>>getAllAppointmentsHistory() {
        return service.getAllAppointmentsHistory().thenApply(ResponseEntity::ok);
    }

    @GetMapping("AllAppointmentsRegisteredOnline")
    public CompletableFuture<ResponseEntity<List<AppointmentModel>>>getAllAppointmentsRegisteredOnline() {
        return service.getAllAppointmentsRegisteredOnline().thenApply(ResponseEntity::ok);
    }

    @GetMapping("AllAppointmentsToday")
    public CompletableFuture<ResponseEntity<List<AppointmentModel>>>getAllAppointmentsToday() {
        return service.getAllAppointmentsToday().thenApply(ResponseEntity::ok);
    }

    @GetMapping("/AllAppointmentsByDate/{date}")
    public CompletableFuture<ResponseEntity<List<AppointmentModel>>>getAllAppointmentsByDate(@PathVariable(value = "date") String date) {
        return service.getAllAppointmentsByDate(date).thenApply(ResponseEntity::ok);
    }
    @GetMapping("/AllAppointmentsByPatient/{patient}")
    public CompletableFuture<ResponseEntity<ClinicResponse>>getAllAppointmentsByPatient(@PathVariable(value = "patient") String patient) {
        return service.getAllAppointmentsByPatient(patient).thenApply(ResponseEntity::ok);
    }

    @PostMapping()
    public CompletableFuture<ClinicResponse> addAppointment(@Valid @RequestBody AppointmentModel appointment) {
        return service.addAppointment(appointment);
    }

    @DeleteMapping("/{patient}/{date}")
    public CompletableFuture<ClinicResponse> cancelAppointment(@PathVariable(value = "patient") String patient,
                                                @PathVariable(value = "date") String date) throws ClassNotFoundException {
        return service.cancelAppointment(patient,date);
    }

}
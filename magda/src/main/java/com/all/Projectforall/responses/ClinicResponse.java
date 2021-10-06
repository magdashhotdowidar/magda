package com.all.Projectforall.responses;

import com.all.Projectforall.models.clinic.AppointmentModel;

import java.util.List;

public class ClinicResponse {
    private String message;
    private List<AppointmentModel>appointments;

    public ClinicResponse(String message){
        this.message=message;
    }
    public ClinicResponse(List<AppointmentModel>appointments,String message){
        this(message);
        this.appointments=appointments;
    }
    public String getMessage(){
        return this.message;
    }

    public List<AppointmentModel> getAppointments() {
        return appointments;
    }
}

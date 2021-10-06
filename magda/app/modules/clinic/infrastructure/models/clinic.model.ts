export class PersonDto {

  public firstName?: string='';
  public lastName?: string='';
  public objectType?: string='';
  public phone?: string='';
  public doctor?: string='';
  public speciality?: string='';
  public appointments?: AppointmentDto[]=[];

}
export class PatientDto extends PersonDto {}

export class DoctorDto extends PersonDto {
  public patients?: PatientDto[]=[];
}

export class AppointmentDto {
  constructor(
    public id?:number,
    public appointmentTime?:string,
    public appointmentDate?: string,
    public registrationDate?: string,
    public reason?: string,
    public doctor?: string,
    public patient?: string,
    public started?: boolean,
    public ended?: boolean
  ) {}
}
export class ClinicResponseDto {
  constructor(public message?:string,
              public appointments?:AppointmentDto[]){}
}

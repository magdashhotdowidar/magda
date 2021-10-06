export class AlertInput {
  static SUCCESS_STATUS: string = 's';
  static FAILURE_STATUS: string = 'f';
  static WARNING_STATUS: string = 'w';

  status: string;
  errorCode: string;
  appear: boolean = false;
  data = [];

  constructor(status?: string, errorCode?: string, data?){
    this.status = status;
    this.errorCode = errorCode;
    this.data = data;

    if(this.status != null && this.errorCode != null) {
      this.appear = true;
      setTimeout(() => this.appear = false, 5000);
    }
  }
}

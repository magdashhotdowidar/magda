import {AlertInput} from "./alert-input";
import {HttpErrorResponse} from "@angular/common/http";

export class FailureAlert extends AlertInput {

  constructor(error?: HttpErrorResponse, errorCode?: string) {
    if (error!=null &&error.error != null)
      super('f', 'errorCodes.globalError', [error.error]);
    if (errorCode != null)
      super('f', 'errorCodes.' + errorCode);
    else
      super('f', 'errorCodes.internalError')
  }
}

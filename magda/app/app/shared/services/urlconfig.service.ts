import {Injectable} from '@angular/core';
import {Modules} from "../enums/modules.enum";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class URLConfigService {

  IS_LOCAL_ENVIRONMENT: boolean;
  private configs: AdaayConfig = new AdaayConfig();

  constructor() {
  }

  loadAppConfig() {
    this.IS_LOCAL_ENVIRONMENT = environment.localEnvironment;
    this.configs.P_URL=environment.pURL;
    this.configs.CH_URL=environment.chURL;
  }

  getApiUrl(moduleName?: Modules) {

    switch (moduleName) {
      case Modules.P:
        return environment.pURL;
      case Modules.CH:
        return environment.chURL;
      case Modules.U:
        return environment.uURL;
    }
  }

  getIsLocalEnvironment() {
    return environment.localEnvironment;
  }
}


export class AdaayConfig {
  P_URL: string;
  CH_URL: string;
}

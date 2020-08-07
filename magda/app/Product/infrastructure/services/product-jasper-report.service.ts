import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from "../models/product";
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";

@Injectable({
  providedIn: 'root'
})
export class ProductJasperReportService {

  private baseUrl = this.urlConfigService.getApiUrl(Modules.P) + 'report';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  generateReport(format:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${format}`,{responseType: 'text'} );
  }
}


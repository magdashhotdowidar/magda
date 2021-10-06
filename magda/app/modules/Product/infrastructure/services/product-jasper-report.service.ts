import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";

@Injectable({
  providedIn: 'root'
})
export class ProductJasperReportService {

  private baseUrl = this.urlConfigService.getApiUrl(Modules.P) + 'product/report';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  generateReport(format:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${format}/${localStorage.getItem(LocalStorage.userName)}`,{responseType: 'text'} );
  }
}


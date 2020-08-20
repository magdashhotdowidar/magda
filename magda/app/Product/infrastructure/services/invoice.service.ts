import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invoice} from "../models/invoice.model";
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";
import {InvoiceResponse} from "../models/invoiceResponse.model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  // private baseUrl = 'http://localhost:8081/springboot-crud-rest/api/invoice';
  private baseUrl = this.urlConfigService.getApiUrl(Modules.P) + 'invoice';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  getInvoice(invoiceNo:number, date: string): Observable<any> {

    return this.http.get(`${this.baseUrl}/${invoiceNo}/${date}`).pipe(map(invoice => {
      if (!invoice['productModels']) {
        invoice['productModels'] = [];
      }
      return invoice;
    }));
  }
/*  getInvoiceByInvoiceNoAndDateAndTime(invoiceNo:number, date: string,time:string): Observable<InvoiceResponse> {

    return this.http.get<InvoiceResponse>(`${this.baseUrl}/${invoiceNo}/${date}/${time}`).pipe(map(invoice => {
      if (!invoice['productModels']) {
        invoice['productModels'] = [];
      }
      return invoice;
    }));
  }*/

  createInvoice(invoice: Invoice): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, invoice);
  }

  /*  updateProduct(name: string, value: any): Observable<Object> {
      return this.http.put(`${this.baseUrl}/${name}`, value);
    }*/

  deleteInvoice(invoiceNo:number, date: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${invoiceNo}/${date}`, {responseType: 'json'});
  }

  deleteAllInvoices(): Observable<any> {
    return this.http.delete(`${this.baseUrl}`, {responseType: 'text'});
  }

  getChartData():Observable<ChartData[]>{
    return this.http.get<ChartData[]>(`${this.baseUrl}/chartData`)
  }

  getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}`).pipe(map(
      (invoices: Invoice[]) => {

        for (let invoice of invoices) {
          if (!invoice['productModels']) {
            invoice['productModels'] = [];
          }
        }
        return invoices;
      }));
  }

}

/////////////////////////////////////////
export class ChartData {
 public name:string;
 public count:number;

  constructor(name: string, count: number) {
    this.name = name;
    this.count = count;
  }
}

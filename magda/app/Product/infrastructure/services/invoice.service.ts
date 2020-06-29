import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invoice} from "../models/invoice.model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = 'http://localhost:8081/springboot-crud-rest/api/invoice';

  constructor(private http: HttpClient) {
  }

  getInvoice(customer: string, date: string): Observable<any> {

    return this.http.get(`${this.baseUrl}/${customer}/${date}`).pipe(map(invoice => {
      if (!invoice['productModels']) {
        invoice['productModels'] = [];
      }
      return invoice;
    }));
  }

  createInvoice(invoice: Invoice): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, invoice);
  }

  /*  updateProduct(name: string, value: any): Observable<Object> {
      return this.http.put(`${this.baseUrl}/${name}`, value);
    }*/

  deleteInvoice(customer: string, date: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${customer}/${date}`, {responseType: 'json'});
  }

  deleteAllInvoices(): Observable<any> {
    return this.http.delete(`${this.baseUrl}`, {responseType: 'text'});
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

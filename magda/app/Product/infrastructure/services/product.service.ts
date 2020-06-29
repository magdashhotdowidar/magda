import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8081/springboot-crud-rest/api/v1/product';

  constructor(private http: HttpClient) {
  }

  getProduct(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}`);
  }

  getProductsByCategory(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}/category`);
  }

  getProductsInGroups(): Observable<any> {
    return this.http.get(`${this.baseUrl}/grouping`);
  }

  createProduct(fd:FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`,fd);
  }

  updateProduct(name: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${name}`, value);
  }

  deleteProduct(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${name}`, {responseType: 'text'});
  }

  getproductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  getNames(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/names');
  }
}


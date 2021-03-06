import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from "../models/product";
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";
import {ProductResponse} from "../models/ProductResponse.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private baseUrl = 'http://localhost:8081/springboot-crud-rest/api/v1/product';
  private baseUrl = this.urlConfigService.getApiUrl(Modules.P) + 'v1/product';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  getProduct(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}`);
  }

  getProductByCod(cod: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/cod/${cod}`);
  }

  getProductsByCategory(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}/category`);
  }

  getProductsInGroups(): Observable<any> {
    return this.http.get(`${this.baseUrl}/grouping`);
  }

  createProduct(fd: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, fd);
  }

  updateProduct(name: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${name}`, value);
  }

  deleteProduct(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${name}`, {responseType: 'text'});
  }

  getproductList(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}`);
  }

  getNames(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/names');
  }
}


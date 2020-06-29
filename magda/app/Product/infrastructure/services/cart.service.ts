import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from "../models/product";
import {Cart} from "../models/Cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8081/springboot-crud-rest/api/cart';

  constructor(private http: HttpClient) {
  }

  getCartLineByUser(user: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.baseUrl}/${user}`);
  }

  getCartLineByUserAndProductName(user:string,name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${user}/${name}`);
  }


  createCartLine(cart:Cart) {
    return this.http.post(`${this.baseUrl}`,cart);
  }

  updateCartLine(user:string,productName: string, value: Cart): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${user}/${productName}`, value);
  }

  deleteCartLine(user:string,name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${user}/${name}`, {responseType: 'text'});
  }

  deleteUserCartLines(user:string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${user}`, {responseType: 'text'});
  }

  getCartLines(): Observable<Product[]> {
    return this.http.get<Cart[]>(`${this.baseUrl}`);
  }

}


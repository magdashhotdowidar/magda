import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8081/springboot-crud-rest/api/category/';

  constructor(private http: HttpClient) {
  }

  createCategory(category:Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}`,category);
  }


  deleteCategory(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}+${name}`, {responseType: 'text'});
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

  getNames(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + 'names');
  }
}


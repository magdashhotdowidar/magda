import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";
import {Observable} from "rxjs";
import {MyParagraph} from "./tutorial.service";

@Injectable({
  providedIn: 'root'
})
export class ParagraphService {

  private baseUrl = this.urlConfigService.getApiUrl(Modules.TUTORIAL) + 'tutorial/paragraph';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  getParagraph(header:string):Observable<MyParagraph[]> {
    return this.http.get<MyParagraph[]>(`${this.baseUrl}/${header}`);
  }

  saveParagraph(fd: FormData) {
    return this.http.post(`${this.baseUrl}`, fd, {responseType: 'text'});
  }

  deleteParagraph(header: string,paragraph:string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${header}/${paragraph}`, {responseType: 'text'});
  }


}


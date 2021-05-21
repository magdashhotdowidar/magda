import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";
import {Observable} from "rxjs";
import {MyLink, MyParagraph, MyTab} from "./tutorial.service";




@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private baseUrl = this.urlConfigService.getApiUrl(Modules.TUTORIAL) + 'tutorial/link';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  getLinkParagraphs(tab:string,link: string):Observable<MyParagraph[]> {
    return this.http.get<MyParagraph[]>(`${this.baseUrl}/${tab}/${link}`);
  }

  createLink(link:MyLink) {
    return this.http.post(`${this.baseUrl}`, link, {responseType: 'text'});
  }

  deleteLink(tab:string,link: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${tab}/${link}`, {responseType: 'text'});
  }


}

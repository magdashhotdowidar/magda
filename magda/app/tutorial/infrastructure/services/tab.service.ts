import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";
import {Observable, Subject} from "rxjs";
import {MyLink, MyTab} from "./tutorial.service";




@Injectable({
  providedIn: 'root'
})
export class TabService {

  private baseUrl = this.urlConfigService.getApiUrl(Modules.TUTORIAL) + 'tutorial/tap';
  new_tab:Subject<ManageTabs>=new Subject<ManageTabs>();
  allTabs:Subject<MyTab[]>=new Subject<MyTab[]>();

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  getAllTabs():Observable<MyTab[]>{
    return this.http.get<MyTab[]>(`${this.baseUrl}`)
  }
  getTabLinks(tab: string):Observable<MyLink[]> {
    return this.http.get<MyLink[]>(`${this.baseUrl}/${tab}`);
  }

  createTab(tab: MyTab) {
    return this.http.post(`${this.baseUrl}`, tab, {responseType: 'text'});
  }

  deleteTab(tab: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${tab}`, {responseType: 'text'});
  }


}
//------------------------
export class ManageTabs{
  constructor(public tap:MyTab,
              public operationType:string) {}

}

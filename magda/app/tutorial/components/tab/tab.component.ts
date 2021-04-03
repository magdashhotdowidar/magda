import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {MyTab, TutorialService} from "../../infrastructure/services/tutorial.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {TabService} from "../../infrastructure/services/tab.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit, AfterViewChecked {
  userName = localStorage.getItem(LocalStorage.userName);
  tabs: MyTab[] = [];
  subscription: Subscription;
  selectedItemIndex:number=-1;
  tabArrayIndex:number=0;

  constructor(private title: Title,
              private toastr:ToastrService,
              private tutorialService: TutorialService,
              private tabService:TabService) {
  }

  ngOnInit() {
    this.title.setTitle(this.userName + ' - Tabs')
    this.loadTabs();
  }

  loadTabs(){
    //this.tabs=this.tutorialService.tabs;
    this.tabService.getAllTabs().subscribe(data=>{
      if(data.length!=0){
        this.tabs=data;
        this.tabService.allTabs.next(data);
      }
    },
      (error: HttpErrorResponse) => this.toastr.info('error in loadTabs '));
  }

  ngAfterViewChecked(): void {
    this.subscription = this.tabService.new_tab.subscribe(tab => {
      if (!this.tabs.includes(tab.tap) && tab.tap.title!=''&&tab.operationType.match('add')) this.tabs.push(tab.tap);
      else if (tab.operationType.match('delete')){
        for (let i=0; i< this.tabs.length;i++){
          if(this.tabs[i].title.match(tab.tap.title))this.tabs.splice(i,1);
        }
      }
    })
  }

  setActive(i:number) {
this.selectedItemIndex=i;
    /*this.router.navigate(['sideBar',title], {relativeTo: this.route});*/
  }

  increaseIndex(){
    if (this.tabArrayIndex <this.tabs.length)++this.tabArrayIndex;
    else this.tabArrayIndex=this.tabs.length-1;
  }
  decreaseIndex(){
    if (this.tabArrayIndex>=0)--this.tabArrayIndex;
    else this.tabArrayIndex=0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


import {AfterViewChecked, Component, OnInit,} from '@angular/core';
import {formatDate} from "@angular/common";

import {Title} from "@angular/platform-browser";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {Path} from "../../../shared/enums/path.enum";
import {UserService} from "../../../user/user-infrastructure/user.service";
import {MyLink, TutorialService} from "../../infrastructure/services/tutorial.service";
import {ActivatedRoute, Params} from "@angular/router";
import {TabService} from "../../infrastructure/services/tab.service";
import {LinkService} from "../../infrastructure/services/link.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, AfterViewChecked {
  date: string = formatDate(new Date(), 'yyyy-MM-dd | hh:mm:ss', 'en-US');
  userName: string = localStorage.getItem(LocalStorage.userName);
  role: string = localStorage.getItem(LocalStorage.role);
  userImagePath: string = Path.userImagePath;
  userImage: string = localStorage.getItem(LocalStorage.userImage);
  l: typeof LocalStorage = LocalStorage;
  roleAdmin: string = this.l.ROLE_ADMIN;
  openSideBar: boolean = true;
  linkExist: boolean = false;
  dropDownOpened: boolean = false;
  links: MyLink[] = [];
  link: string = '';
  selectedItemIndex: number = -1;
  openAddParagraph: boolean = false;
  tabTitle: string = '';
  message: string='';

  constructor(private title: Title,
              private toastr: ToastrService,
              private userService: UserService,
              private tutorialService: TutorialService,
              private tabService: TabService,
              private linkService: LinkService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    //if the action delayed or need to click to happen call the method in side the subscribe block
    //set get by tabTitle method and the same for paragraph get by link
    this.title.setTitle(this.userName + ' - Tutorial')
    this.setData();

  }

  getByTabTitle() {
    this.tabService.getTabLinks(this.tabTitle).subscribe(data => {
        if (data.length != 0) this.links = data;
      },
      (error: HttpErrorResponse) => this.toastr.info('error in getByTitle '));
    /*for (let tab of this.tutorialService.tabs){
      if(tab.title.match(this.tabTitle))this.links=tab.links;
    }*/
  }

  addLink() {
    if (this.link != '') {
      let contain: boolean = false;
      for (let link of this.links) {
        if (link.label == this.link) contain = true;
      }
      if (!contain) {
        this.links.push(new MyLink(this.tabTitle, this.link, []));
        this.toastr.success('link '+this.link+ ' added')
        this.linkService.createLink(new MyLink(this.tabTitle, this.link, [])).subscribe(message => {}, (error: HttpErrorResponse) => this.toastr.info('error in addLink '));
        /*this.links.push(new MyLink(this.link))*/
      } else if (contain) {
        this.linkExist = true;
        this.message='this link already exist';
        setTimeout(() => {
          this.linkExist = false
        }, 2000);
      }
      this.link = '';
    }
  }

  deleteLink() {
    if (this.link != '') {
      let contain: boolean = false;
      let index = 0;
      for (let i=0; i < this.links.length; i++) {
        if (this.links[i].label == this.link) {
          contain = true;
         index=i;
        }
      }
      if (contain) {
        this.links.splice(index,1);
        this.toastr.success('link '+this.link+ ' deleted')
        this.linkService.deleteLink(this.tabTitle,this.link).subscribe(message => {
        }, (error: HttpErrorResponse) => this.toastr.info('error in delete :'+error.message));
        /*this.links.push(new MyLink(this.link))*/
      } else if (!contain) {
        this.linkExist = true;
        this.message='you try to delete unExist link';
        setTimeout(() => {
          this.linkExist = false
        }, 2000);
      }
      this.link = '';
    }
  }

  setActive(i: number) {
    this.selectedItemIndex = i;
  }

  Logout() {
    this.userService.Logout();
  }

  ngAfterViewChecked(): void {
    // this.setData();
  }

  setData() {
    this.route.params.subscribe((params: Params) => {
      if( params['tabTitle']){
        this.tabTitle = params['tabTitle'];
      this.getByTabTitle();}
    });
  }
}



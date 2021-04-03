import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../../user/user-infrastructure/user.service";
import {Coding} from "../../../shared/enums/coding.enum";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {na} from "../../../user/sign-in/sign-in.component";
import {Path} from "../../../shared/enums/path.enum";
import {MyTab, TutorialService} from "../../infrastructure/services/tutorial.service";
import {ManageTabs, TabService} from "../../infrastructure/services/tab.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'tutorial-header',
  templateUrl: './tutorial-header.component.html',
  styleUrls: ['./tutorial-header.component.css']
})
export class TutorialHeaderComponent implements OnInit {

  @Output() right_direction = new EventEmitter<boolean>();
  @ViewChild('input', {static: false}) input: ElementRef;
  selectedLang: string = 'ar'
  userName: string = localStorage.getItem(LocalStorage.userName);
  userImage: string = localStorage.getItem(LocalStorage.userImage);
  userImagePath: string = Path.userImagePath;
  ASaberWordAr: string = Path.ASaberWordArt;
  mainPath: string = '/' + na + '/' + Coding.front_home;
  role: string = localStorage.getItem(LocalStorage.role);
  l: typeof LocalStorage = LocalStorage;
  roleAdmin: string = this.l.ROLE_ADMIN;
  dropDownOpened: boolean = false;
  tabs:MyTab[]=[];


  constructor(private userService: UserService,
              private toastr:ToastrService,
              private translate: TranslateService,
              private tutorialService: TutorialService,
              private tabService: TabService
  ) {
  }

  ngOnInit() {
    this.setLang();
    this.tabService.allTabs.subscribe(data=>this.tabs=data)
  }

  addTab(value: string) {
let contain:boolean=false;
     for (let obj of this.tabs)if (obj.title.match(value))contain=true;
       if (!contain){
       this.tabService.createTab(new MyTab(value,[])).subscribe(message=>{
           this.tabService.new_tab.next(new ManageTabs(new MyTab(value),'add'));
           this.toastr.success(message)
         },
         (error: HttpErrorResponse) => this.toastr.info('error in addTab '));
       this.input.nativeElement.value = '';
     }else this.toastr.warning('this tap already exist')
  }

  deleteTab(value: string) {
    let contain:boolean=false;
    for (let obj of this.tabs)if (obj.title.match(value))contain=true;
    if (contain){
    this.tabService.deleteTab(value).subscribe(message=>{
        this.tabService.new_tab.next(new ManageTabs(new MyTab(value),'delete'));
      this.toastr.success(message)},
      (error: HttpErrorResponse) => this.toastr.info('error in deleteTab '));
    }else this.toastr.warning('you try to delete unExist tab');
  }

  setLang() {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('ar');
    this.translate.use(this.selectedLang.match(/en|ar/) ? this.selectedLang : "ar");
    if (this.selectedLang == 'ar') {
      this.right_direction.emit(true);
      localStorage.setItem('direction', 'rtl');
    } else {
      this.right_direction.emit(false);
      localStorage.setItem('direction', 'ltr');
    }
  }

  Logout() {
    this.userService.Logout();
  }

}

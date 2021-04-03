import {AfterViewChecked, Component, DoCheck, OnInit,} from '@angular/core';
import {MyParagraph, TutorialService} from "../../../infrastructure/services/tutorial.service";
import {ActivatedRoute, Params} from "@angular/router";
import {LinkService} from "../../../infrastructure/services/link.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Path} from "../../../../shared/enums/path.enum";

@Component({
  selector: 'side-bar-popup',
  templateUrl: './side-bar-popup.component.html',
  styleUrls: ['./side-bar-popup.component.css']
})
export class SideBarPopupComponent implements OnInit, AfterViewChecked {

  paragraphImagePath: string = Path.paragraphImagePath;
  paragraphs: MyParagraph[] = [];
  tabTitle:string='';
  linkLabel: string = '';

  constructor(private tutorialService: TutorialService,
              private route: ActivatedRoute,
              private linkService:LinkService,
              private toastr:ToastrService) {
  }

  ngOnInit(): void {
    this.setData();
  }

  getLinkParagraphs() {
    this.linkService.getLinkParagraphs(this.tabTitle,this.linkLabel).subscribe(data=>{
      if (data.length!=0) this.paragraphs=data;
    },
      (error: HttpErrorResponse) => this.toastr.info('error in getLinkParagraphs '));
/*    this.tabs=this.tutorialService.tabs;
      if (this.tabs==null||this.tabs.length==0)this.tabs=[];
      for (let tab of this.tabs) {
        if (tab.title.match(this.tabTitle)) this.links = tab.links;
      }
      this.getByLinkLabel();*/

  }

/*  getByLinkLabel() {
    for (let link of this.links) {
      if (link.label.match(this.linkLabel)) this.paragraphs = link.paragraphs;
    }

  }*/

  ngAfterViewChecked(): void {
   // this.setData();
  }

  setData() {
    this.route.params.subscribe((params: Params) => {
      if (params['linkLabel']&&params['tabTitle']) {
        this.tabTitle=params['tabTitle'];
        this.linkLabel = params['linkLabel'];
        this.getLinkParagraphs();
      }
    });
  }

}

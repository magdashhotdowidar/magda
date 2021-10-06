import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Path} from "../../../../shared/enums/path.enum";
import {LocalStorage} from "../../../../shared/enums/local-storage-coding.enum";
import {ToastrService} from "ngx-toastr";
import {MyLink, MyParagraph, MyTab, TutorialService} from "../../../infrastructure/services/tutorial.service";
import {NgForm} from "@angular/forms";
import {TabService} from "../../../infrastructure/services/tab.service";
import {ParagraphService} from "../../../infrastructure/services/paragraph.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'add-paragraph',
  templateUrl: './add-paragraph.component.html',
  styleUrls: ['./add-paragraph.component.css']
})
export class AddParagraphComponent implements OnInit {
  @Output('show-popup') showpopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  userName = localStorage.getItem(LocalStorage.userName);
  paragraphImagePath: string = Path.paragraphImagePath;
  imageName: string = '';
  header: string = '';
  paragraph: string;
  paragraphs: MyParagraph[] = [];
  tabs: MyTab[] = [];
  links: MyLink[] = [];
  selectedTab: string = 'tabs';
  selectedLink: string = 'links';
  fileEvent: Event = null;
  selectedFile: File;
  view: boolean = false;
  dorpDownSearchInput: boolean = false;

  constructor(private toastr: ToastrService,
              private tutorialService: TutorialService,
              private tabService: TabService,
              private paragraphService: ParagraphService) {
  }

  ngOnInit() {
    this.loadTabs();
  }

  /*  addParagraph(form: NgForm) {
      if (this.selectedTab.match('tabs') || this.selectedTab == '') this.toastr.warning('select tab');
      else if (this.selectedLink.match('links') || this.selectedLink == '') this.toastr.warning('select link');
      else {
        let tabs = this.tutorialService.tabs;
        let links: MyLink[] = [];
        for (let t of tabs) if (t.title.match(this.selectedTab)) links = t.links;
        for (let l of links) if (l.label.match(this.selectedLink)) l.paragraphs.push(new MyParagraph(this.header, this.paragraph, ''))
        this.tutorialService.tabs = tabs;
        this.selectedTab = 'tabs';
        this.selectedLink = 'links';
        this.header = '';
        this.paragraph = '';
        this.toastr.success('successfully addition')
        form.reset();
      }
    }*/

  loadTabs() {
    this.tabService.getAllTabs().subscribe(data => {
      if (data.length != 0) this.tabs = data
    })
  }

  addParagraph(form: NgForm) {
    if (this.selectedTab.match('tabs') || this.selectedTab == '') this.toastr.warning('select tab');
    else if (this.selectedLink.match('links') || this.selectedLink == '') this.toastr.warning('select link');
    else {
      const fd = new FormData();

      if (this.fileEvent != null) {
        this.selectedFile = (<HTMLInputElement>this.fileEvent.target).files[0];
        fd.append('file', this.selectedFile, this.selectedFile.name);
      }

      fd.append('paragraph', JSON.stringify(new MyParagraph(this.selectedTab, this.selectedLink, this.header, this.paragraph, this.selectedFile.name)));

      this.paragraphService.saveParagraph(fd)
        .subscribe(data => {
          this.selectedTab = 'tabs';
          this.selectedLink = 'links';
          this.header = '';
          this.paragraph = '';
          this.selectedFile = null;
          this.fileEvent = null;
          this.toastr.success('successfully addition')
          form.reset();
        }, (error: HttpErrorResponse) => {
          this.toastr.error('error in add paragraph');
        });
    }
  }

  findParagraph(value: string) {
    if (value != '' || value != null || value != undefined || value.length > 0)
      this.paragraphService.getParagraph(this.header).subscribe(data => {
        this.paragraphs = data;
        console.log('data : ',this.paragraphs)
        this.dorpDownSearchInput = true;
      }, (error: HttpErrorResponse) => {
        this.toastr.error('error in find paragraph:' + error.message);
      })
  }

  setParagraph(paragraph: MyParagraph) {
    this.selectedTab = paragraph.tab;
    this.selectedLink = paragraph.link;
    this.header = paragraph.header;
    this.paragraph = paragraph.paragraph;
    this.imageName = paragraph.file;
    this.view=true
    setTimeout(() => {
      this.dorpDownSearchInput = false;
    }, 1000);

  }

  selectlinks() {
    for (let tab of this.tabs) {
      if (tab.title.match(this.selectedTab)) this.links = tab.links;
    }
  }

  close() {
    this.showpopup.emit(false);
  }
}


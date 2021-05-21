import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorage} from "../../../../shared/enums/local-storage-coding.enum";
import {Path} from "../../../../shared/enums/path.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {MyVideo, VideoService} from "../../../infrastructure/services/video.service";
import {ToastrService} from "ngx-toastr";
import {formatDate} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'video-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  @Output('show-popup') showpopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  date: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  userName = localStorage.getItem(LocalStorage.userName);
  userImage: string = localStorage.getItem(LocalStorage.userImage);
  userImagePath:string=Path.userImagePath;
  videosPath:string=Path.videosPath;
  path: string = Path.videoImagPath;
  fileEvent: Event = null;
  selectedFile: File;
  videos:MyVideo[]=[];
  showVideos:boolean=false;

  constructor(private videoService:VideoService,
              private router:Router,
              private route:ActivatedRoute,
              private toastr:ToastrService,) { }

  ngOnInit() {
  }

  uploadVideo() {
      const fd = new FormData();
      if (this.fileEvent != null) {
        this.selectedFile = (<HTMLInputElement>this.fileEvent.target).files[0];
        fd.append('file', this.selectedFile, this.selectedFile.name);
      }

      fd.append('video', JSON.stringify(new MyVideo(this.selectedFile.name,this.userName,this.date)));

      this.videoService.saveVideo(fd)
        .subscribe(data => {
          this.selectedFile = null;
          this.fileEvent = null;
          this.toastr.success('successfully addition')
        }, (error: HttpErrorResponse) => {
          this.toastr.error('error in upload video');
        });
  }

  watch(video:MyVideo){
    this.router.navigate(['watch'],{relativeTo:this.route,queryParams:{v:video.name}})
  }

  getChannelVideos(){
    this.showVideos=true;
    this.videoService.getChannelVideos(this.userName).subscribe((data)=>{
      this.videos=data;
    },((error:HttpErrorResponse) =>this.toastr.warning('error in get all videos : '+error.message) ))
  }

  close() {
    this.showpopup.emit(false);
  }

}

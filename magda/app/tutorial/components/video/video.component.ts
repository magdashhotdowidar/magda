import { Component, OnInit } from '@angular/core';
import {Path} from "../../../shared/enums/path.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {MyVideo, VideoService} from "../../infrastructure/services/video.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {Coding} from "../../../shared/enums/coding.enum";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  videoImagePath: string = Path.videoImagPath;
  videosPath:string=Path.videosPath;
  videos:MyVideo[]=[];
  openChannel: boolean=false;
  constructor(private router:Router,
              private route:ActivatedRoute,
              private toastr:ToastrService,
              private videoService:VideoService) { }

  ngOnInit() {
    this.getAllVideos();
  }
  watch(video:MyVideo){
    if (video.views == null || video.views == 0) video.views = 1;else video.views++;
    this.updateVideoViews(video.name, video.views);
    this.router.navigate(['watch'],{relativeTo:this.route,queryParams:{v:video.name}})
  }

  updateVideoViews(user: string, count: number) {
    this.videoService.updateVideoViews(user,count ).subscribe((data:string)=>{},
      (error:HttpErrorResponse)=>this.toastr.error('error in updateVideoViews : '+error.message));
  }
  getAllVideos(){
    this.videoService.getVideos().subscribe((data)=>{
      this.videos=data;
    },((error:HttpErrorResponse) =>this.toastr.warning('error in get all videos : '+error.message) ))
  }

  /*arrayOne(n: number): any[] {
    return Array(n);
  }*/

}

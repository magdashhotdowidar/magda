import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Path} from "../../../../shared/enums/path.enum";
import {ToastrService} from "ngx-toastr";
import {MyVideo} from "../../../infrastructure/services/video.service";
import {LocalStorage} from "../../../../shared/enums/local-storage-coding.enum";

@Component({
  selector: 'video-config',
  templateUrl: './video-config.component.html',
  styleUrls: ['./video-config.component.css']
})
export class VideoConfigComponent implements OnInit {
  userImage: string = localStorage.getItem(LocalStorage.userImage);
  userImagePath:string=Path.userImagePath;
  videosPath: string = Path.videosPath;
  @Input() video:MyVideo = new MyVideo();

  constructor(private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  name = "Angular";
  @ViewChild("videoPlayer", {static: false}) videoplayer: ElementRef;
  isPlay: boolean = false;

  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }

  playPause() {
    var myVideo: any = document.getElementById("my_video_1");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }

  makeBig() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 1200;
    myVideo.height = 600;
  }

  makeSmall() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 800;
  }

  makeNormal() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 920;
  }

  skip(value) {
    let video: any = document.getElementById("my_video_1");
    video.currentTime += value;
  }

  restart() {
    let video: any = document.getElementById("my_video_1");
    video.currentTime = 0;
  }

  //----------------------likes part------------------------
  likes: number = 0;
  dislikes: number = 0;

  increase() {
    this.likes++;
    if (this.dislikes > 0) this.dislikes--;
  }

  decrease() {
    this.dislikes++;
    if (this.likes > 0) this.likes--;
  }

}

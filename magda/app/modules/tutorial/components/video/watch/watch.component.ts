import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {MyVideo} from "../../../infrastructure/services/video.service";

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
video:MyVideo=new MyVideo();
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params:Params)=>{
      this.video=new MyVideo(params['name'],params['channel'],params['date'],+params['views']);
    })
  }

}

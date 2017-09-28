import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { IFrameService } from '../iframe/iframe.service';

@Component({
  selector: 'app-load-iframe',
  templateUrl: './load-iframe.component.html',
  styleUrls: ['./load-iframe.component.css']
})
export class LoadIframeComponent implements OnInit, OnDestroy {

  private route: ActivatedRoute;
  private sanitizer: DomSanitizer;
  private router: Router;

  constructor(route: ActivatedRoute, sanitizer: DomSanitizer, router: Router, private iFrameService: IFrameService) {
    this.iFrameService.notifyOther({ route, sanitizer, router });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.iFrameService.notifyOther({ hideIFrame: true });
  }

}

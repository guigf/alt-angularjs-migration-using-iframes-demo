import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from "rxjs/Subscription";
import { IFrameService } from './iframe.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements OnInit, OnDestroy {
  public url: SafeResourceUrl;
  private counter = 0;
  public loaded: boolean = false;
  private subscription: Subscription;
  public showIFrame: boolean = false;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, private iFrameService: IFrameService) {  }

  loadIFrame(route: ActivatedRoute, sanitizer: DomSanitizer, router: Router) {
    this.route = route;
    this.sanitizer = sanitizer;
    this.router = router;
    this.showIFrame = true;

    this.route.url.subscribe(urlSegments => {
      // Create a unique URL each time so the iframe will detect the change
      this.counter += 1;
      const requestedUrl = '/legacy/?counter=' + this.counter + '#!/' + urlSegments.join('');
      console.log(requestedUrl);

      // Angular by default sanitises a URL, we need to bypass that so the full URL is rendered
      // NOTE: Need to look into security considerations of this
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(requestedUrl);
    });

    this.listenForFallbackRoutingEvents();
  }

  /*
   If the iframed-in app can't resolve a URL itself it will post a message to the parent
   iframe (this app). Listen to those messages and attempt to navigate to that URL.
   */
  listenForFallbackRoutingEvents() {
    // Create IE + others compatible event handler
    const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    const eventer = window[eventMethod];
    const messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";


    eventer(messageEvent, (e) => {
      if (e.data.navigateTo) {
        console.log('parent received message!:  ', e.data);
        let url = e.data.navigateTo;
        console.log(url);
        this.router.navigateByUrl(url);
      }
    }, false);
  }

  ngOnInit() {
    setTimeout(() => {
      this.loaded = true;
    }, 5000);

    this.subscription = this.iFrameService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('route') && res.hasOwnProperty('sanitizer') && res.hasOwnProperty('router')) {
        this.loadIFrame(res.route, res.sanitizer, res.router);
      } else if (res.hasOwnProperty('hideIFrame')) {
        this.showIFrame = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
